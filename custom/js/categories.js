var manageCategoriesTable;

$(document).ready(function() {
	// active top navbar categories
	$('#navCategories').addClass('active');	

	$("#sidebar").mCustomScrollbar({
        theme: "minimal"
	  });
	  
	  $.ajax({
		url:'php_action/CategoryCount.php',
		method:'POST',
		
	}); 
      //checkbox select
	  $("table").simpleCheckboxTable();
	 // manage categories Data Table
	manageCategoriesTable = $('#manageCategoriesTable').DataTable({
		'ajax' : 'php_action/fetchCategories.php',
		'order': []
	}); 

	//Validation on create Categories form
	$("#submitCategoriesForm").validate({
		rules: {
			categoriesName : {
			required: true,
			minlength: 3
		  },
		
		categoriesStatus : {
			required: true,
		  },
		},
	
		messages : {
			categoriesName: {
					minlength: "Name should be at least 3 characters"
				},
			   
	}
	  });
	  //Validation on edit Categories form
	  $("#editCategoriesForm").validate({
		rules: {
			categoriesName : {
			required: true,
			minlength: 3
		  },
		
		categoriesStatus : {
			required: true,
		  },
		},
	
		messages : {
			categoriesName: {
					minlength: "Name should be at least 3 characters"
				},
			   
	}
	  });

	// on click on submit categories form modal
	$('#addCategoriesModalBtn').unbind('click').bind('click', function() {
		// reset the form text
		$("#submitCategoriesForm")[0].reset();
		// remove the error text
		$(".text-danger").remove();
		// remove the form error
		$('.form-group').removeClass('has-error').removeClass('has-success');


		$.validator.setDefaults({
			submitHandler: function() {
		// submit categories form function
		$("#submitCategoriesForm").unbind('submit').bind('submit', function() {

			var categoriesName = $("#categoriesName").val();
			var categoriesStatus = $("#categoriesStatus").val();

			

			if(categoriesName && categoriesStatus) {
				var form = $(this);
				// button loading
				$("#createCategoriesBtn").button('loading');

				$.ajax({
					url : form.attr('action'),
					type: form.attr('method'),
					data: form.serialize(),
					dataType: 'json',
					success:function(response) {
						// button loading
						$("#createCategoriesBtn").button('reset');

						if(response.success == true) {
							// reload the manage member table 
							manageCategoriesTable.ajax.reload(null, false);						

	  	  			// reset the form text
							$("#submitCategoriesForm")[0].reset();
							// remove the error text
							$(".text-danger").remove();
							// remove the form error
							$('.form-group').removeClass('has-error').removeClass('has-success');
	  	  			
	  	  			$('#add-categories-messages').html('<div class="alert alert-success">'+
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
		}); // submit categories form function
	}
});
	}); // /on click on submit categories form modal	

}); // /document


// Bulk Deletion on category table
jQuery(document).on('click','#delete', function(){
	var deletion = $("#bulkDeletion").val();
	if(deletion){
	if(confirm("Are you sure you want to delete this categories?"))
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
	  url:'php_action/removeBulkCategory.php',
	  method:'POST',
	  data:{id:id},
	 
	  
	  });
	}
	
	}
	
	manageCategoriesTable.ajax.reload(true);
	
	}
  });
// edit categories function
function editCategories(categoriesId = null) {
	if(categoriesId) {
		// remove the added categories id 
		$('#editCategoriesId').remove();
		// reset the form text
		$("#editCategoriesForm")[0].reset();
		// reset the form text-error
		$(".text-danger").remove();
		// reset the form group errro		
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// edit categories messages
		$("#edit-categories-messages").html("");
		// modal spinner
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-categories-result').addClass('div-hide');
		//modal footer
		$(".editCategoriesFooter").addClass('div-hide');		

		$.ajax({
			url: 'php_action/fetchSelectedCategories.php',
			type: 'post',
			data: {categoriesId: categoriesId},
			dataType: 'json',
			success:function(response) {

				// modal spinner
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-categories-result').removeClass('div-hide');
				//modal footer
				$(".editCategoriesFooter").removeClass('div-hide');	

				// set the categories name
				$("#editCategoriesName").val(response.categories_name);
				// set the categories count
				$("#editCategoriesCount").val(response.count);
				// set the categories status
				$("#editCategoriesStatus").val(response.categories_active);
				// add the categories id 
				$(".editCategoriesFooter").after('<input type="hidden" name="editCategoriesId" id="editCategoriesId" value="'+response.categories_id+'" />');


				$.validator.setDefaults({
					submitHandler: function() {
				// submit of edit categories form
				$("#editCategoriesForm").unbind('submit').bind('submit', function() {
					var categoriesName = $("#editCategoriesName").val();
					var categoriesStatus = $("#editCategoriesStatus").val();

				

					if(categoriesName && categoriesStatus) {
						var form = $(this);
						// button loading
						$("#editCategoriesBtn").button('loading');

						$.ajax({
							url : form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {
								// button loading
								$("#editCategoriesBtn").button('reset');

								if(response.success == true) {
									// reload the manage member table 
									manageCategoriesTable.ajax.reload(true);									  	  			
									
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-categories-messages').html('<div class="alert alert-success">'+
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
				}); // /submit of edit categories form
			}
		});
			} // /success
		}); // /fetch the selected categories data

	} else {
		alert('Oops!! Refresh the page');
	}
} // /edit categories function

// remove categories function
function removeCategories(categoriesId = null) {
		
	$.ajax({
		url: 'php_action/fetchSelectedCategories.php',
		type: 'post',
		data: {categoriesId: categoriesId},
		dataType: 'json',
		success:function(response) {			

			// remove categories btn clicked to remove the categories function
			$("#removeCategoriesBtn").unbind('click').bind('click', function() {
				// remove categories btn
				$("#removeCategoriesBtn").button('loading');

				$.ajax({
					url: 'php_action/removeCategories.php',
					type: 'post',
					data: {categoriesId: categoriesId},
					dataType: 'json',
					success:function(response) {
						if(response.success == true) {
 							// remove categories btn
							$("#removeCategoriesBtn").button('reset');
							// close the modal 
							$("#removeCategoriesModal").modal('hide');
							// update the manage categories table
							manageCategoriesTable.ajax.reload(null, false);
							// udpate the messages
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
 							// close the modal 
							$("#removeCategoriesModal").modal('hide');

 							// udpate the messages
							$('.remove-messages').html('<div class="alert alert-success">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

	  	  			$(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert
 						} // /else
						
						
					} // /success function
				}); // /ajax function request server to remove the categories data
			}); // /remove categories btn clicked to remove the categories function

		} // /response
	}); // /ajax function to fetch the categories data
} // remove categories function