var manageBrandTable;

$(document).ready(function() {
	// top bar active
	$('#navBrand').addClass('active');
	//checkbox select
	$("table").simpleCheckboxTable();
	$("#sidebar").mCustomScrollbar({
        theme: "minimal"
	  });
	  
	$.ajax({
		url:'php_action/BrandCount.php',
		method:'POST',
		
	});  
	
	// manage brand table
	manageBrandTable = $("#manageBrandTable").DataTable({
		'ajax': 'php_action/fetchBrand.php',
		'order': []		
	});

    //Validation on create brand form
	$("#submitBrandForm").validate({
		rules: {
			brandName : {
			required: true,
			minlength: 3
		  },
		
		brandStatus : {
			required: true,
		  },
		},
	
		messages : {
			brandName: {
					minlength: "Name should be at least 3 characters"
				},
			}
	  });
	  //Validation on edit brand form
	$("#editBrandForm").validate({
		rules: {
			brandName : {
			required: true,
			minlength: 3
		  },
		
		brandStatus : {
			required: true,
		  },
		},
	
		messages : {
			brandName: {
					minlength: "Name should be at least 3 characters"
				},
			}
	  });


	  $.validator.setDefaults({
		submitHandler: function() {
	// submit brand form function
	$("#submitBrandForm").unbind('submit').bind('submit', function() {
		// remove the error text
		$(".text-danger").remove();
		// remove the form error
		$('.form-group').removeClass('has-error').removeClass('has-success');			

		var brandName = $("#brandName").val();
		var brandStatus = $("#brandStatus").val();

		
		if(brandName && brandStatus) {
			var form = $(this);
			// button loading
			$("#createBrandBtn").button('loading');

			$.ajax({
				url : form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				dataType: 'json',
				success:function(response) {
					// button loading
					$("#createBrandBtn").button('reset');

					if(response.success == true) {
						// reload the manage member table 
						manageBrandTable.ajax.reload(null, false);						

  	  			// reset the form text
						$("#submitBrandForm")[0].reset();
						// remove the error text
						$(".text-danger").remove();
						// remove the form error
						$('.form-group').removeClass('has-error').removeClass('has-success');
  	  			
  	  			$('#add-brand-messages').html('<div class="alert alert-success">'+
            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
          '</div>');

  	  			$(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert
					}  // if

				} // /success
			}); // /ajax	
		} // if

		return false;
	}); // /submit brand form function
		}
	});
});

// Bulk Deletion on Brand 
jQuery(document).on('click','#delete', function(){
	var deletion = $("#bulkDeletion").val();
	if(deletion){
	if(confirm("Are you sure you want to delete this brands?"))
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
	  url:'php_action/removeBulkBrand.php',
	  method:'POST',
	  data:{id:id},
	 
	  
	  });
	}
	
	}
	
	location.reload(true);
	
	}
  });

  //edit on brand form
function editBrands(brandId = null) {
	if(brandId) {
		console.log(brandId);	
		// remove hidden brand id text
		$('#brandId').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-brand-result').addClass('div-hide');
		// modal footer
		$('.editBrandFooter').addClass('div-hide');

		$.ajax({
			url: 'php_action/fetchSelectedBrand.php',
			type: 'post',
			data: {brandId : brandId},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-brand-result').removeClass('div-hide');
				// modal footer
				$('.editBrandFooter').removeClass('div-hide');

				// setting the brand name value 
				$('#editBrandName').val(response.brand_name);
				// setting the brand status value
				$('#editBrandStatus').val(response.brand_active);
				// brand id 
				$(".editBrandFooter").after('<input type="hidden" name="brandId" id="brandId" value="'+response.brand_id+'" />');

				$.validator.setDefaults({
					submitHandler: function() {
				// update brand form 
				$('#editBrandForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var brandName = $('#editBrandName').val();
					var brandStatus = $('#editBrandStatus').val();
					var brandCount = $('#editBrandCount').val();

					

					if(brandName && brandStatus && brandCount) {
						var form = $(this);

						// submit btn
						$('#editBrandBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),	
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editBrandBtn').button('reset');

									// reload the manage member table 
									manageBrandTable.ajax.reload(true);								  	  										
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-brand-messages').html('<div class="alert alert-success">'+
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
				}); // /update brand form
			}
		});
			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
} // /edit brands function

//remove brand form
function removeBrands(brandId = null) {
	console.log(brandId);
	if(brandId) {
		$('#removeBrandId').remove();
		$.ajax({
			url: 'php_action/fetchSelectedBrand.php',
			type: 'post',
			data: {brandId : brandId},
			dataType: 'json',
			success:function(response) {
				$('.removeBrandFooter').after('<input type="hidden" name="removeBrandId" id="removeBrandId" value="'+response.brand_id+'" /> ');

				// click on remove button to remove the brand
				$("#removeBrandBtn").unbind('click').bind('click', function() {
					// button loading
					$("#removeBrandBtn").button('loading');

					$.ajax({
						url: 'php_action/removeBrand.php',
						type: 'post',
						data: {brandId : brandId},
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// button loading
							$("#removeBrandBtn").button('reset');
							if(response.success == true) {

								// hide the remove modal 
								$('#removeMemberModal').modal('hide');

								// reload the brand table 
								manageBrandTable.ajax.reload(null, false);
								
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
					}); // /ajax function to remove the brand

				}); // /click on remove button to remove the brand

			} // /success
		}); // /ajax

		$('.removeBrandFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} // /remove brands function