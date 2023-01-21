<?php 	



require_once 'core.php';

$sql = "SELECT customer_id, customer_name,wa_number, status,api_keys,date_of_creation FROM customer";

$result = $connect->query($sql);

$output = array('data' => array());
if($result->num_rows > 0) { 

 $activeCustomer = ""; 

 while($row = $result->fetch_array()) {
 	$customerid = $row[0];
     // active 
     if($row[3] == 1) {
        // activate member
        $activeCustomer = "<label class='label label-success'>Approved</label>";
    } else if($row[3] == 2) {
        // deactivate member
        $activeCustomer = "<label class='label label-warning'>Pending</label>";
    }
    else
    {
        $activeCustomer = "<label class='label label-danger'>Decline</label>";
    }
 	
     $checkbox ="<input type=\"checkbox\" value='".$customerid."' >"; 
 	$button = '
	<div class="btn-group">
	  <button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Action <span class="caret"></span>
	  </button>
	  <ul class="dropdown-menu">
	    <li><a type="button" data-toggle="modal" data-target="#editCustomerModal" id="editCustomerModalBtn"onclick="editCustomer('.$customerid.')"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
	    <li><a type="button" data-toggle="modal" data-target="#removeMemberModal" onclick="removeCustomer('.$customerid.')"> <i class="glyphicon glyphicon-trash"></i> Remove</a></li>       
	  </ul>
	</div>';
  $button1 = '
	<div class="btn-group">
  <a type="button" data-customerid="'.$customerid.'" class="btn btn-info btn-sm view_api" > View </a>
  <span id="apikey-'.$customerid.'"></span>
	</div>';
  $button2 = '
	<div class="btn-group">
  <a type="button" data-customerid="'.$customerid.'"class="btn btn-success btn-sm reset_api" > Reset </a>
	<input type="hidden" value="'.$row[4].'" class="apih">
	</div>';
	

 	$output['data'][] = array( 
        $checkbox, 		
        $row[1], 
        $row[2], 
        $activeCustomer,
        $row[5],
        $button,
        $button1,
        $button2,
 		); 	
 } // /while 

}// if num_rows

$connect->close();

echo json_encode($output);