<?php 	



require_once 'core.php';

$sql = "SELECT store_id,store_name,store_address,mobile_no FROM store";

$result = $connect->query($sql);

$output = array('data' => array());
if($result->num_rows > 0) { 

 while($row = $result->fetch_array()) {
 	$storeid = $row[0];
     // active 
  
 	
     $checkbox ="<input type=\"checkbox\" value='".$storeid."' >"; 
 	$button = '
	<div class="btn-group">
	  <button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Action <span class="caret"></span>
	  </button>
	  <ul class="dropdown-menu">
	    <li><a type="button" data-toggle="modal" data-target="#editStoreModal" id="editStoreModalBtn"onclick="editStore('.$storeid.')"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
	    <li><a type="button" data-toggle="modal" data-target="#removeMemberModal" onclick="removeStore('.$storeid.')"> <i class="glyphicon glyphicon-trash"></i> Remove</a></li>       
	  </ul>
	</div>';

	

 	$output['data'][] = array( 
        $checkbox, 		
        $row[1], 
        $row[2], 
        $row[3],
        $button,
 		); 	
 } // /while 

}// if num_rows

$connect->close();

echo json_encode($output);