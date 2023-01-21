<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {
	$status = $_POST['editstatus'];

	$customerid 		= $_POST['customerid'];

				
	$sql = "UPDATE customer SET status = '$status' WHERE customer_id = $customerid ";

	if($connect->query($sql) === TRUE) {
		$valid['success'] = true;
		$valid['messages'] = "Successfully Update";	
	} else {
		$valid['success'] = false;
		$valid['messages'] = "Error while updating product info";
	}
	$sql = "UPDATE notification SET status = 0 WHERE customer_name in (SELECT customer_name FROM customer where customer_id = $customerid)";
	$result = $connect->query($sql);

} // /$_POST
	 
$connect->close();

echo json_encode($valid);
 
