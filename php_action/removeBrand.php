<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$brandId = $_POST['brandId'];

if($brandId) { 

 $sql = "UPDATE brands SET brand_status = 2 WHERE brand_id = {$brandId}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the brand";
 }

    $sql1 = "UPDATE product SET brand_id = 1 WHERE brand_id = {$brandId} AND status = 1";
 	$connect->query($sql1);
 
 $connect->close();

 echo json_encode($valid);
 
} 