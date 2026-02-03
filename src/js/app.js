window.addEventListener('DOMContentLoaded', function () {

  // Select the node to be observed
  let targetNode = document.querySelector('.tagManagerManageEdit');

  if (targetNode) {

    // Options for the observer (which mutations to observe)
    const config = {attributes: true, childList: true, subtree: true};

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const textarea = node.querySelector("#customHtml");
              if (textarea) {
                editorFromTextArea(textarea);
              }
            }
          });
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);


    function editorFromTextArea(textarea) {
      textarea.rows = 8;
      textarea.spellcheck = false;
    }
  }

  // Bulk Actions Feature
  class BulkActionsManager {
    constructor() {
      this.selectedItems = new Map();
      this.currentEntityType = null;
      this.initialized = new Set();
      this.observerStarted = false;
    }

    init() {
      const listContainer = document.querySelector('.tagManagerManageList');
      if (!listContainer) return;

      const config = { attributes: true, childList: true, subtree: true };

      const callback = (mutationList) => {
        for (const mutation of mutationList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1) {
                this.checkAndInitialize(node);
              }
            });
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(listContainer, config);
      this.observerStarted = true;

      // Initial check for already existing lists
      this.checkAndInitialize(listContainer);
    }

    checkAndInitialize(node) {
      const lists = [
        { selector: '.tagManagerTagList', type: 'tag', rowClass: 'tags', idPrefix: 'tag' },
        { selector: '.tagManagerTriggerList', type: 'trigger', rowClass: 'triggers', idPrefix: 'trigger' },
        { selector: '.tagManagerVariableList', type: 'variable', rowClass: 'variables', idPrefix: 'variable' }
      ];

      for (const list of lists) {
        const container = node.matches && node.matches(list.selector) ? node : node.querySelector(list.selector);
        if (container && !this.initialized.has(list.type)) {
          // Check if user has write access (tableActionBar present means they can edit)
          const hasWriteAccess = container.querySelector('.tableActionBar');
          if (hasWriteAccess) {
            this.initializeList(container, list);
            this.initialized.add(list.type);
          }
        }
      }
    }

    initializeList(container, listConfig) {
      const table = container.querySelector('table');
      if (!table) return;

      // Function to check if table has data rows
      const hasDataRows = () => {
        const rows = table.querySelectorAll(`tbody tr.${listConfig.rowClass}`);
        return rows.length > 0;
      };

      // Function to do the actual initialization
      const doInit = () => {
        this.injectToolbar(container, listConfig.type);
        this.injectCheckboxes(table, listConfig);
        this.currentEntityType = listConfig.type;

        // Watch for table body changes (when Vue re-renders rows)
        this.observeTableChanges(table, listConfig);
      };

      // Wait for table to have data rows, with retry mechanism
      const waitForRows = (attempts = 0) => {
        if (hasDataRows()) {
          doInit();
        } else if (attempts < 20) {
          // Retry up to 20 times (2 seconds total)
          setTimeout(() => waitForRows(attempts + 1), 100);
        } else {
          // After timeout, initialize anyway (rows might be empty)
          doInit();
        }
      };

      // Start waiting for rows
      setTimeout(() => waitForRows(), 100);
    }

    observeTableChanges(table, listConfig) {
      const tbody = table.querySelector('tbody');
      if (!tbody) return;

      // Store observer reference to avoid duplicates
      if (table._tmeObserver) return;

      const observer = new MutationObserver((mutations) => {
        let needsUpdate = false;
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1 && node.matches && node.matches(`tr.${listConfig.rowClass}`)) {
                needsUpdate = true;
              }
            });
          }
        });

        if (needsUpdate) {
          // Re-inject checkboxes for new rows
          setTimeout(() => {
            this.injectCheckboxes(table, listConfig);
          }, 50);
        }
      });

      observer.observe(tbody, { childList: true, subtree: true });
      table._tmeObserver = observer;
    }

    injectToolbar(container, entityType) {
      // Check if toolbar already exists
      if (container.querySelector('.tme-bulk-actions')) return;

      const toolbar = document.createElement('div');
      toolbar.className = 'tme-bulk-actions';
      toolbar.innerHTML = this.getToolbarHTML(entityType);

      // Insert before the table
      const table = container.querySelector('table');
      if (table) {
        table.parentNode.insertBefore(toolbar, table);
      }

      this.attachToolbarEvents(toolbar, entityType);
    }

    getToolbarHTML(entityType) {
      const translations = this.getTranslations();
      let actionsHTML = `
        <button class="btn btn-flat tme-bulk-btn tme-bulk-delete" disabled>
          <span class="icon-delete"></span> ${translations.bulkDelete}
        </button>
      `;

      // Only tags have pause/resume
      if (entityType === 'tag') {
        actionsHTML = `
          <button class="btn btn-flat tme-bulk-btn tme-bulk-pause" disabled>
            <span class="icon-pause"></span> ${translations.bulkPause}
          </button>
          <button class="btn btn-flat tme-bulk-btn tme-bulk-resume" disabled>
            <span class="icon-play"></span> ${translations.bulkResume}
          </button>
        ` + actionsHTML;
      }

      return `
        <div class="tme-bulk-select-controls">
          <label class="tme-select-all-label">
            <input type="checkbox" class="tme-select-all" />
            <span>${translations.selectAll}</span>
          </label>
          <span class="tme-selection-count"></span>
        </div>
        <div class="tme-bulk-buttons">
          ${actionsHTML}
        </div>
      `;
    }

    getTranslations() {
      // Use Matomo's translation system - translations are stored in piwik.translations object
      const translate = (key, fallback) => {
        if (window.piwik && window.piwik.translations && window.piwik.translations[key]) {
          return window.piwik.translations[key];
        }
        // Try _pk_translate function if available
        if (typeof window._pk_translate === 'function') {
          const translated = window._pk_translate(key);
          if (translated !== key) {
            return translated;
          }
        }
        return fallback;
      };

      return {
        bulkActions: translate('TagManagerExtended_BulkActions', 'Bulk Actions'),
        selectAll: translate('TagManagerExtended_SelectAll', 'Select All'),
        deselectAll: translate('TagManagerExtended_DeselectAll', 'Deselect All'),
        selected: translate('TagManagerExtended_Selected', '%s selected'),
        bulkDelete: translate('TagManagerExtended_BulkDelete', 'Delete'),
        bulkPause: translate('TagManagerExtended_BulkPause', 'Pause'),
        bulkResume: translate('TagManagerExtended_BulkResume', 'Resume'),
        confirmBulkDelete: translate('TagManagerExtended_ConfirmBulkDelete', 'Are you sure you want to delete %s items?'),
        confirmBulkPause: translate('TagManagerExtended_ConfirmBulkPause', 'Are you sure you want to pause %s tags?'),
        confirmBulkResume: translate('TagManagerExtended_ConfirmBulkResume', 'Are you sure you want to resume %s tags?'),
        bulkSuccess: translate('TagManagerExtended_BulkSuccess', 'Successfully processed %s items.'),
        bulkPartialSuccess: translate('TagManagerExtended_BulkPartialSuccess', 'Processed %s items successfully, %s failed.')
      };
    }

    attachToolbarEvents(toolbar, entityType) {
      const selectAllCheckbox = toolbar.querySelector('.tme-select-all');
      const pauseBtn = toolbar.querySelector('.tme-bulk-pause');
      const resumeBtn = toolbar.querySelector('.tme-bulk-resume');
      const deleteBtn = toolbar.querySelector('.tme-bulk-delete');

      selectAllCheckbox.addEventListener('change', (e) => {
        this.toggleSelectAll(e.target.checked, entityType);
      });

      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => this.executeBulkAction('pause', entityType));
      }
      if (resumeBtn) {
        resumeBtn.addEventListener('click', () => this.executeBulkAction('resume', entityType));
      }
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => this.executeBulkAction('delete', entityType));
      }
    }

    injectCheckboxes(table, listConfig) {
      // Inject header checkbox cell
      const headerRow = table.querySelector('thead tr');
      if (headerRow && !headerRow.querySelector('.tme-checkbox-cell')) {
        const th = document.createElement('th');
        th.className = 'tme-checkbox-cell';
        th.innerHTML = '';
        headerRow.insertBefore(th, headerRow.firstChild);
      }

      // Inject row checkboxes
      const rows = table.querySelectorAll(`tbody tr.${listConfig.rowClass}`);

      rows.forEach(row => {
        // Skip if checkbox already exists
        if (row.querySelector('.tme-checkbox-cell')) return;

        // Skip loading or empty rows
        if (row.querySelector('.loadingPiwik') || row.querySelector('[colspan]')) return;

        const id = this.extractIdFromRow(row, listConfig.idPrefix);
        if (!id) return;

        const td = document.createElement('td');
        td.className = 'tme-checkbox-cell';
        td.innerHTML = `<label class="tme-checkbox-label">
          <input type="checkbox" class="tme-row-checkbox" data-id="${id}" data-type="${listConfig.type}" />
          <span></span>
        </label>`;
        row.insertBefore(td, row.firstChild);

        const checkbox = td.querySelector('.tme-row-checkbox');
        checkbox.addEventListener('change', (e) => {
          this.handleRowSelection(e.target, row, listConfig.type);
        });
      });
    }

    extractIdFromRow(row, idPrefix) {
      const rowId = row.id;
      if (rowId && rowId.startsWith(idPrefix)) {
        return rowId.replace(idPrefix, '');
      }
      return null;
    }

    handleRowSelection(checkbox, row, entityType) {
      const id = checkbox.dataset.id;
      if (checkbox.checked) {
        this.selectedItems.set(id, { id, type: entityType });
        row.classList.add('tme-selected');
      } else {
        this.selectedItems.delete(id);
        row.classList.remove('tme-selected');
      }
      this.updateToolbarState(entityType);
    }

    toggleSelectAll(checked, entityType) {
      const container = this.getContainerForType(entityType);
      if (!container) return;

      const checkboxes = container.querySelectorAll('.tme-row-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = checked;
        const row = checkbox.closest('tr');
        if (checked) {
          this.selectedItems.set(checkbox.dataset.id, { id: checkbox.dataset.id, type: entityType });
          row.classList.add('tme-selected');
        } else {
          this.selectedItems.delete(checkbox.dataset.id);
          row.classList.remove('tme-selected');
        }
      });
      this.updateToolbarState(entityType);
    }

    updateToolbarState(entityType) {
      const container = this.getContainerForType(entityType);
      if (!container) return;

      const toolbar = container.querySelector('.tme-bulk-actions');
      if (!toolbar) return;

      const count = this.selectedItems.size;
      const translations = this.getTranslations();

      // Update selection count
      const countDisplay = toolbar.querySelector('.tme-selection-count');
      if (countDisplay) {
        countDisplay.textContent = count > 0 ? translations.selected.replace('%s', count) : '';
      }

      // Update select all checkbox state
      const selectAllCheckbox = toolbar.querySelector('.tme-select-all');
      const allCheckboxes = container.querySelectorAll('.tme-row-checkbox');
      if (selectAllCheckbox && allCheckboxes.length > 0) {
        const allSelected = Array.from(allCheckboxes).every(cb => cb.checked);
        const someSelected = Array.from(allCheckboxes).some(cb => cb.checked);
        selectAllCheckbox.checked = allSelected;
        selectAllCheckbox.indeterminate = someSelected && !allSelected;
      }

      // Enable/disable buttons
      const buttons = toolbar.querySelectorAll('.tme-bulk-btn');
      buttons.forEach(btn => {
        btn.disabled = count === 0;
      });
    }

    getContainerForType(entityType) {
      const selectors = {
        tag: '.tagManagerTagList',
        trigger: '.tagManagerTriggerList',
        variable: '.tagManagerVariableList'
      };
      return document.querySelector(selectors[entityType]);
    }

    async executeBulkAction(action, entityType) {
      const count = this.selectedItems.size;
      if (count === 0) return;

      const translations = this.getTranslations();
      let confirmMessage;

      switch (action) {
        case 'delete':
          confirmMessage = translations.confirmBulkDelete.replace('%s', count);
          break;
        case 'pause':
          confirmMessage = translations.confirmBulkPause.replace('%s', count);
          break;
        case 'resume':
          confirmMessage = translations.confirmBulkResume.replace('%s', count);
          break;
      }

      const confirmed = confirm(confirmMessage);
      if (!confirmed) return;

      const ids = Array.from(this.selectedItems.keys());
      const params = this.getContainerParams();

      if (!params) {
        alert('Could not determine container parameters');
        return;
      }

      try {
        const result = await this.callBulkApi(action, entityType, ids, params);
        this.handleBulkResult(result, translations);
        this.clearSelection(entityType);
        this.reloadList();
      } catch (error) {
        alert('Bulk action failed: ' + error.message);
      }
    }

    getContainerParams() {
      let idSite = null;
      let idContainer = null;
      let idContainerVersion = null;

      // Method 1: Try to get from Matomo's broadcast
      if (window.broadcast) {
        idSite = window.broadcast.getValueFromUrl('idSite');
        idContainer = window.broadcast.getValueFromUrl('idContainer');
        idContainerVersion = window.broadcast.getValueFromUrl('idContainerVersion');
      }

      // Method 2: Try piwik global
      if (!idSite && window.piwik && window.piwik.idSite) {
        idSite = window.piwik.idSite;
      }

      // Method 3: Parse from hash URL
      if (!idContainer || !idContainerVersion) {
        const hash = window.location.hash;
        const containerMatch = hash.match(/idContainer=([^&]+)/);
        const versionMatch = hash.match(/idContainerVersion=(\d+)/);

        if (containerMatch) idContainer = containerMatch[1];
        if (versionMatch) idContainerVersion = versionMatch[1];
      }

      // Method 4: Try Vue entry attributes
      if (!idContainer || !idContainerVersion) {
        const vueEntry = document.querySelector('[vue-entry*="TagManager"]')
          || document.querySelector('[vue-entry="TagManager.TagManage"]')
          || document.querySelector('[vue-entry="TagManager.TriggerManage"]')
          || document.querySelector('[vue-entry="TagManager.VariableManage"]');

        if (vueEntry) {
          const containerAttr = vueEntry.getAttribute('id-container');
          const versionAttr = vueEntry.getAttribute('id-container-version');

          if (containerAttr && !idContainer) idContainer = containerAttr.replace(/['"&;]+/g, '').replace(/quot/g, '');
          if (versionAttr && !idContainerVersion) idContainerVersion = versionAttr.replace(/['"&;]+/g, '').replace(/quot/g, '');
        }
      }

      // Method 5: Look for idContainerVersion in page elements
      if (!idContainerVersion) {
        const elementsWithVersion = document.querySelectorAll('[id-container-version], [data-id-container-version]');
        for (const el of elementsWithVersion) {
          const ver = el.getAttribute('id-container-version') || el.getAttribute('data-id-container-version');
          if (ver) {
            idContainerVersion = ver.replace(/['"&;]+/g, '').replace(/quot/g, '');
            break;
          }
        }
      }

      // Method 6: Try URL search params
      if (!idSite) {
        const urlParams = new URLSearchParams(window.location.search);
        idSite = urlParams.get('idSite');
      }

      // Method 7: Default idContainerVersion to 1 for draft if still missing
      if (!idContainerVersion && idContainer) {
        idContainerVersion = '1';
      }

      if (idSite && idContainer && idContainerVersion) {
        return { idSite, idContainer, idContainerVersion };
      }

      return null;
    }

    async callBulkApi(action, entityType, ids, params) {
      const methodMap = {
        tag: {
          delete: 'TagManagerExtended.bulkDeleteTags',
          pause: 'TagManagerExtended.bulkPauseTags',
          resume: 'TagManagerExtended.bulkResumeTags'
        },
        trigger: {
          delete: 'TagManagerExtended.bulkDeleteTriggers'
        },
        variable: {
          delete: 'TagManagerExtended.bulkDeleteVariables'
        }
      };

      const method = methodMap[entityType]?.[action];
      if (!method) {
        throw new Error(`Invalid action ${action} for entity type ${entityType}`);
      }

      const idParamName = entityType === 'tag' ? 'idTags'
        : entityType === 'trigger' ? 'idTriggers'
        : 'idVariables';

      // Use Matomo's global AJAX helper
      return new Promise((resolve, reject) => {
        if (window.globalAjaxQueue && window.ajaxHelper) {
          const request = new window.ajaxHelper();
          request.setFormat('json');
          request.addParams({
            module: 'API',
            method: method,
            idSite: params.idSite,
            idContainer: params.idContainer,
            idContainerVersion: params.idContainerVersion,
            format: 'json'
          }, 'get');

          ids.forEach((id, index) => {
            request.addParams({ [`${idParamName}[${index}]`]: id }, 'get');
          });

          request.setCallback((response) => {
            if (response && response.result === 'error') {
              reject(new Error(response.message || 'API error'));
            } else {
              resolve(response);
            }
          });

          request.setErrorCallback((error) => {
            reject(error);
          });

          request.send();
        } else {
          // Fallback: direct fetch
          const urlParams = new URLSearchParams({
            module: 'API',
            method: method,
            idSite: params.idSite,
            idContainer: params.idContainer,
            idContainerVersion: params.idContainerVersion,
            format: 'json'
          });

          ids.forEach(id => {
            urlParams.append(`${idParamName}[]`, id);
          });

          fetch(`index.php?${urlParams.toString()}`, {
            method: 'GET',
            credentials: 'same-origin'
          })
            .then(response => response.json())
            .then(data => {
              if (data.result === 'error') {
                reject(new Error(data.message || 'API error'));
              } else {
                resolve(data);
              }
            })
            .catch(reject);
        }
      });
    }

    handleBulkResult(result, translations) {
      if (!result) return;

      let message;
      if (result.failed === 0) {
        message = translations.bulkSuccess.replace('%s', result.success);
      } else {
        message = translations.bulkPartialSuccess
          .replace('%s', result.success)
          .replace('%s', result.failed);
      }

      alert(message);
    }

    clearSelection(entityType) {
      this.selectedItems.clear();
      const container = this.getContainerForType(entityType);
      if (container) {
        container.querySelectorAll('.tme-row-checkbox').forEach(cb => {
          cb.checked = false;
          cb.closest('tr')?.classList.remove('tme-selected');
        });
        const selectAllCheckbox = container.querySelector('.tme-select-all');
        if (selectAllCheckbox) {
          selectAllCheckbox.checked = false;
          selectAllCheckbox.indeterminate = false;
        }
      }
      this.updateToolbarState(entityType);
    }

    reloadList() {
      window.location.reload();
    }

    reinitialize(entityType) {
      this.initialized.delete(entityType);
      const listContainer = document.querySelector('.tagManagerManageList');
      if (listContainer) {
        this.checkAndInitialize(listContainer);
      }
    }
  }

  // Initialize bulk actions manager
  const bulkManager = new BulkActionsManager();

  // Initialize when on TagManager page
  const initBulkActions = () => {
    const listContainer = document.querySelector('.tagManagerManageList');
    if (listContainer) {
      bulkManager.init();
    }
  };

  // Run initialization
  initBulkActions();

  // Listen for Vue route changes
  let lastHash = window.location.hash;
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash;
    if (newHash !== lastHash) {
      const isTagList = newHash.includes('manageTags') || newHash.includes('Tags');
      const isTriggerList = newHash.includes('manageTriggers') || newHash.includes('Triggers');
      const isVariableList = newHash.includes('manageVariables') || newHash.includes('Variables');

      if (isTagList || isTriggerList || isVariableList) {
        setTimeout(() => {
          bulkManager.initialized.clear();
          bulkManager.selectedItems.clear();
          initBulkActions();
        }, 500);
      }
    }
    lastHash = newHash;
  });

});
