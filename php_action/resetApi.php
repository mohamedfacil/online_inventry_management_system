<?php 	

require_once 'core.php';

$customerid = $_POST['customerid'];
$api_key = bin2hex(random_bytes(16));
$sql = "UPDATE customer set api_keys = '$api_key'  WHERE customer_id = $customerid";
$result = $connect->query($sql);


$connect->close();

echo json_encode($result);