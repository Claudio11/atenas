<?php

namespace Api\Model;

require_once __DIR__ . "/../Utils.php";

class Property
{
    private $db;
    public $properties;

    private function conn() {
        $this->db = connect_db();
        if (!$this->db) {
            die('Could not connect: ' . mysql_error());
        }
    }

    private function loadChildrenList($queryString) {
        $this->conn();
        $result = $this->db->query( $queryString );
        $data = array();
        while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
            $data[] = $row;
        }
        return $data;
    }

    private function loadListFromQuery($queryString) {
        $this->conn();
        // Todo add web security.
        $result = $this->db->query( $queryString );

        $data = array();
        while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
            $children = $this->loadChildrenList('SELECT * FROM assets where propertyId = ' . $row['id'] . ' LIMIT 10;');
            $row['children'] = $children;
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
            if ($stmt = $this->db->prepare("INSERT INTO properties (title, description, type, sale, salePrice, rent, ".
                                           "rentPrice, currency, currencyRent, bedroomLength, bathLength, garage, ".
                                           "yardage, furnished, orientation, terrace, commonExpenses, vigilance, whiteLine, ".
                                           "featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)") ) {
                $stmt->bind_param('sssiiiissiiiiisiiiii', $property->title,
                                             $property->description,
                                             $property->type,
                                             $property->sale,
                                             $property->salePrice,
                                             $property->rent,
                                             $property->rentPrice,
                                             $property->currency->val,
                                             $property->currencyRent->val,

                                             $property->bedroomLength,
                                             $property->bathLength,
                                             $property->garage,
                                             $property->yardage,
                                             $property->furnished,
                                             $property->orientation,
                                             $property->terrace,
                                             $property->commonExpenses,
                                             $property->vigilance,
                                             $property->whiteLine,
                                             $property->featured);

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

    private function executeUpdate($property) {
        $this->db = connect_db();
        if (!$this->db) {
            return null;
        }
        else{
            if ($stmt = $this->db->prepare("UPDATE properties SET title = ?, description = ?, type = ?, sale = ?, salePrice = ?, rent = ?,".
                                           " rentPrice = ?, currency = ?, currencyRent = ?, whiteLine = ?, vigilance = ?, ".
                                           " bathLength = ?, garage = ?, yardage = ?, furnished = ?, orientation = ?, ".
                                           " terrace = ?, commonExpenses = ?, featured = ?, bedroomLength = ? WHERE id = ".  $property->id ) ) {
                $stmt->bind_param('sssiiiissiiiiiisiiii', $property->title,
                                             $property->description,
                                             $property->type,
                                             $property->sale,
                                             $property->salePrice,
                                             $property->rent,
                                             $property->rentPrice,
                                             $property->currency->val,
                                             $property->currencyRent->val,
                                             $property->whiteLine,
                                             $property->vigilance,
                                             $property->bathLength,
                                             $property->garage,
                                             $property->yardage,
                                             $property->furnished,
                                             $property->orientation,
                                             $property->terrace,
                                             $property->commonExpenses,
                                             $property->featured,
                                             $property->bedroomLength);

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

    private function updateViewed($property) {
        $this->db = connect_db();
        if (!$this->db) {
            return null;
        }
        else{
            if ($stmt = $this->db->prepare("UPDATE properties SET views = ? WHERE id = ".  $property->id ) ) {
                $views = ++$property->views;
                $stmt->bind_param('i', $views);

                $stmt->execute();
                $affc_rows = $stmt->affected_rows;
                $stmt->close();
                return $affc_rows > 0;
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
        return $this->loadListFromQuery('SELECT * FROM properties LIMIT 6;');
    }

    public function getAllProperties()
    {
        return $this->loadListFromQuery('SELECT * FROM properties;');
    }

    /**
     *  Obtain the list of properties after the given Id (sorted by created data desc).
     */
    public function getPropertiesAfterId($lastId) {
        return $this->loadListFromQuery('SELECT * FROM properties WHERE id > '. $lastId .' LIMIT 10;');
    }

    public function get($propertyId)
    {
        return $this->loadListFromQuery('SELECT * FROM properties WHERE id = '. $propertyId .';');
    }

    /**
     *  Saves the Property.
     */
    public function save($property) {
        $propertyData = $property['data'];
        return $this->executeInsert($propertyData);
    }

    /**
     *  Updates the Property.
     */
    public function update($property) {
        $propertyData = $property['data'];
        return $this->executeUpdate($propertyData);
    }

    /**
     * Add a new visit to {this}.
     */
    public function addView($property) {
        $propertyData = $property['data'];
        return $this->updateViewed($propertyData);
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
