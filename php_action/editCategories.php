<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$categoryName = $_POST['editCategoriesName'];
  $categoryStatus = $_POST['editCategoriesStatus']; 
    $categoriesId = $_POST['editCategoriesId'];

	$sql = "UPDATE categories SET categories_name = '$categoryName', categories_active = '$categoryStatus' WHERE categories_id = '$categoriesId'";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Updated";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while updating the categories";
	}
	 
	$connect->close();

	header('location: http://localhost/woms/categories.php');
 
} // /if $_POST