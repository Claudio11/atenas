<?php

namespace Api\Model;

require_once __DIR__ . "/../Utils.php";

class Property
{
    public $properties;

    public function __construct()
    {

    }

    public function getProperties()
    {
        $db = connect_db();
        if (!$db) {
            die('Could not connect: ' . mysql_error());
        }

        // Todo add web security.
        $result = $db->query( 'SELECT type, sale, rent, rentPrice, salePrice, currency, description FROM properties;' );
        $data = array();
        while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
            $data[] = $row;
        }
        $this->properties = $data; // Just in case..
        return $data;
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
