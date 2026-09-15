<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="tme-bulk-actions">
    <div class="tme-bulk-select-controls">
      <label class="tme-select-all-label">
        <input
          type="checkbox"
          class="tme-select-all"
          :checked="allSelected"
          :indeterminate="someSelected"
          :disabled="!selection.available.length || isUpdating"
          @change="toggleAll(($event.target as HTMLInputElement).checked)"
        />
        <span>{{ translate('TagManagerExtended_SelectAll') }}</span>
      </label>
      <span
        v-if="selection.selected.length"
        class="tme-selection-count"
      >{{ translate('TagManagerExtended_Selected', selection.selected.length) }}</span>
    </div>
    <div class="tme-bulk-buttons">
      <button
        v-for="action in actions"
        :key="action.name"
        type="button"
        :class="`btn btn-flat tme-bulk-btn tme-bulk-${action.name}`"
        :disabled="!selection.selected.length || isUpdating"
        @click="askConfirmation(action.name)"
      >
        <span :class="action.icon" />
        {{ action.label }}
      </button>
    </div>
    <MatomoDialog
      v-model="showConfirmation"
      @yes="execute()"
    >
      <div class="ui-confirm">
        <h2>{{ confirmationMessage }}</h2>
        <!-- role="yes|no" is the Matomo modalConfirm button convention, not an ARIA role -->
        <!-- eslint-disable vuejs-accessibility/aria-role -->
        <input
          role="yes"
          type="button"
          :value="translate('General_Yes')"
        />
        <input
          role="no"
          type="button"
          :value="translate('General_No')"
        />
        <!-- eslint-enable vuejs-accessibility/aria-role -->
      </div>
    </MatomoDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  AjaxHelper,
  MatomoDialog,
  MatomoUrl,
  NotificationsStore,
  translate,
} from 'CoreHome';
import {
  API_METHODS,
  BulkAction,
  BulkResult,
  EntityType,
  ID_PARAMETERS,
  RESULT_STORAGE_KEY,
  Selection,
} from './types';

interface ContainerParams {
  idSite: string;
  idContainer: string;
  idContainerVersion: string;
}

interface BulkActionsToolbarState {
  showConfirmation: boolean;
  pendingAction: BulkAction | null;
  isUpdating: boolean;
}

const CONFIRMATION_KEYS: Record<BulkAction, string> = {
  delete: 'TagManagerExtended_ConfirmBulkDelete',
  pause: 'TagManagerExtended_ConfirmBulkPause',
  resume: 'TagManagerExtended_ConfirmBulkResume',
};

function toParam(value: unknown, pattern: RegExp): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  const text = String(value);
  return pattern.test(text) ? text : null;
}

function readVueEntryAttribute(name: string): unknown {
  const entry = document.querySelector(`[vue-entry^="TagManager."][${name}]`);
  const raw = entry?.getAttribute(name);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return raw;
  }
}

function getContainerParams(): ContainerParams | null {
  const parsed = MatomoUrl.parsed.value;
  const idSite = toParam(parsed.idSite, /^\d+$/);
  const idContainer = toParam(
    parsed.idContainer || readVueEntryAttribute('id-container'),
    /^[a-zA-Z0-9]{1,32}$/,
  );
  const idContainerVersion = toParam(
    parsed.idContainerVersion || readVueEntryAttribute('id-container-version'),
    /^\d+$/,
  );

  if (!idSite || !idContainer || !idContainerVersion) {
    return null;
  }

  return { idSite, idContainer, idContainerVersion };
}

export default defineComponent({
  components: {
    MatomoDialog,
  },
  props: {
    entityType: {
      type: String as PropType<EntityType>,
      required: true,
    },
    // reactive selection shared with the row checkboxes injected in the Tag Manager list
    selection: {
      type: Object as PropType<Selection>,
      required: true,
    },
  },
  data(): BulkActionsToolbarState {
    return {
      showConfirmation: false,
      pendingAction: null,
      isUpdating: false,
    };
  },
  computed: {
    actions() {
      const actions = [];
      if (this.entityType === 'tag') {
        actions.push(
          { name: 'pause', icon: 'icon-pause', label: translate('TagManagerExtended_BulkPause') },
          { name: 'resume', icon: 'icon-play', label: translate('TagManagerExtended_BulkResume') },
        );
      }
      actions.push({ name: 'delete', icon: 'icon-delete', label: translate('TagManagerExtended_BulkDelete') });
      return actions as { name: BulkAction, icon: string, label: string }[];
    },
    allSelected(): boolean {
      return this.selection.available.length > 0
        && this.selection.selected.length === this.selection.available.length;
    },
    someSelected(): boolean {
      return this.selection.selected.length > 0 && !this.allSelected;
    },
    confirmationMessage(): string {
      if (!this.pendingAction) {
        return '';
      }
      return translate(CONFIRMATION_KEYS[this.pendingAction], this.selection.selected.length);
    },
  },
  methods: {
    toggleAll(checked: boolean) {
      // eslint-disable-next-line vue/no-mutating-props
      this.selection.selected = checked ? [...this.selection.available] : [];
    },
    askConfirmation(action: BulkAction) {
      this.pendingAction = action;
      this.showConfirmation = true;
    },
    execute() {
      const action = this.pendingAction;
      const method = action ? API_METHODS[this.entityType][action] : undefined;
      const ids = this.selection.selected.filter((id) => /^\d+$/.test(id));
      if (!method || !ids.length) {
        return;
      }

      const params = getContainerParams();
      if (!params) {
        NotificationsStore.show({
          message: translate('TagManagerExtended_BulkMissingContainer'),
          context: 'error',
          type: 'transient',
          id: 'TagManagerExtendedBulkResult',
        });
        return;
      }

      this.isUpdating = true;
      AjaxHelper.post<BulkResult>(
        { method, ...params },
        { [ID_PARAMETERS[this.entityType]]: ids },
      ).then((result) => {
        try {
          window.sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
        } catch (e) {
          // the result notification is optional
        }
        window.location.reload();
      }).catch(() => {
        // AjaxHelper already displays the error notification
        this.isUpdating = false;
      });
    },
  },
});
</script>
