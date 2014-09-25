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
            // TODO: normalize rent and sale empty values, etc, also set correct currency.
            $stmt = $this->db->prepare('INSERT INTO properties (title, description, sale, salePrice, type) VALUES ("'. $property->title .'", "'. $property->description .'", '. $property->sale .', '. $property->salePrice .', "'. $property->type .'")');
            // $stmt->bindParam("title", $property->title);
            // $stmt->bindParam("description", $property->description);
            // $stmt->bindParam("type", $property->type);
            // $stmt->bindParam("sale", $property->sale);
            // $stmt->bindParam("rent", $property->rent);
            // $stmt->bindParam("salePrice", $property->salePrice);
            // $stmt->bindParam("rentPrice", $property->rentPrice);
            $stmt->execute();

            // TODO !!!!!!!!!!!!! Seguir aca, ahora inserta, aceptar valores empty, etc, obtener objeto insertado y devolverlo.
            return true;
        }
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
    public function save($property) {
        $propertyData = $property['data']; 
        // return $this->executeInsert('INSERT INTO properties (title, 
        //                                                      description, 
        //                                                      sale, 
        //                                                      salePrice, 
        //                                                      currency, 
        //                                                      type) 
        //                                         VALUES('. $propertyData->title .', 
        //                                                "sdfsdf s df sdf s df s df sd fs sdfsdfsdfs df sdf sdf sd fsdf", 
        //                                                1, 
        //                                                130000, 
        //                                                "us", "
        //                                                house");');
        
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
