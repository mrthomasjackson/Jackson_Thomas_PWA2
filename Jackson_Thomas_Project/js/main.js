/*  
	My Community
	Author: Thomas Jackson
*/

(function($){
	/* ------------Login------------- */
	console.log("Opening function");
	$('#signinButton').click(function(e){
		e.preventDefault();
		console.log("Login Button clicked");
		var user = $('#user').val();
		var pass = $('#pass').val();
		console.log(user + " " + pass);
		$.ajax({
			url: 'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {
				username: user,
				password: pass
			},
			success: function(response){
				console.log('test user');
				if(response.error){
					alert(response.error);
				}else{
					window.location.assign('admin.html')
				}
			}
		});
	});

	/* ------------LogOut------------- */
	$('#logOut').click(function (e) {
		e.preventDefault();
		console.log('LogOut Button Clicked');
		$.get('xhr/logout.php', function() {
			window.location.assign('index.html');
		})
	});
	/* ------------Register------------- */
	$('#register').click(function(e){
		e.preventDefault();
		var firstname = $('#first').val(),
			lastname = $('#last').val(),
			email = $('#email').val(),
			username = $('#username').val(),
			password = $('#password').val();
		console.log(firstname+lastname+email+username+password);

		$.ajax({
			url: 'xhr/register.php',
			type: 'post',
			dataType: 'json',
			data: {
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password
			},
			success: function(response){
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign('admin.html');
				}
			}
		})
	});
	/* ------------Welcome------------- */
	$.getJSON('xhr/check_login.php', function(data){
		console.log(data);
		$.each(data, function(key, val){
			console.log(val.first_name);
			$('#dynamicHello').html('Welcome: ' + val.first_name);
		});
	});

	/* ------------Project List - Storage ------------- */

	$('#add').click(function(e){
		e.preventDefault();
		var projectName = $('#projectName').val(),
			projectDescription = $('#projectDescription').val(),
			projectDueDate = $('#projectDueDate').val(),
			status = $('input[name = "permissions"]:checked').val();
		console.log("Name: " + projectName);
		console.log("Description: " + projectDescription);
		console.log("Due Date: " + projectDueDate);
		console.log("Permissions: " + status);

		$.ajax({
			url: 'xhr/new_project.php',
			type: 'post',
			dataType: 'json',
			data: {
				projectName: projectName,
				projectDescription: projectDescription,
				dueDate: projectDueDate,
				status: status
			},
			success: function(response){
				console.log('Added Project');

				if(response.error) {
					alert(response.error);
				}else{
					window.location.assign('projects.html');
				}
			}
		});
	});

	/* ------------Radio and Buttons ------------- */
	$('.radioButton').click(function(e){
		e.preventDefault();
		$(this).closest('li').find('input').attr('checked', true);
	});
	$('#registerButton').click(function(e){
		e.preventDefault();
		window.location.assign('register.html');
	});
	$('#projectsButton').click(function(e){
		e.preventDefault();
		window.location.assign('projects.html');
	});
	$('#adminButton').click(function(e){
		e.preventDefault();
		window.location.assign('admin.html');
	});

	/* ------------Delete Project ------------- */
	var projects = function(){
		$.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.error){
					alert(response.error);
				}else{
					for(var i= 0, j=response.projects.length; i <j; i++){
						var result = response.projects[i];

						$('.projects').append(
							'<div style= "border:1px solid black">' +
								"<input class ='projectid' type='hidden' value='" + result.id + "'>" +
								"Project Name: " + result.projectName + "<br>" +
								"Project Description: " + result.projectDescription + "<br>"+
								"Project Status: " + result.status + "<br>" +
								'<button class ="deletebtn">Delete</button>' +
								'<button class ="editbtn">Edit</button>' +
								'</div> <br>'
						);
					}
					$('.deletebtn').on('click', function(e){
						var ID = $(this).parent().find('input').val();
						e.preventDefault();
						console.log(ID);
						console.log("Delete Button");
						$.ajax({
							url: 'xhr/delete_project.php',
							data: {
								projectID: ID
							},
							type: 'POST',
							dataType: 'json',
							success: function(response){
								if(response.error){
									alert(response.error);
								}else {
									window.location.assign("projects.html");
								}
							}
						});
					});
				}
			}
		})
	};
projects();

})(jQuery); // end private scope




