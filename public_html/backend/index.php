<?php
    $data = json_decode(file_get_contents('php://input'));
    $exist = json_decode(file_get_contents('../data/pills.json'));
    $exist[] = $data;
    file_put_contents('../data/pills.json', json_encode($exist));
?>