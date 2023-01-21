<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$customerid = $_POST['customerid'];

if($customerid) { 

 $sql = "DELETE FROM customer  WHERE customer_id = {$customerid}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the customer";
 }
 
 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST