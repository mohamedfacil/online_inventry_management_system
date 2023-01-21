<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

foreach($_POST["id"] as $id)
{
   
    $sql = "UPDATE categories SET categories_status = 2 WHERE categories_id = {$id}";
    $connect->query($sql);

    $sql1 = "UPDATE product SET categories_id = 1 WHERE categories_id = {$id} AND status = 1";
    $connect->query($sql1);
}

 $connect->close();

 echo json_encode($valid);
 
