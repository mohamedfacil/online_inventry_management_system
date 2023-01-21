var manageStoreTable;

$(document).ready(function() {
	// top bar active
	$('#navStore').addClass('active');
	//checkbox select
	$("table").simpleCheckboxTable();
	$("#sidebar").mCustomScrollbar({
        theme: "minimal"
	  });
	  jQuery(document).on('click','#reset', function(){
		// location.reload(true);
		manageStoreTable.ajax.reload(null, true);
	  }); 
	// manage Store Data Table
	manageStoreTable = $('#manageStoreTable').DataTable({
		'ajax': 'php_action/fetchStore.php',
		'order': []
	});

    // on click on submit Store form modal
	$("#addStoreModalBtn").unbind('click').bind('click', function() {
		// // product form reset
		$("#submitStoreForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

	  

		// submit product form
		$("#submitStoreForm").unbind('submit').bind('submit', function() {
			// form validation
			var storeName = $("#storeName").val();
			var store_address = $("#store_address").val();
			var mobile_no = $("#mobile_no").val();
	
			if(storeName == "") {
				$("#storeName").after('<p class="text-danger">store name field is required</p>');
				$('#storeName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#storeName").find('.text-danger').remove();
				// success out for form 
				$("#storeName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			

			if(store_address == "") {
				$("#store_address").after('<p class="text-danger">Password field is required</p>');
				$('#store_address').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#store_address").find('.text-danger').remove();
				// success out for form 
				$("#store_address").closest('.form-group').addClass('has-success');	  	
			}	// /else
			if(mobile_no == "") {
				$("#mobile_no").after('<p class="text-danger">Password field is required</p>');
				$('#mobile_no').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#mobile_no").find('.text-danger').remove();
				// success out for form 
				$("#mobile_no").closest('.form-group').addClass('has-success');	  	
			}	// /else

			
				// /else

			if(storeName) {
				// submit loading button
				$("#createStoreBtn").button('loading');

				var form = $(this);
				var formData = new FormData(this);

				$.ajax({
					url : form.attr('action'),
					type: form.attr('method'),
					data: formData,
					dataType: 'json',
					cache: false,
					contentType: false,
					processData: false,
					success:function(response) {

						if(response.success == true) {
							// submit loading button
							$("#createStoreBtn").button('reset');
							
							$("#submitStoreForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-store-messages').html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

							// remove the mesages
		          $(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert

		          // reload the manage student table
							manageStoreTable.ajax.reload(null, true);
							location.reload(true);
							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success
						
					} // /success function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit product form

	});
});

// Bulk Deletion on Store
jQuery(document).on('click','#delete', function(){
	var deletion = $("#bulkDeletion").val();
	if(deletion){
	if(confirm("Are you sure you want to delete this Stores?"))
	{
	var id = [];
	
	$(':checkbox:checked').each(function(i){
	  id[i] = $(this).val();
	});
	
	if(id.length === 0) //tell you if the array is empty
	{
	  alert("Please Select atleast one checkbox");
	}
	else
	{
	  // console.log(id);
	  $.ajax({
	  url:'php_action/removeBulkStore.php',
	  method:'POST',
	  data:{id:id},
	 });
	}
	}
	location.reload(true);
	}
  });


  //Store edit function
function editStore(storeid = null) {

	if(storeid) {
		 console.log(storeid);
		// remove hidden store id text
		$('#storeid').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-store-result').addClass('div-hide');
		
		// modal footer
		$('.editStoreFooter').addClass('div-hide');
		// $('#editStoreModal').modal('show');
		
		$.ajax({
			url: 'php_action/fetchSelectedStore.php',
			type: 'post',
			data: {storeid : storeid},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-store-result').removeClass('div-hide');
				// modal footer
				$('.editStoreFooter').removeClass('div-hide');

			
				// setting the Store status value
				$('#editstore_name').val(response.store_name);
				$('#editstore_address').val(response.store_address);
				$('#editmobile_no').val(response.mobile_no);
				// Store id 
				$(".editStoreFooter").after('<input type="hidden" name="storeid" id="storeid" value="'+response.store_id+'" />');

				// $.validator.setDefaults({
				// 	submitHandler: function() {
				// update store form 
				$('#editStoreForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var editstore_name = $('#editstore_name').val();
					var editstore_address = $('#editstore_address').val();
					var editmobile_no = $('#editmobile_no').val();
					if(editstore_name) {
						var form = $(this);

						// submit btn
						$('#editStoreBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editStoreBtn').button('reset');

									// reload the manage member table 
									location.reload(true);
									// manageStoreTable.ajax.reload(true);								  	  										
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-store-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
								} // /if
									
							}// /success
						});	 // /ajax												
					} // /if

					return false;
				}); // /update store form
		
			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
// });
} // /edit Stores function

//remove Store function
function removeStore(storeid = null) {
	console.log(storeid);
	if(storeid) {
		$('#removeStoreid').remove();
		$.ajax({
			url: 'php_action/fetchSelectedStore.php',
			type: 'post',
			data: {storeid : storeid},
			dataType: 'json',
			success:function(response) {
				$('.removeStoreFooter').after('<input type="hidden" name="removeStoreid" id="removeStoreid" value="'+response.store_id+'" /> ');

				// click on remove button to remove the Store
				$("#removeStoreBtn").unbind('click').bind('click', function() {
					// button loading
					$("#removeStoreBtn").button('loading');

					$.ajax({
						url: 'php_action/removeStore.php',
						type: 'post',
						data: {storeid : storeid},
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// button loading
							$("#removeStoreBtn").button('reset');
							if(response.success == true) {

								// hide the remove modal 
								$('#removeMemberModal').modal('hide');

								// reload the Store table 
								manageStoreTable.ajax.reload(null, false);
								
								$('.remove-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
							} else {

							} // /else
						} // /response messages
					}); // /ajax function to remove the Store

				}); // /click on remove button to remove the Store

			} // /success
		}); // /ajax

		$('.removeStoreFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} 