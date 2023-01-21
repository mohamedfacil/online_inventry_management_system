<?php 	

require_once 'core.php';

$storeid = $_POST['storeid'];

$sql = "SELECT store_id,store_name,store_address,mobile_no FROM store WHERE store_id = $storeid";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);