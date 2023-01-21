var manageCustomerTable;

$(document).ready(function() {
	// top bar active
	$('#navCustomer').addClass('active');
	//checkbox select
	$("table").simpleCheckboxTable();
	$("#sidebar").mCustomScrollbar({
        theme: "minimal"
	  });
	  jQuery(document).on('click','#reset', function(){
		// location.reload(true);
		manageCustomerTable.ajax.reload(null, true);
	  }); 
	// manage Customer Data Table
	manageCustomerTable = $('#manageCustomerTable').DataTable({
		'ajax': 'php_action/fetchCustomer.php',
		'order': []
	});

    // on click on submit customer form modal
	$("#addCustomerModalBtn").unbind('click').bind('click', function() {
		// // product form reset
		$("#submitCustomerForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

	  

		// submit product form
		$("#submitCustomerForm").unbind('submit').bind('submit', function() {
			// form validation
			var customerName = $("#customerName").val();
			var wa_no = $("#wa_no").val();
			var status = $("#status").val();
	
			if(customerName == "") {
				$("#customerName").after('<p class="text-danger">customer name field is required</p>');
				$('#customerName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#customerName").find('.text-danger').remove();
				// success out for form 
				$("#customerName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			

			if(wa_no == "") {
				$("#wa_no").after('<p class="text-danger">Password field is required</p>');
				$('#wa_no').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#wa_no").find('.text-danger').remove();
				// success out for form 
				$("#wa_no").closest('.form-group').addClass('has-success');	  	
			}	// /else
			if(status == "") {
				$("#status").after('<p class="text-danger">Password field is required</p>');
				$('#status').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#status").find('.text-danger').remove();
				// success out for form 
				$("#status").closest('.form-group').addClass('has-success');	  	
			}	// /else

			
				// /else

			if(customerName) {
				// submit loading button
				$("#createCustomerBtn").button('loading');

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
							$("#createCustomerBtn").button('reset');
							
							$("#submitCustomerForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-customer-messages').html('<div class="alert alert-success">'+
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
							manageCustomerTable.ajax.reload(null, true);
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

// Bulk Deletion on customer
jQuery(document).on('click','#delete', function(){
	var deletion = $("#bulkDeletion").val();
	if(deletion){
	if(confirm("Are you sure you want to delete this Customers?"))
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
	  url:'php_action/removeBulkCustomer.php',
	  method:'POST',
	  data:{id:id},
	 });
	}
	}
	location.reload(true);
	}
  });
  $(document).on('click','.view_api',function(){
	var customerid = jQuery(this).data("customerid");

	$.ajax({
		url:'php_action/viewApi.php',
		method:'POST',
		data:{customerid:customerid},
		success:function(response) {
			$(`#apikey-${customerid}`).text(response.slice(6, 38));
		}
	}); 
});
  $(document).on('click','.reset_api',function(){
	var customerid = jQuery(this).data("customerid");
	//  alert(customerid);
	// var apikey = jQuery(this).data("apikey");
	// console.log(apikey);
	$.ajax({
		url:'php_action/resetApi.php',
		method:'POST',
		data:{customerid:customerid},
		success:function(response) {
		manageCustomerTable.ajax.reload(null, true);
		}
	}); 
	});

  //customer edit function
function editCustomer(customerid = null) {

	if(customerid) {
		console.log(customerid);
		// remove hidden customer id text
		$('#customerid').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-customer-result').addClass('div-hide');
		
		// modal footer
		$('.editCustomerFooter').addClass('div-hide');
		// $('#editCustomerModal').modal('show');
		
		$.ajax({
			url: 'php_action/fetchSelectedCustomer.php',
			type: 'post',
			data: {customerid : customerid},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-customer-result').removeClass('div-hide');
				// modal footer
				$('.editCustomerFooter').removeClass('div-hide');

			
				// setting the customer status value
				$('#editstatus').val(response.status);
				// customer id 
				$(".editCustomerFooter").after('<input type="hidden" name="customerid" id="customerid" value="'+response.customer_id+'" />');

				// $.validator.setDefaults({
				// 	submitHandler: function() {
				// update customer form 
				$('#editCustomerForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var editstatus = $('#editstatus').val();
					if(editstatus) {
						var form = $(this);

						// submit btn
						$('#editCustomerBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editCustomerBtn').button('reset');

									// reload the manage member table 
									location.reload(true);
									// manageCustomerTable.ajax.reload(true);								  	  										
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-customer-messages').html('<div class="alert alert-success">'+
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
				}); // /update customer form
		
			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
// });
} // /edit customers function

//remove customer function
function removeCustomer(customerid = null) {
	console.log(customerid);
	if(customerid) {
		$('#removeCustomerid').remove();
		$.ajax({
			url: 'php_action/fetchSelectedCustomer.php',
			type: 'post',
			data: {customerid : customerid},
			dataType: 'json',
			success:function(response) {
				$('.removeCustomerFooter').after('<input type="hidden" name="removeCustomerid" id="removeCustomerid" value="'+response.customer_id+'" /> ');

				// click on remove button to remove the Customer
				$("#removeCustomerBtn").unbind('click').bind('click', function() {
					// button loading
					$("#removeCustomerBtn").button('loading');

					$.ajax({
						url: 'php_action/removeCustomer.php',
						type: 'post',
						data: {customerid : customerid},
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// button loading
							$("#removeCustomerBtn").button('reset');
							if(response.success == true) {

								// hide the remove modal 
								$('#removeMemberModal').modal('hide');

								// reload the customer table 
								manageCustomerTable.ajax.reload(null, false);
								
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
					}); // /ajax function to remove the customer

				}); // /click on remove button to remove the customer

			} // /success
		}); // /ajax

		$('.removeCustomerFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} 