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

    private function executeInsert($property) {
        $this->db = connect_db();
        if (!$this->db) {
            return null;
        }
        else{
            if ($stmt = $this->db->prepare("INSERT INTO properties (title, description, type, sale, salePrice, rent, rentPrice, currency, currencyRent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)") ) {
                $stmt->bind_param('sssiiiiss', $property->title,
                                             $property->description,
                                             $property->type,
                                             $property->sale,
                                             $property->salePrice,
                                             $property->rent,
                                             $property->rentPrice,
                                             $property->currency,
                                             $property->currencyRent);

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

    public function __construct()
    {
        
    }

    public function getProperties()
    {
        return $this->loadListFromQuery('SELECT id, type, sale, rent, rentPrice, salePrice, currency, currencyRent, title, description FROM properties LIMIT 3;');
    }

    /**
     *  Obtain the list of properties after the given Id (sorted by created data desc).
     */
    public function getPropertiesAfterId() {
        return $this->loadListFromQuery('SELECT id, type, sale, rent, rentPrice, salePrice, currency, currencyRent, title, description FROM properties WHERE id > 2 LIMIT 10;');
    }

    /**
     *  Save the Property.
     */
    public function save($property) {
        $propertyData = $property['data'];
        return $this->executeInsert($propertyData);
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
