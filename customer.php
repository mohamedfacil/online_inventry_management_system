<?php require_once 'php_action/db_connect.php' ?>
<?php require_once 'includes/header.php'; ?>


<div class="row">
	<div class="col-md-12 scale">
	
		<ol class="breadcrumb">
		  <li><a href="dashboard.php">Home</a></li>		  
		  <li class="active">Customer</li>
		</ol>

		<div class="panel panel-default">
			<div class="panel-heading">
				<div class="page-heading"> <i class="glyphicon glyphicon-edit"></i> Manage Customer</div>
			</div> <!-- /panel-heading -->
			<div class="panel-body">

				<div class="remove-messages"></div>
				<div class="form-row">
                <div class="form-group col-md-3">
                    <select id="bulkDeletion" name="bulkDeletion" class="form-control">
                        <option selected disabled>Bulk action</option>
                        <option   value="Delete">Delete</option>
                      </select>
                </div>

                <div class="form-group col-md-2">
                 
                    <button type="submit" id="delete" class="btn btn-primary mb-2">Apply</button>
				</div>
				<div class="form-group col-md-1">
                    <button type="submit" id="reset"class="btn btn-success mb-2">Reset</button>
                </div>
              </div>

				<div class="div-action pull pull-right" style="padding-bottom:20px;">
					<button class="btn btn-default button1" data-toggle="modal" id="addCustomerModalBtn" data-target="#addCustomerModal"> <i class="glyphicon glyphicon-plus-sign"></i> Add Customer </button>
				</div> <!-- /div-action -->				
				
				<table class="table" id="manageCustomerTable">
					<thead>
						<tr>
                        <th><input type="checkbox" id="checkbox"></th>
                            <th>Customer Name</th>
                            <th>WA-no</th>
                            <th>Status</th>
                            <th>Date</th>
							<th style="width:15%;">Options</th>
							<th>View API</th>
                            <th>Reset API</th>
						</tr>
					</thead>
				</table>
				<!-- /table -->

			</div> <!-- /panel-body -->
		</div> <!-- /panel -->		
	</div> <!-- /col-md-12 -->
</div> <!-- /row -->

<div class="modal fade" id="addCustomerModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">

    	<form class="form-horizontal" id="submitCustomerForm" action="php_action/createCustomer.php" method="POST" enctype="multipart/form-data">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title"><i class="fa fa-plus"></i> Add Customer</h4>
	      </div>

	      <div class="modal-body" style="max-height:450px; overflow:auto;">

	      	<div id="add-customer-messages"></div>

	      		     	           	       

	        <div class="form-group">
	        	<label for="customerName" class="col-sm-3 control-label">Customer Name: </label>
	        	
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="customerName" placeholder="customer Name" name="customerName" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->	    

	        <div class="form-group">
	        	<label for="wa_no" class="col-sm-3 control-label">wa_no: </label>
	        	
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="wa_no" placeholder="wa_no" name="wa_no" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->	        	 

	         <!-- /form-group-->	 
	        <div class="form-group">
	        	<label for="status" class="col-sm-3 control-label">Status: </label>
	        
				    <div class="col-sm-8">
				      <select class="form-control" id="status" name="status">
				      	<option value="">~~SELECT~~</option>
				      	<option value="1">Approved</option>
				      	<option value="2">Pending</option>
				      	<option value="3">Decline</option>
				      </select>
				    </div>
	        </div> <!-- /modal-body -->
	      
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
	        
	        <button type="submit" class="btn btn-primary" id="createCustomerBtn" data-loading-text="Loading..." autocomplete="off"> <i class="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
	      </div> <!-- /modal-footer -->	      
     	</form> <!-- /.form -->	     
    </div> <!-- /modal-content -->    
  </div> <!-- /modal-dailog -->
</div>
<!-- / add modal -->
</div>

<div class="modal fade" id="editCustomerModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">

    	<form class="form-horizontal" id="editCustomerForm" action="php_action/editCustomer.php" method="POST">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title"><i class="fa fa-edit"></i> Edit Customer</h4>
	      </div>
	      <div class="modal-body">

	      	<div id="edit-customer-messages"></div>

	      	<div class="modal-loading div-hide" style="width:50px; margin:auto;padding-top:50px; padding-bottom:50px;">
						<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
						<span class="sr-only">Loading...</span>
					</div>

		      <div class="edit-customer-result">
		      	 <!-- /form-group-->
				         	        
		        <div class="form-group">
	        	<label for="editstatus" class="col-sm-3 control-label">Status: </label>
	        
				    <div class="col-sm-8">
				      <select class="form-control" id="editstatus" name="editstatus">
				      	<option value="">~~SELECT~~</option>
				      	<option value="1">Approved</option>
				      	<option value="2">Pending</option>
				      	<option value="3">Decline</option>
				      </select>
				    </div>
	        </div> <!-- /form-group-->	
		      </div>         	        
		     

	      </div> <!-- /modal-body -->
	      
	      <div class="modal-footer editCustomerFooter">
	        <button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
	        
	        <button type="submit" class="btn btn-success" id="editCustomerBtn" data-loading-text="Loading..." autocomplete="off"> <i class="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
	      </div>
	      <!-- /modal-footer -->
     	</form>
	     <!-- /.form -->
    </div>
    <!-- /modal-content -->
  </div>
  <!-- /modal-dailog -->
</div>
<!-- / add modal -->



<div class="modal fade" tabindex="-1" role="dialog" id="removeMemberModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"><i class="glyphicon glyphicon-trash"></i> Remove Customer</h4>
      </div>
      <div class="modal-body">
        <p>Do you really want to remove ?</p>
      </div>
      <div class="modal-footer removeCustomerFooter">
        <button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
        <button type="button" class="btn btn-primary" id="removeCustomerBtn" data-loading-text="Loading..."> <i class="glyphicon glyphicon-ok-sign"></i> Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- /remove Customer -->

<script src="custom/js/customer.js"></script>

<?php require_once 'includes/footer.php'; ?>