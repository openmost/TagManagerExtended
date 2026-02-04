<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManagerExtended;

use Piwik\Piwik;
use Piwik\Common;
use Piwik\Plugins\TagManager\API as TagManagerAPI;
use Exception;

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
     * Maximum number of items that can be processed in a single bulk operation
     */
    private const MAX_BULK_ITEMS = 100;

    /**
     * Validate and sanitize site ID
     *
     * @param mixed $idSite The site ID to validate
     * @return int The validated site ID
     * @throws Exception If the site ID is invalid
     */
    private function validateSiteId($idSite): int
    {
        $idSite = (int)$idSite;
        if ($idSite <= 0) {
            throw new Exception('Invalid site ID');
        }
        return $idSite;
    }

    /**
     * Validate and sanitize container ID
     *
     * @param mixed $idContainer The container ID to validate
     * @return string The validated container ID
     * @throws Exception If the container ID is invalid
     */
    private function validateContainerId($idContainer): string
    {
        $idContainer = (string)$idContainer;
        // Container IDs should only contain alphanumeric characters
        if (!preg_match('/^[a-zA-Z0-9]+$/', $idContainer) || strlen($idContainer) > 32) {
            throw new Exception('Invalid container ID');
        }
        return $idContainer;
    }

    /**
     * Validate and sanitize container version ID
     *
     * @param mixed $idContainerVersion The container version ID to validate
     * @return int The validated container version ID
     * @throws Exception If the container version ID is invalid
     */
    private function validateContainerVersionId($idContainerVersion): int
    {
        $idContainerVersion = (int)$idContainerVersion;
        if ($idContainerVersion <= 0) {
            throw new Exception('Invalid container version ID');
        }
        return $idContainerVersion;
    }

    /**
     * Validate and sanitize an array of IDs
     *
     * @param mixed $ids The array of IDs to validate
     * @return array The validated array of integer IDs
     * @throws Exception If the input is not a valid array or exceeds limits
     */
    private function validateIdArray($ids): array
    {
        if (!is_array($ids)) {
            throw new Exception('IDs must be provided as an array');
        }

        if (count($ids) === 0) {
            throw new Exception('At least one ID must be provided');
        }

        if (count($ids) > self::MAX_BULK_ITEMS) {
            throw new Exception('Cannot process more than ' . self::MAX_BULK_ITEMS . ' items at once');
        }

        $validatedIds = [];
        foreach ($ids as $id) {
            $intId = (int)$id;
            if ($intId > 0) {
                $validatedIds[] = $intId;
            }
        }

        if (count($validatedIds) === 0) {
            throw new Exception('No valid IDs provided');
        }

        return $validatedIds;
    }

    /**
     * Bulk delete multiple tags.
     *
     * @param int $idSite The site ID
     * @param string $idContainer The container ID
     * @param int $idContainerVersion The container version ID
     * @param array $idTags Array of tag IDs to delete
     * @return array Result with success and failed counts
     * @throws Exception If validation fails
     */
    public function bulkDeleteTags($idSite, $idContainer, $idContainerVersion, $idTags)
    {
        // Validate and sanitize all inputs
        $idSite = $this->validateSiteId($idSite);
        $idContainer = $this->validateContainerId($idContainer);
        $idContainerVersion = $this->validateContainerVersionId($idContainerVersion);
        $idTags = $this->validateIdArray($idTags);

        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idTags as $idTag) {
            try {
                $api->deleteContainerTag($idSite, $idContainer, $idContainerVersion, $idTag);
                $success++;
            } catch (Exception $e) {
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
     * @throws Exception If validation fails
     */
    public function bulkPauseTags($idSite, $idContainer, $idContainerVersion, $idTags)
    {
        // Validate and sanitize all inputs
        $idSite = $this->validateSiteId($idSite);
        $idContainer = $this->validateContainerId($idContainer);
        $idContainerVersion = $this->validateContainerVersionId($idContainerVersion);
        $idTags = $this->validateIdArray($idTags);

        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idTags as $idTag) {
            try {
                $api->pauseContainerTag($idSite, $idContainer, $idContainerVersion, $idTag);
                $success++;
            } catch (Exception $e) {
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
     * @throws Exception If validation fails
     */
    public function bulkResumeTags($idSite, $idContainer, $idContainerVersion, $idTags)
    {
        // Validate and sanitize all inputs
        $idSite = $this->validateSiteId($idSite);
        $idContainer = $this->validateContainerId($idContainer);
        $idContainerVersion = $this->validateContainerVersionId($idContainerVersion);
        $idTags = $this->validateIdArray($idTags);

        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idTags as $idTag) {
            try {
                $api->resumeContainerTag($idSite, $idContainer, $idContainerVersion, $idTag);
                $success++;
            } catch (Exception $e) {
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
     * @throws Exception If validation fails
     */
    public function bulkDeleteTriggers($idSite, $idContainer, $idContainerVersion, $idTriggers)
    {
        // Validate and sanitize all inputs
        $idSite = $this->validateSiteId($idSite);
        $idContainer = $this->validateContainerId($idContainer);
        $idContainerVersion = $this->validateContainerVersionId($idContainerVersion);
        $idTriggers = $this->validateIdArray($idTriggers);

        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idTriggers as $idTrigger) {
            try {
                $api->deleteContainerTrigger($idSite, $idContainer, $idContainerVersion, $idTrigger);
                $success++;
            } catch (Exception $e) {
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
     * @throws Exception If validation fails
     */
    public function bulkDeleteVariables($idSite, $idContainer, $idContainerVersion, $idVariables)
    {
        // Validate and sanitize all inputs
        $idSite = $this->validateSiteId($idSite);
        $idContainer = $this->validateContainerId($idContainer);
        $idContainerVersion = $this->validateContainerVersionId($idContainerVersion);
        $idVariables = $this->validateIdArray($idVariables);

        Piwik::checkUserHasCapability($idSite, 'tagmanager_write');

        $api = TagManagerAPI::getInstance();
        $success = 0;
        $failed = 0;

        foreach ($idVariables as $idVariable) {
            try {
                $api->deleteContainerVariable($idSite, $idContainer, $idContainerVersion, $idVariable);
                $success++;
            } catch (Exception $e) {
                $failed++;
            }
        }

        return ['success' => $success, 'failed' => $failed];
    }
}
