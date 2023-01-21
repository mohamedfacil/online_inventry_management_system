<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$categoriesId = $_POST['categoriesId'];

if($categoriesId) { 

 $sql = "UPDATE categories SET categories_status = 2 WHERE categories_id = {$categoriesId}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";
		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the brand";
 }
 

    $sql1 = "UPDATE product SET categories_id = 1 WHERE categories_id = {$categoriesId} AND status = 1";
    $connect->query($sql1);

 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST