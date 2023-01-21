<?php require_once 'php_action/db_connect.php' ?>
<?php require_once 'includes/header.php'; ?>


<div class="row">
	<div class="col-md-12 scale">
	
		<ol class="breadcrumb">
		  <li><a href="dashboard.php">Home</a></li>		  
		  <li class="active">Store</li>
		</ol>

		<div class="panel panel-default">
			<div class="panel-heading">
				<div class="page-heading"> <i class="glyphicon glyphicon-edit"></i> Manage Store</div>
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
					<button class="btn btn-default button1" data-toggle="modal" id="addStoreModalBtn" data-target="#addStoreModal"> <i class="glyphicon glyphicon-plus-sign"></i> Add Store </button>
				</div> <!-- /div-action -->				
				
				<table class="table" id="manageStoreTable">
					<thead>
						<tr>
                        <th><input type="checkbox" id="checkbox"></th>
                            <th>Store Name</th>
                            <th>Address</th>
                            <th>Mobile_No</th>
							<th style="width:15%;">Options</th>
						</tr>
					</thead>
				</table>
				<!-- /table -->

			</div> <!-- /panel-body -->
		</div> <!-- /panel -->		
	</div> <!-- /col-md-12 -->
</div> <!-- /row -->

<div class="modal fade" id="addStoreModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">

    	<form class="form-horizontal" id="submitStoreForm" action="php_action/createStore.php" method="POST" enctype="multipart/form-data">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title"><i class="fa fa-plus"></i> Add Store</h4>
	      </div>

	      <div class="modal-body" style="max-height:450px; overflow:auto;">

	      	<div id="add-store-messages"></div>

	      		     	           	       

	        <div class="form-group">
	        	<label for="storeName" class="col-sm-3 control-label">Store Name: </label>
	        	
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="storeName" placeholder="store Name" name="storeName" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->	    

	        <div class="form-group">
	        	<label for="store_address" class="col-sm-3 control-label">store_address: </label>
	        	
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="store_address" placeholder="store_address" name="store_address" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->	        	 
	        <div class="form-group">
	        	<label for="mobile_no" class="col-sm-3 control-label">mobile_no: </label>
	        	
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="mobile_no" placeholder="mobile_no" name="mobile_no" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->	        	 

	         <!-- /form-group-->	 
	        <!-- /modal-body -->
	      
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
	        
	        <button type="submit" class="btn btn-primary" id="createStoreBtn" data-loading-text="Loading..." autocomplete="off"> <i class="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
	      </div> <!-- /modal-footer -->	      
     	</form> <!-- /.form -->	     
    </div> <!-- /modal-content -->    
  </div> <!-- /modal-dailog -->
</div>
<!-- / add modal -->
</div>

<div class="modal fade" id="editStoreModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">

    	<form class="form-horizontal" id="editStoreForm" action="php_action/editStore.php" method="POST">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title"><i class="fa fa-edit"></i> Edit Store</h4>
	      </div>
	      <div class="modal-body">

	      	<div id="edit-store-messages"></div>

	      	<div class="modal-loading div-hide" style="width:50px; margin:auto;padding-top:50px; padding-bottom:50px;">
						<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
						<span class="sr-only">Loading...</span>
					</div>

		      <div class="edit-store-result">
		      	 <!-- /form-group-->
				
			<div class="form-group">
	        	<label for="editstore_name" class="col-sm-3 control-label">Store Name: </label>
	        	
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="editstore_name" placeholder="editstore Name" name="editstore_name" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->	    

	        <div class="form-group">
	        	<label for="editstore_address" class="col-sm-3 control-label">Store_address: </label>
	        	
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="editstore_address" placeholder="editstore_address" name="editstore_address" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->	        	 
	        <div class="form-group">
	        	<label for="editmobile_no" class="col-sm-3 control-label">mobile_no: </label>
	        	
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="editmobile_no" placeholder="editmobile_no" name="editmobile_no" autocomplete="off">
				    </div>
	        </div>
		      </div>         	        
		     

	      </div> <!-- /modal-body -->
	      
	      <div class="modal-footer editStoreFooter">
	        <button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
	        
	        <button type="submit" class="btn btn-success" id="editStoreBtn" data-loading-text="Loading..." autocomplete="off"> <i class="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
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
        <h4 class="modal-title"><i class="glyphicon glyphicon-trash"></i> Remove Store</h4>
      </div>
      <div class="modal-body">
        <p>Do you really want to remove ?</p>
      </div>
      <div class="modal-footer removeStoreFooter">
        <button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
        <button type="button" class="btn btn-primary" id="removeStoreBtn" data-loading-text="Loading..."> <i class="glyphicon glyphicon-ok-sign"></i> Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- /remove Store -->

<script src="custom/js/store.js"></script>

<?php require_once 'includes/footer.php'; ?>