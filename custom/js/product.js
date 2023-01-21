var manageProductTable;

$(document).ready(function() {
	// top nav bar 
	$('#navProduct').addClass('active');
	// manage product data table
	$("#sidebar").mCustomScrollbar({
        theme: "minimal"
      });

	  manageProductTable = $('#manageProductTable').DataTable({
		
		'ajax': {
			"url": 'php_action/fetchProduct.php',
		},
			'order': [],

		
	 });
	 $("table").simpleCheckboxTable();
	
	

	$("#submitProductForm").validate({
		rules: {
			productName : {
			required: true,
			minlength: 3
		  },
			productImage : {
			required: true,
		  },
			quantity : {
			required: true,
		  },
			rate : {
			required: true,
		  },
			productStatus : {
			required: true,
		  },
	
		},
	
		messages : {
			productName: {
					minlength: "Name should be at least 3 characters"
				},
			   
	}
	  });
	$("#editProductForm").validate({
		rules: {
			productName : {
			required: true,
			minlength: 3
		  },
		// 	productImage : {
		// 	required: true,
		//   },
			quantity : {
			required: true,
		  },
			rate : {
			required: true,
		  },
			brandName : {
			required: true,
		  },
			productStatus : {
			required: true,
		  },
	
		},
	
		messages : {
			productName: {
					minlength: "Name should be at least 3 characters"
				},
			   
	}
	  });

	// add product modal btn clicked
	$("#addProductModalBtn").unbind('click').bind('click', function() {
		// // product form reset
		$("#submitProductForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		$("#productImage").fileinput({
	      overwriteInitial: true,
		    maxFileSize: 2500,
		    showClose: false,
		    showCaption: false,
		    browseLabel: '',
		    removeLabel: '',
		    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
		    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
		    removeTitle: 'Cancel or reset changes',
		    elErrorContainer: '#kv-avatar-errors-1',
		    msgErrorClass: 'alert alert-block alert-danger',
		    defaultPreviewContent: '<img src="assests/images/photo_default.png" alt="Profile Image" style="width:100%;">',
		    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
	  		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
			});   

		// submit product form
		$.validator.setDefaults({
			submitHandler: function() {
		$("#submitProductForm").unbind('submit').bind('submit', function() {

			// form validation
			var productImage = $("#productImage").val();
			var productName = $("#productName").val();
			var quantity = $("#quantity").val();
			var rate = $("#rate").val();
			var brandName = $("#brandName").val();
			var categoryName = $("#categoryName").val();
			var productStatus = $("#productStatus").val();
	
			
			

		

			

			

			if(productImage && productName && quantity && rate && brandName && categoryName && productStatus) {
				// submit loading button
				$("#createProductBtn").button('loading');

				var form = $(this);
				var formData = new FormData(this);
                // console.log(formData);
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
							$("#createProductBtn").button('reset');
							
							$("#submitProductForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-product-messages').html('<div class="alert alert-success">'+
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
							manageProductTable.ajax.reload(null, true);

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
	}
});
	}); // /add product modal btn clicked
	

	// remove product 	

}); // document.ready fucntion
jQuery(document).on('click','#filterps', function(){
	var product_category=$("#product_category").val();
	var stock_status=$("#stock_status").val();
	if(product_category)
	{
		myFunction();
	}
	else if(stock_status)
	{
		myFunction1();
	}
        function myFunction() {
            var input, filter, table, tr, td, i;
            input = document.getElementById("product_category");
            filter = input.value.toUpperCase();
            table = document.getElementById("manageProductTable");
            tr = table.getElementsByTagName("tr");
            
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[6];
              if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }
            }
       }
        function myFunction1() {
            var input, filter, table, tr, td, i;
            input = document.getElementById("stock_status");
            filter = input.value.toUpperCase();
            table = document.getElementById("manageProductTable");
            tr = table.getElementsByTagName("tr");
            
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[7];
              if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }
            }
           }
      
	});
