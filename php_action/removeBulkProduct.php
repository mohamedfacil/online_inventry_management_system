<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());
 
foreach($_POST["id"] as $id)
        {
            
            $sql = "UPDATE product SET active = 2, status = 2 WHERE product_id = {$id}";
            $connect->query($sql);
                   
        }
   $connect->close();

 echo json_encode($valid);
 ?>
 
