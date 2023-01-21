<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

$sql = "UPDATE categories SET categories.count =(SELECT count(*) FROM product
       WHERE  categories_id =  categories.categories_id AND status=1
       group by categories_id
     ) ";
  
	$connect->query($sql);
	 
	$connect->close();

	header('location: http://localhost/woms/brand.php');
