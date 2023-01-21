<?php 	

require_once 'core.php';



$sql = "UPDATE notification SET status=1 WHERE status = 0";
$result = $connect->query($sql);

$connect->close();

?>