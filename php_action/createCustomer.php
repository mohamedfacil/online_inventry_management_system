<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$customerName 		= $_POST['customerName'];
    $wa_no 			    = $_POST['wa_no'];
    $status 			= $_POST['status'];
    $date_of_creation 	= date("Y/m/d");
    $api_keys           = bin2hex(random_bytes(16));
	
				$sql = "INSERT INTO customer (customer_name, wa_number,status,api_keys,date_of_creation) 
				VALUES ('$customerName', '$wa_no' , '$status','$api_keys', '$date_of_creation')";
				if($connect->query($sql) === TRUE) {
					$valid['success'] = true;
					$valid['messages'] = "Successfully Added";	
				} else {
					$valid['success'] = false;
					$valid['messages'] = "Error while adding the members";
				}

				// /else	
				$sql = "INSERT INTO notification (customer_name) 
				VALUES ('$customerName')";
				$connect->query($sql);
		
	} // if in_array 		

	$connect->close();

	echo json_encode($valid);
 
