/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import {
  App, createVNode, reactive, watch,
} from 'vue';
import { createVueApp, NotificationsStore, translate } from 'CoreHome';
import BulkActionsToolbar from './BulkActionsToolbar.vue';
import {
  BulkResult, LIST_CONFIGS, ListConfig, RESULT_STORAGE_KEY, Selection,
} from './types';

// The Tag Manager lists are core Vue components: the toolbar is a Vue app mounted above the table,
// the row checkboxes are injected in the rendered rows and kept in sync with the shared selection.

const mountedLists = new Map<HTMLElement, App>();

function getRowId(row: HTMLElement, idPrefix: string): string | null {
  if (!row.id || !row.id.startsWith(idPrefix)) {
    return null;
  }
  const id = row.id.substring(idPrefix.length);
  return /^\d+$/.test(id) ? id : null;
}

function createCheckboxCell(tagName: 'td' | 'th'): HTMLElement {
  const cell = document.createElement(tagName);
  cell.className = 'tme-checkbox-cell';
  return cell;
}

function syncRows(table: HTMLTableElement, config: ListConfig, selection: Selection) {
  const headerRow = table.querySelector('thead tr');
  if (headerRow && !headerRow.querySelector('.tme-checkbox-cell')) {
    headerRow.insertBefore(createCheckboxCell('th'), headerRow.firstChild);
  }

  const available: string[] = [];
  table.querySelectorAll<HTMLElement>(`tbody tr.${config.rowClass}`).forEach((row) => {
    const id = getRowId(row, config.idPrefix);
    if (!id) {
      return;
    }
    available.push(id);

    let checkbox = row.querySelector<HTMLInputElement>('.tme-row-checkbox');
    if (!checkbox) {
      const cell = createCheckboxCell('td');
      const label = document.createElement('label');
      label.className = 'tme-checkbox-label';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.className = 'tme-row-checkbox';
      input.addEventListener('change', () => {
        selection.selected = input.checked
          ? [...selection.selected.filter((selectedId) => selectedId !== id), id]
          : selection.selected.filter((selectedId) => selectedId !== id);
      });
      label.append(input, document.createElement('span'));
      cell.appendChild(label);
      row.insertBefore(cell, row.firstChild);
      checkbox = input;
    }

    const isSelected = selection.selected.includes(id);
    checkbox.checked = isSelected;
    row.classList.toggle('tme-selected', isSelected);
  });

  if (available.join(',') !== selection.available.join(',')) {
    selection.available = available;
  }
  const stillAvailable = selection.selected.filter((id) => available.includes(id));
  if (stillAvailable.length !== selection.selected.length) {
    selection.selected = stillAvailable;
  }
}

function initList(container: HTMLElement, config: ListConfig) {
  if (mountedLists.has(container)) {
    return;
  }

  // the core list only shows its action bar to users with write access
  const actionBar = container.querySelector<HTMLElement>('.tableActionBar');
  const table = container.querySelector<HTMLTableElement>('table');
  if (!actionBar || actionBar.style.display === 'none' || !table || !table.parentNode) {
    return;
  }

  const selection = reactive<Selection>({ available: [], selected: [] });

  const mountPoint = document.createElement('div');
  table.parentNode.insertBefore(mountPoint, table);
  const app = createVueApp({
    render: () => createVNode(BulkActionsToolbar, { entityType: config.type, selection }),
  });
  app.mount(mountPoint);
  mountedLists.set(container, app);

  let scheduled = false;
  const refresh = () => {
    if (scheduled) {
      return;
    }
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      syncRows(table, config, selection);
    });
  };

  new MutationObserver(refresh).observe(table, { childList: true, subtree: true });
  watch(() => selection.selected.slice(), refresh);
  refresh();
}

function scan() {
  LIST_CONFIGS.forEach((config) => {
    document.querySelectorAll<HTMLElement>(config.selector).forEach((container) => {
      initList(container, config);
    });
  });

  mountedLists.forEach((app, container) => {
    if (!container.isConnected) {
      app.unmount();
      mountedLists.delete(container);
    }
  });
}

function showPendingResult() {
  let result: BulkResult | null = null;
  try {
    const stored = window.sessionStorage.getItem(RESULT_STORAGE_KEY);
    window.sessionStorage.removeItem(RESULT_STORAGE_KEY);
    result = stored ? JSON.parse(stored) as BulkResult : null;
  } catch (e) {
    result = null;
  }

  if (!result) {
    return;
  }

  NotificationsStore.show({
    message: result.failed
      ? translate('TagManagerExtended_BulkPartialSuccess', result.success, result.failed)
      : translate('TagManagerExtended_BulkSuccess', result.success),
    context: result.failed ? 'warning' : 'success',
    type: 'transient',
    id: 'TagManagerExtendedBulkResult',
  });
}

let scanScheduled = false;
new MutationObserver(() => {
  if (scanScheduled) {
    return;
  }
  scanScheduled = true;
  window.requestAnimationFrame(() => {
    scanScheduled = false;
    scan();
  });
}).observe(document.body, { childList: true, subtree: true });

scan();
showPendingResult();
