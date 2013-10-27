<?php

    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim();
    
    // GET route
    $app->get('/', function () {
        echo file_get_contents('../../data/pills.json');
    });
    
    // POST route
    $app->put('/pill/', function () use ($app) {
        $exist = json_decode(file_get_contents('../../data/pills.json'));
        $pill = (object)json_decode($app->request()->getBody());
        $pill->id = count($exist) + 1;
        $exist[] = $pill;
        file_put_contents('../../data/pills.json', json_encode($exist));        
    });
    
    $app->delete('/pill/:id', function ($id) {
        $exist = json_decode(file_get_contents('../../data/pills.json'));
        foreach($exist as $key => $pill) {
            if ($pill->id == $id) {
                unset($exist[$key]);
                $exist = array_values($exist);  
                file_put_contents('../../data/pills.json', json_encode($exist));
                return;
            }
        }
    });

    $app->run();