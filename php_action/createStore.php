<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$storeName 		= $_POST['storeName'];
    $store_address		    = $_POST['store_address'];
    $mobile_no 			= $_POST['mobile_no'];
	
				$sql = "INSERT INTO store (store_name, store_address,mobile_no) 
				VALUES ('$storeName', '$store_address' , '$mobile_no')";
				if($connect->query($sql) === TRUE) {
					$valid['success'] = true;
					$valid['messages'] = "Successfully Added";	
				} else {
					$valid['success'] = false;
					$valid['messages'] = "Error while adding the members";
				}

		
	} // if in_array 		

	$connect->close();

	echo json_encode($valid);
 
