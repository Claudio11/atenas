<?php

namespace Api\Model;

require_once __DIR__ . "/../Utils.php";

class Assets
{
    protected $assets;
    private $db;

    private function executeInsert($asset) {
        $this->db = connect_db();
        if (!$this->db) {
            return null;
        }
        else{
            if ($stmt = $this->db->prepare("INSERT INTO assets (path, name) VALUES (?, ?)") ) {
                $stmt->bind_param('ss', $asset['path'], $asset['name']);

                $stmt->execute();
                $stmt->close();
                return $this->db->insert_id;
            }
            else {
                /* Error */
                return printf("Error: %s\n", $mysqli->error);
            }
        }
    }

    private function executeUpdateProperty($pictureIdList, $propertyId) {
        $this->db = connect_db();
        if (!$this->db) {
            return null;
        }
        else{
            $implodeArray = '"'.implode( '","', $pictureIdList ).'"';
            if ($stmt = $this->db->prepare("UPDATE assets (propertyId) VALUES (?) WHERE id IN (". $implodeArray .")") ) {
                $stmt->bind_param('i', $propertyId);

                $stmt->execute();
                $stmt->close();
                return true;
            }
            else {
                /* Error */
                return printf("Error: %s\n", $mysqli->error);
            }
        }
    }

    protected function getHref($id)
    {
        return './api/assets/' . $id;
    }

    public function __construct()
    {
        
    }


    public function getAssets()
    {
        $assets = array();
        foreach ($this->assets as $id => $feature) {
            $assets[] = array(
                'id' => $id,
                'name' => $feature['name'],
                'href' => $this->getHref($id),
            );
        }
        return $assets;
    }

    public function getFeature($id)
    {
        if (!array_key_exists($id, $this->assets)) {
            return null;
        }
        return array_merge(
            array('id' => $id),
            $this->assets[$id],
            array('href' => $this->getHref($id))
        );
    }

    /**
     *  Saves the Asset.
     */
    public function save($asset) {
        return $this->executeInsert($asset);
    }

    /**
     *  Updates the property related to {this}.
     *
     *  @param pictureList List of pictures to update its property Id.
     *  @param propertyId Property Id.
     */
    public function bulkUpdateProperty($pictureList, $propertyId) {
        $pictureIdList = array();
        foreach ($pictureList as $picture) {
            $pictureIdList[] = $picture->id;
        }
        return $this->executeUpdateProperty($pictureIdList, $propertyId);
    }
}
