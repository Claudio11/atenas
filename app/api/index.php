<?php
error_reporting(-1);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
date_default_timezone_set('UTC');

// require_once(__DIR__ . '/../../php-console-master/src/PhpConsole/__autoload.php');
require_once('/var/www/html/php-console-master/src/PhpConsole/__autoload.php');

// // Call debug from PhpConsole\Handler
$handler = PhpConsole\Handler::getInstance();
$handler->start();


try {

    // Initialize Composer autoloader
    if (!file_exists($autoload = __DIR__ . '/vendor/autoload.php')) {
        throw new \Exception('Composer dependencies not installed. Run `make install --directory app/api`');
    }
    require_once $autoload;

    // Initialize Slim Framework
    if (!class_exists('\\Slim\\Slim')) {
        throw new \Exception(
            'Missing Slim from Composer dependencies.'
            . ' Ensure slim/slim is in composer.json and run `make update --directory app/api`'
        );
    }

    // Slim bug, they dont plan on fixing it soon... (http://help.slimframework.com/discussions/problems/5954-no-way-to-make-slim-work-in-a-subdir)
    $_SERVER['REQUEST_URI'] = str_replace('/dist/api', '/dist/api/api', $_SERVER['REQUEST_URI']);

    // Run application
    $app = new \Api\Application();
    $app->run();

} catch (\Exception $e) {
    if (isset($app)) {
        $app->handleException($e);
    } else {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(array(
            'status' => 500,
            'statusText' => 'Internal Server Error',
            'description' => $e->getMessage(),
        ));
    }
}