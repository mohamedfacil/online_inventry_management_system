<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$storeid = $_POST['storeid'];

if($storeid) { 

 $sql = "DELETE FROM store  WHERE store_id = {$storeid}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the store";
 }
 
 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST