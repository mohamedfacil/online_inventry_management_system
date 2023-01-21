<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

foreach($_POST["id"] as $id)
{
   
    $sql = "UPDATE brands SET brand_status = 2 WHERE brand_id = {$id}";
    $connect->query($sql);

    $sql1 = "UPDATE product SET brand_id = 1 WHERE brand_id = {$id} AND status = 1";
 	$connect->query($sql1);
}

 $connect->close();

 echo json_encode($valid);
 
