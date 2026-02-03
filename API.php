<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManagerExtended;

use Piwik\Piwik;
use Piwik\Plugins\TagManager\API as TagManagerAPI;

/**
 * API for plugin TagManagerExtended.
 *
 * Provides bulk actions for tags, triggers, and variables.
 *
 * @method static \Piwik\Plugins\TagManagerExtended\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    /**
     * Bulk delete multiple tags.
     *
     * @param int $idSite The site ID
     * @param string $idContainer The container ID
     * @param int $idContainerVersion The container version ID
     * @param array $idTags Array of tag IDs to delete
     * @return array Result with success and failed counts
     */
    public function bulkDeleteTags($idSite, $idContainer, $idContainerVersion, $idTags)
    {
        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idTags as $idTag) {
            try {
                $api->deleteContainerTag($idSite, $idContainer, $idContainerVersion, (int)$idTag);
                $success++;
            } catch (\Exception $e) {
                $failed++;
            }
        }

        return ['success' => $success, 'failed' => $failed];
    }

    /**
     * Bulk pause multiple tags.
     *
     * @param int $idSite The site ID
     * @param string $idContainer The container ID
     * @param int $idContainerVersion The container version ID
     * @param array $idTags Array of tag IDs to pause
     * @return array Result with success and failed counts
     */
    public function bulkPauseTags($idSite, $idContainer, $idContainerVersion, $idTags)
    {
        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idTags as $idTag) {
            try {
                $api->pauseContainerTag($idSite, $idContainer, $idContainerVersion, (int)$idTag);
                $success++;
            } catch (\Exception $e) {
                $failed++;
            }
        }

        return ['success' => $success, 'failed' => $failed];
    }

    /**
     * Bulk resume multiple tags.
     *
     * @param int $idSite The site ID
     * @param string $idContainer The container ID
     * @param int $idContainerVersion The container version ID
     * @param array $idTags Array of tag IDs to resume
     * @return array Result with success and failed counts
     */
    public function bulkResumeTags($idSite, $idContainer, $idContainerVersion, $idTags)
    {
        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idTags as $idTag) {
            try {
                $api->resumeContainerTag($idSite, $idContainer, $idContainerVersion, (int)$idTag);
                $success++;
            } catch (\Exception $e) {
                $failed++;
            }
        }

        return ['success' => $success, 'failed' => $failed];
    }

    /**
     * Bulk delete multiple triggers.
     *
     * @param int $idSite The site ID
     * @param string $idContainer The container ID
     * @param int $idContainerVersion The container version ID
     * @param array $idTriggers Array of trigger IDs to delete
     * @return array Result with success and failed counts
     */
    public function bulkDeleteTriggers($idSite, $idContainer, $idContainerVersion, $idTriggers)
    {
        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idTriggers as $idTrigger) {
            try {
                $api->deleteContainerTrigger($idSite, $idContainer, $idContainerVersion, (int)$idTrigger);
                $success++;
            } catch (\Exception $e) {
                $failed++;
            }
        }

        return ['success' => $success, 'failed' => $failed];
    }

    /**
     * Bulk delete multiple variables.
     *
     * @param int $idSite The site ID
     * @param string $idContainer The container ID
     * @param int $idContainerVersion The container version ID
     * @param array $idVariables Array of variable IDs to delete
     * @return array Result with success and failed counts
     */
    public function bulkDeleteVariables($idSite, $idContainer, $idContainerVersion, $idVariables)
    {
        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idVariables as $idVariable) {
            try {
                $api->deleteContainerVariable($idSite, $idContainer, $idContainerVersion, (int)$idVariable);
                $success++;
            } catch (\Exception $e) {
                $failed++;
            }
        }

        return ['success' => $success, 'failed' => $failed];
    }
}
