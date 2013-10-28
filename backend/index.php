<?php
    $streams = array(
        "php://output",
        "php://input",
    );
    //var_dump($_SERVER['PATH_INFO']);
    foreach($streams as $stream) {
        $data = file_get_contents($stream);
        var_dump($stream, $data);
        print "\r\n\r\n";
    }
    $_PUT  = array();  
    if($_SERVER['REQUEST_METHOD'] == 'DELETE') {  
        var_dump(file_get_contents('php://input'), $_PUT);  
    }  
    exit;
    $data = json_decode(file_get_contents('php://input'));
    $exist = json_decode(file_get_contents('../data/pills.json'));
    $exist[] = $data;
    file_put_contents('../data/pills.json', json_encode($exist));
?>