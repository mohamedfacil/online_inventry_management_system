<?php 	

require_once 'core.php';

$customerid = $_POST['customerid'];

$sql = "SELECT customer_id,status FROM customer WHERE customer_id = $customerid";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);