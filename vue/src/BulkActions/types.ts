/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

export type EntityType = 'tag' | 'trigger' | 'variable';

export type BulkAction = 'delete' | 'pause' | 'resume';

export interface Selection {
  // ids of the rows currently displayed in the list
  available: string[];
  selected: string[];
}

export interface BulkResult {
  success: number;
  failed: number;
}

export interface ListConfig {
  selector: string;
  type: EntityType;
  rowClass: string;
  idPrefix: string;
}

export const LIST_CONFIGS: ListConfig[] = [
  {
    selector: '.tagManagerTagList', type: 'tag', rowClass: 'tags', idPrefix: 'tag',
  },
  {
    selector: '.tagManagerTriggerList', type: 'trigger', rowClass: 'triggers', idPrefix: 'trigger',
  },
  {
    selector: '.tagManagerVariableList', type: 'variable', rowClass: 'variables', idPrefix: 'variable',
  },
];

export const API_METHODS: Record<EntityType, Partial<Record<BulkAction, string>>> = {
  tag: {
    delete: 'TagManagerExtended.bulkDeleteTags',
    pause: 'TagManagerExtended.bulkPauseTags',
    resume: 'TagManagerExtended.bulkResumeTags',
  },
  trigger: {
    delete: 'TagManagerExtended.bulkDeleteTriggers',
  },
  variable: {
    delete: 'TagManagerExtended.bulkDeleteVariables',
  },
};

export const ID_PARAMETERS: Record<EntityType, string> = {
  tag: 'idTags',
  trigger: 'idTriggers',
  variable: 'idVariables',
};

// the result is displayed after the page reload that refreshes the list
export const RESULT_STORAGE_KEY = 'TagManagerExtended.bulkResult';
