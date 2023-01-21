<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

  $productName 		= $_POST['productName'];
  $quantity 		= $_POST['quantity'];
  $rate 			= $_POST['rate'];
  $brandName 		= $_POST['brandName'];
  $categoryName 	= $_POST['categoryName'];
  $productStatus 	= $_POST['productStatus'];

	$type = explode('.', $_FILES['productImage']['name']);
	$type = $type[count($type)-1];		
	$url = '../assests/images/stock/'.uniqid(rand()).'.'.$type;
	if(in_array($type, array('gif', 'jpg', 'jpeg', 'png', 'JPG', 'GIF', 'JPEG', 'PNG'))) {
		if(is_uploaded_file($_FILES['productImage']['tmp_name'])) {			
			if(move_uploaded_file($_FILES['productImage']['tmp_name'], $url)) {
				
				$sql = "INSERT INTO product (product_name, product_image, brand_id, categories_id, quantity, rate, active, status) 
				VALUES ('$productName', '$url', '$brandName', '$categoryName', '$quantity', '$rate', '$productStatus', 1)";
				
				
				if($connect->query($sql) === TRUE) {
					$valid['success'] = true;
					$valid['messages'] = "Successfully Added";	
				} else {
					$valid['success'] = false;
					$valid['messages'] = "Error while adding the members";
				}
				    $sql1 = "UPDATE categories set count=count+1 where categories_id =  $categoryName ";
					$connect->query($sql1);
				    $sql2 = "UPDATE brands set count=count+1 where brand_id =  $brandName ";
					$connect->query($sql2);

			}	else {
				return false;
			}	// /else	
		} // if
	} // if in_array 		

	$connect->close();

	// echo json_encode($valid);
	header('location: http://localhost/woms/product.php');
} // /if $_POST