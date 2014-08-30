<?php

namespace Api\Model;

require_once __DIR__ . "/../Utils.php";

class Property
{
    private $db;
    public $properties;

    private function loadListFromQuery($queryString) {
        $this->db = connect_db();
        if (!$this->db) {
            die('Could not connect: ' . mysql_error());
        }
        // Todo add web security.
        $result = $this->db->query( $queryString );
        $data = array();
        while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
            $data[] = $row;
        }
        $this->properties = $data; // Just in case..
        return $data;
    }

    public function __construct()
    {
        
    }

    public function getProperties()
    {
        return $this->loadListFromQuery('SELECT id, type, sale, rent, rentPrice, salePrice, currency, title, description FROM properties LIMIT 3;');
    }

    /**
     *  Obtain the list of properties after the given Id (sorted by created data desc).
     */
    public function getPropertiesAfterId() {
        return $this->loadListFromQuery('SELECT id, type, sale, rent, rentPrice, salePrice, currency, title, description FROM properties WHERE id > 2 LIMIT 10;');
    }

    /**
     *  Save the Property.
     */
    public function save() {
        return $this->loadListFromQuery('SELECT id, type, sale, rent, rentPrice, salePrice, currency, title, description FROM properties WHERE id > 2 LIMIT 10;');
    }

    public function getFeature($id)
    {
        if (!array_key_exists($id, $this->features)) {
            return null;
        }
        return array_merge(
            array('id' => $id),
            $this->features[$id],
            array('href' => $this->getHref($id))
        );
    }
}
