<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

  $sql = "UPDATE brands SET brands.count =(SELECT count(*) FROM product
       WHERE  brand_id =  brands.brand_id AND status=1
       group by brand_id
     ) ";
  
	$connect->query($sql);
	 
	$connect->close();

	header('location: http://localhost/woms/brand.php');
