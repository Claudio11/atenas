<?php

function connect_db(){
    $server = 'localhost';
    $user = 'root';
    $pass = '22octubre';
    $database = 'atenas';
    $db = new \mysqli($server, $user, $pass, $database);

    return $db;
}