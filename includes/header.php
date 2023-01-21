<?php require_once 'php_action/core.php'; ?>

<!DOCTYPE html>
<html>
<head>

	<title>Stock Management System</title>

	<!-- bootstrap -->
	<link rel="stylesheet" href="assests/bootstrap/css/bootstrap.min.css">
	<!-- bootstrap theme-->
	<link rel="stylesheet" href="assests/bootstrap/css/bootstrap-theme.min.css">
	<!-- font awesome -->
	<link rel="stylesheet" href="assests/font-awesome/css/font-awesome.min.css">

  <!-- custom css -->
  <link rel="stylesheet" href="custom/css/custom.css">
  <link rel="stylesheet" href="custom/css/style.css">

	<!-- DataTables -->
  <link rel="stylesheet" href="assests/plugins/datatables/jquery.dataTables.min.css">

  <!-- file input -->
  <link rel="stylesheet" href="assests/plugins/fileinput/css/fileinput.min.css">

  <!-- jquery -->
  <script src="assests/jquery/jquery.min.js"></script>
  <!-- jquery ui -->  
  <link rel="stylesheet" href="assests/jquery-ui/jquery-ui.min.css">
  <script src="assests/jquery-ui/jquery-ui.min.js"></script>

  <!-- bootstrap js -->
	<script src="assests/bootstrap/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>
  <script src="assests/plugins/jquery.simple-checkbox-table.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css">
</head>
<body>

<nav class="navbar navbar-default navbar-static-top">
      <ul class="nav navbar-nav navbar-right">        
      <?php if(isset($_SESSION['userId']) && $_SESSION['userId']==1) { ?>
      <li class="dropdown" id="navSetting">
          <a href="#" class="dropdown-toggle notify" data-toggle="dropdown" role="button" aria-haspopup="true" onclick="viewFunction()" aria-expanded="false">  
			  <i class="glyphicon glyphicon-bell"></i><span class="badge badge-danger" id="badge_id">
        <?php 
				      	$sql = "SELECT id FROM notification WHERE status = 0";
						$result = $connect->query($sql);
                        $count = mysqli_num_rows($result);
                        if($count>0)
                        {
                           echo $count;
                        }
                        else
                        {
                           echo " <script>$(\"#badge_id\").remove();</script>";
                        }
                       
	?>
	</span> <span class="caret"></span></a>
          <ul class="dropdown-menu" >  
		  <?php 
				      	$sql = "SELECT * FROM notification WHERE status = 0";
						$result = $connect->query($sql);
						if(mysqli_num_rows($result)>0)
						{
							while($row = $result->fetch_array())
							{
								echo '<li><a id="notification">'.$row[1].' record has been modified</a></li>';
								echo '<div class="dropdown-divider"></div>';
							}
						}
                        else
                        {
                                echo '<li><a>Sorry No Messages</a></li>';
                        }
?>             
         </ul>  
          </li>  
   <?php } ?>   

  <li class="dropdown" id="navSetting">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="glyphicon glyphicon-user"></i> <span class="caret"></span></a>
          <ul class="dropdown-menu" >   <li> 
			<?php if(isset($_SESSION['userId']) && $_SESSION['userId']==1) { ?>
            <li id="topNavSetting"><a href="setting.php"> <i class="glyphicon glyphicon-wrench"></i> Setting</a></li>
            <li id="topNavUser"><a href="user.php"> <i class="glyphicon glyphicon-wrench"></i> Add User</a></li>
      <?php } ?>              
            <li id="topNavLogout"><a href="logout.php"> <i class="glyphicon glyphicon-log-out"></i> Logout</a></li>            
        </li>  </ul>        
        </li>        
           
      </ul>
  
	</nav>

	

<nav id="sidebar">
    <div class="sidebar-header">
    <img src="img.png" alt="Avatar" style="vertical-align: middle;width: 150px;" class="mt-3">
       <h3 class="bottom">OIMS</h3>
   </div>

  <ul class="list-unstyled components">
       <p><a href="dashboard.php" id="uniq" class="subleft"><i class="glyphicon glyphicon-list-alt"></i> Dashboard</a></p>
       <?php if(isset($_SESSION['userId']) && $_SESSION['userId']==1) { ?>
       <li>
           <a href="brand.php" id="uniq" class="tcenter"><i class="glyphicon glyphicon-btc"></i> Brand</a>
       </li>
       <?php } ?>
       <?php if(isset($_SESSION['userId']) && $_SESSION['userId']==1) { ?>
       <li class="active">
           <a href="#homeSubmenu"  data-toggle="collapse" id="uniq"aria-expanded="false" class="tcenter">
           <i class="glyphicon glyphicon-ruble"></i>  Products         <span class="caret"></span>
          
           </a>
           <ul class="collapse list-unstyled ul1" id="homeSubmenu">
          
               <li>
                   <a href="product.php" id="uniq" class="subleft"> All Products</a>
               </li>
               <li>
                   <a href="categories.php" id="uniq" class="subleft"> Categories</a>
               </li>
              
           </ul>
       </li>
       <?php } ?>
       <li class="active">
           <a href="#homeSubmenu1"  data-toggle="collapse" id="uniq"aria-expanded="false" class="tcenter">
           <i class="glyphicon glyphicon-shopping-cart"></i> Orders   <span class="caret"></span>
           </a>
           <ul class="collapse list-unstyled ul1" id="homeSubmenu1">
         
               <li>
                   <a href="orders.php?o=add" id="uniq" class="subleft"><i class="glyphicon glyphicon-plus"></i> Add Order</a>
               </li>
               <li>
                   <a href="orders.php?o=manord" id="uniq" class="subleft"><i class="glyphicon glyphicon-edit"></i> Manage Order</a>
               </li>
              
           </ul>
       </li>

       <?php if(isset($_SESSION['userId']) && $_SESSION['userId']==1) { ?>
       <li>
           <a href="customer.php" id="uniq" class="tcenter"><i class="glyphicon glyphicon-user"></i> Customer</a>
       </li>
       <?php } ?>
       <?php if(isset($_SESSION['userId']) && $_SESSION['userId']==1) { ?>
       <li>
           <a href="store.php" id="uniq" class="tcenter"><i class="glyphicon glyphicon-user"></i> Store</a>
       </li>
       <?php } ?>
       <?php if(isset($_SESSION['userId']) && $_SESSION['userId']==1) { ?>
       <li>
           <a href="report.php" id="uniq" class="tcenter"><i class="glyphicon glyphicon-check"></i> Reports</a>
       </li>
       <?php } ?>
      
   </ul>    


</nav>
<script>
function viewFunction()
{
    //  alert("works fine");
     $("#badge_id").remove();
	    $.ajax({

		url:'php_action/view_notification.php',
		method:'POST',
		
    }); 
    // $(document).on('click','.notify',function(){
              setTimeout(explode, 2500);
            //   }); 
     function explode()
     {
        $("#notification").remove();
        // location.reload(true);
        // $("#notification").text("Sorry No Messages");
     }        
}
    
</script>



  