function editProduct(productId = null) {

	if(productId) {
		$("#productId").remove();		
		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');
		// modal spinner
		$('.div-loading').removeClass('div-hide');
		// modal div
		$('.div-result').addClass('div-hide');

		
		 

		$.ajax({
			url: 'php_action/fetchSelectedProduct.php',
			type: 'post',
			data: {productId: productId},
			dataType: 'json',
			success:function(response) {		
			// alert(response.product_image);
				// modal spinner
				$('.div-loading').addClass('div-hide');
				// modal div
				$('.div-result').removeClass('div-hide');				

				$("#getProductImage").attr('src', 'stock/'+response.product_image);

				$("#editProductImage").fileinput({		      
				});  

				

				// product id 
				$(".editProductFooter").append('<input type="hidden" name="productId" id="productId" value="'+response.product_id+'" />');				
				$(".editProductPhotoFooter").append('<input type="hidden" name="productId" id="productId" value="'+response.product_id+'" />');				
				
				// product name
				$("#editProductName").val(response.product_name);
				// quantity
				$("#editQuantity").val(response.quantity);
				// rate
				$("#editRate").val(response.rate);
				// brand name
				$("#editBrandName").val(response.brand_id);
				// category name
				$("#editCategoryName").val(response.categories_id);
				// status
				$("#editProductStatus").val(response.active);


				function explode(){
					// alert("Now Edit Product Details!");
					var categoryreduce = $("#editCategoryName").val();
					var brandreduce = $("#editBrandName").val();
					console.log(categoryreduce);
					console.log(brandreduce);
			   
				    
				     jQuery.ajax({
				   		  url:'php_action/reduceSelectedProduct.php',
				   		  method:"POST",
				   		  data:{categoryreduce:categoryreduce,brandreduce:brandreduce},
				   		  dataType:"json",
				   			})
				  
				 }
				 
				 setTimeout(explode, 500);

				// update the product data function
				$.validator.setDefaults({
					submitHandler: function() {
		
				$("#editProductForm").unbind('submit').bind('submit', function() {

					// form validation
					var productImage = $("#editProductImage").val();
					var productName = $("#editProductName").val();
					var quantity = $("#editQuantity").val();
					var rate = $("#editRate").val();
					var brandName = $("#editBrandName").val();
					var categoryName = $("#editCategoryName").val();
					var productStatus = $("#editProductStatus").val();
								
					

					if(productName && quantity && rate && brandName && categoryName && productStatus) {
						// submit loading button
						$("#editProductBtn").button('loading');

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
								console.log(response);
								if(response.success == true) {
									// submit loading button
									$("#editProductBtn").button('reset');																		

									$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																			
									// shows a successful message after operation
									$('#edit-product-messages').html('<div class="alert alert-success">'+
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
									manageProductTable.ajax.reload(null, true);

									// remove text-error 
									$(".text-danger").remove();
									// remove from-group error
									$(".form-group").removeClass('has-error').removeClass('has-success');

								} // /if response.success
								
							} // /success function
						}); // /ajax function
					}	 // /if validation is ok 					

					return false;
				}); // update the product data function
			}
		});
				// update the product image				
				$("#updateProductImageForm").unbind('submit').bind('submit', function() {					
					// form validation
					var productImage = $("#editProductImage").val();					
					
					if(productImage == "") {
						$("#editProductImage").closest('.center-block').after('<p class="text-danger">Product Image field is required</p>');
						$('#editProductImage').closest('.form-group').addClass('has-error');
					}	else {
						// remov error text field
						$("#editProductImage").find('.text-danger').remove();
						// success out for form 
						$("#editProductImage").closest('.form-group').addClass('has-success');	  	
					}	// /else

					if(productImage) {
						// submit loading button
						$("#editProductImageBtn").button('loading');

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
									$("#editProductImageBtn").button('reset');																		

									$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																			
									// shows a successful message after operation
									$('#edit-productPhoto-messages').html('<div class="alert alert-success">'+
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
									manageProductTable.ajax.reload(null, true);

									$(".fileinput-remove-button").click();

									$.ajax({
										url: 'php_action/fetchProductImageUrl.php?i='+productId,
										type: 'post',
										success:function(response) {
										$("#getProductImage").attr('src', response);		
										}
									});																		

									// remove text-error 
									$(".text-danger").remove();
									// remove from-group error
									$(".form-group").removeClass('has-error').removeClass('has-success');

								} // /if response.success
								
							} // /success function
						}); // /ajax function
					}	 // /if validation is ok 					

					return false;
				}); // /update the product image

			} // /success function
		}); // /ajax to fetch product image

				
	} else {
		alert('error please refresh the page');
	}
} // /edit product function

// remove product 
function removeProduct(productId = null) {
	if(productId) {
		// remove product button clicked
		$("#removeProductBtn").unbind('click').bind('click', function() {
			// loading remove button
			// var categories_id=$("#product_category").val();
			console.log(productId);
			$("#removeProductBtn").button('loading');
			// if(confirm("okk")){
			$.ajax({
				url: 'php_action/removeProduct.php',
				type: 'post',
				data: {productId: productId},
				dataType: 'json',
				success:function(response) {
					// loading remove button
					$("#removeProductBtn").button('reset');
					if(response.success == true) {
						// remove product modal
						$("#removeProductModal").modal('hide');

						// update the product table
						manageProductTable.ajax.reload(null, false);

						// remove success messages
						$(".remove-messages").html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert
					} else {

						// remove success messages
						$(".removeProductMessages").html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert

					} // /error
				} // /success function
			}); // /ajax fucntion to remove the product
		
			return false;
		}); // /remove product btn clicked
	} // /if productid
} // /remove product function
		jQuery(document).on('click','#reset', function(){
			location.reload(true);
		});

// bulk deletion on product page
	jQuery(document).on('click','#delete', function(){
	var deletion = $("#bulkDeletion").val();
	if(deletion){
	if(confirm("Are you sure you want to delete this products?"))
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
	  url:'php_action/removeBulkProduct.php',
	  method:'POST',
	  data:{id:id},
	 
	  
	  });
	}
	
	}
	
	manageProductTable.ajax.reload(true);
	
	}
  });

