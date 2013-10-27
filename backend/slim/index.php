<?php
    
    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim();
    
    // GET route
    $app->get('/pills', function () {
        echo file_get_contents('../../data/pills.json');
    });
    
    // Handle create new item
    $app->post('/pills', function () use ($app) {
        $all_pills = json_decode(file_get_contents('../../data/pills.json'));
        $new_pill = (object)json_decode($app->request()->getBody());        
        $max_id = 0;
        foreach ($all_pills as $value) {
            if ($max_id < $value->id){
                $max_id = $value->id;
            }
        }
        $new_id = $max_id + 1;
        $new_pill->id = $new_id;
        $all_pills[] = $new_pill;
        file_put_contents('../../data/pills.json', json_encode($all_pills));        
        echo '{"id":"' . $new_id .'"}';
    });
    
    // POST route
    $app->put('/pills/:id', function () use ($app) {
        $exist = json_decode(file_get_contents('../../data/pills.json'));
        $pill = (object)json_decode($app->request()->getBody());
        $pill->id = count($exist) + 1;
        $exist[] = $pill;
        file_put_contents('../../data/pills.json', json_encode($exist));        
    });
    
    $app->delete('/pills/:id', function ($id) {
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