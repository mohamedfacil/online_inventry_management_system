<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {
	$store_address = $_POST['editstore_address'];
	$store_name = $_POST['editstore_name'];
	$mobile_no = $_POST['editmobile_no'];

	$storeid 		= $_POST['storeid'];

				
	$sql = "UPDATE store SET store_name='$store_name',store_address='$store_address',mobile_no='$mobile_no' WHERE store_id = $storeid ";

	if($connect->query($sql) === TRUE) {
		$valid['success'] = true;
		$valid['messages'] = "Successfully Update";	
	} else {
		$valid['success'] = false;
		$valid['messages'] = "Error while updating product info";
	}

} // /$_POST
	 
$connect->close();

echo json_encode($valid);
 
