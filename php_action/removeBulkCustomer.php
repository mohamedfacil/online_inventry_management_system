<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

foreach($_POST["id"] as $id)
{
   
    $sql = "DELETE from customer WHERE customer_id = {$id}";
    $connect->query($sql);
   
}
 
 $connect->close();

 echo json_encode($valid);
 
