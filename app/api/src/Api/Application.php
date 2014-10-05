<?php

namespace Api;

use Api\Model\Features;
use Api\Model\Property;
use \Slim\Slim;
use \Exception;

// TODO Move all "features" things to a class with index() and get() methods
class Application extends Slim
{
    public $configDirectory;
    public $config;

    protected function initConfig()
    {
        $config = array();
        if (!file_exists($this->configDirectory) || !is_dir($this->configDirectory)) {
            throw new Exception('Config directory is missing: ' . $this->configDirectory, 500);
        }
        foreach (preg_grep('/\\.php$/', scandir($this->configDirectory)) as $filename) {
            $config = array_replace_recursive($config, include $this->configDirectory . '/' . $filename);
        }
        return $config;
    }

    public function __construct(array $userSettings = array(), $configDirectory = 'config')
    {
        // Slim initialization
        parent::__construct($userSettings);
        $this->config('debug', false);
        $this->notFound(function () {
            $this->handleNotFound();
        });
        $this->error(function ($e) {
            $this->handleException($e);
        });

        // Config
        $this->configDirectory = __DIR__ . '/../../' . $configDirectory;
        $this->config = $this->initConfig();

        // /features
        $this->get('/api/features', function () {
            $features = new Features($this->config['features']);
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($features->getFeatures()));
        });

        $this->get('/api/features/:id', function ($id) {
            $features = new Features($this->config['features']);
            $feature = $features->getFeature($id);
            if ($feature === null) {
                return $this->notFound();
            }
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($feature));
        });

        // Properties
        $this->get('/api/properties', function () {
            $properties = new Property();
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($properties->getProperties()));
        });

        // Properties
        $this->get('/api/propertiesAfterId/:lastId', function ($lastId) {
            $properties = new Property();
            $this->response->headers->set('Content-Type', 'application/json');
            $this->response->setBody(json_encode($properties->getPropertiesAfterId($lastId)));
        });

        // New Property
        $this->post('/api/properties/new', function () {
            $properties = new Property();
            $this->response->headers->set('Content-Type', 'application/json');
            $post = json_decode($this->request()->getBody());
            $postArray = get_object_vars($post);
            $result = $properties->save($postArray);
            
            if ($result){
                $response = array("status" => true, "id" => $result);
            }
            else{
               $response = array("status" => false);
            }
            $this->response->setBody(json_encode($response));
        });

        // File upload. 
        $this->post('/api/uploadImage', function () {
            // $properties = new Property();
            // $this->response->headers->set('Content-Type', 'application/json');
            // $this->response->setBody(json_encode($properties->getPropertiesAfterId($lastId)));

            // TODO add web security
            // if (!isset($_FILES['uploads'])) {
            //     //return "No files uploaded!!";
            // }
            // $imgs = array();

            // $files = $_FILES['uploads'];
            try {
                $uploadedFile = $_FILES['file'];
                // Undefined | Multiple Files | $_FILES Corruption Attack
                // If this request falls under any of them, treat it invalid.
                if (
                    !isset($uploadedFile['error']) ||
                    is_array($uploadedFile['error'])
                ) {
                    throw new RuntimeException('Invalid parameters.');
                }

                // Check $uploadedFile['error'] value.
                if ($uploadedFile['error'] != 0) {
                    throw new RuntimeException('Unknown errors.');
                }

                // You should also check filesize here. 
                if ($uploadedFile['size'] > 1000000) {
                    throw new RuntimeException('Exceeded filesize limit.');
                }

                // DO NOT TRUST $uploadedFile['mime'] VALUE !!
                // Check MIME Type by yourself.
                $finfo = new finfo(FILEINFO_MIME_TYPE);
                if (false === $ext = array_search(
                    $finfo->file($uploadedFile['tmp_name']),
                    array(
                        'jpg' => 'image/jpeg',
                        'png' => 'image/png',
                        'gif' => 'image/gif',
                    ),
                    true
                )) {
                    throw new RuntimeException('Invalid file format.');
                }

                // You should name it uniquely.
                // DO NOT USE $uploadedFile['name'] WITHOUT ANY VALIDATION !!
                // On this example, obtain safe unique name from its binary data.
                if (!move_uploaded_file(
                    $uploadedFile['tmp_name'],
                    sprintf('./uploads/%s.%s',
                        sha1_file($uploadedFile['tmp_name']),
                        $ext
                    )
                )) {
                    throw new RuntimeException('Failed to move uploaded file.');
                }

                $response = 'File is uploaded successfully.';

            } catch (RuntimeException $e) {

                $response = $e->getMessage();

            }

            $this->response->setBody(json_encode($response));
        });
    }

    public function handleNotFound()
    {
        throw new Exception(
            'Resource ' . $this->request->getResourceUri() . ' using '
            . $this->request->getMethod() . ' method does not exist.',
            404
        );
    }

    public function handleException(Exception $e)
    {
        $status = $e->getCode();
        $statusText = \Slim\Http\Response::getMessageForCode($status);
        if ($statusText === null) {
            $status = 500;
            $statusText = 'Internal Server Error';
        }

        $this->response->setStatus($status);
        $this->response->headers->set('Content-Type', 'application/json');
        $this->response->setBody(json_encode(array(
            'status' => $status,
            'statusText' => preg_replace('/^[0-9]+ (.*)$/', '$1', $statusText),
            'description' => $e->getMessage(),
        )));
    }

    /**
     * @return \Slim\Http\Response
     */
    public function invoke()
    {
        foreach ($this->middleware as $middleware) {
            $middleware->call();
        }
        $this->response()->finalize();
        return $this->response();
    }
}
