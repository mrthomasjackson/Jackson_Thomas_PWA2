/*  
	My Community
	Author: Thomas Jackson
*/

(function($){
	/* ------------Login------------- */
	console.log("Opening function");
	//listen for click on button with ID of signinButton
	$('#signinButton').click(function(e){
		//prevent the default action of button
		e.preventDefault();
		console.log("Login Button clicked");
		//create variables to store input fields
		var user = $('#user').val();
		var pass = $('#pass').val();
		console.log(user + " " + pass);
		//call ajax
		$.ajax({
			url: 'xhr/login.php',
			type: 'post',
			dataType: 'json',
			//pass username and password to login.php
			data: {
				username: user,
				password: pass
			},
			//on successful connection run
			success: function(response){
				console.log('test user');
				//alert if inputs are missing or password/ username incorrect
				if(response.error){
					alert(response.error);
				//take user to dashboard on successful login
				}else{
					window.location.assign('admin.html')
				}
			}
		});
	});

	/* ------------LogOut------------- */
	//listen for the button with logout ID
	$('#logOut').click(function (e) {
		//prevent the default button action
		e.preventDefault();
		console.log('LogOut Button Clicked');
		//retrieve logout.php using ajax and take user to homepage
		$.get('xhr/logout.php', function() {
			window.location.assign('index.html');
		})
	});
	/* ------------Register------------- */
	//listen for click on button with id of register
	$('#register').click(function(e){
		//prevent default action of register button
		e.preventDefault();
		//create variables to store input fields
		var firstname = $('#first').val(),
			lastname = $('#last').val(),
			email = $('#email').val(),
			username = $('#username').val(),
			password = $('#password').val();
		console.log(firstname+lastname+email+username+password);
		//pass stored variables to register.php
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
			//on successful connection to register.php, run function
			success: function(response){
				//alert user if there is an error
				if (response.error){
					alert(response.error);
				}else{
					//take user to dashboard after creating account
					window.location.assign('admin.html');
				}
			}
		})
	});
	/* ------------Welcome------------- */
	//check to see if anyone is logged in
	$.getJSON('xhr/check_login.php', function(data){
		console.log(data);
		$.each(data, function(key, val){
			console.log(val.first_name);
			$('#dynamicHello').html('Welcome: ' + val.first_name);
		});
	});

	/* ------------Project List - Storage ------------- */
	// listen for click on button with ID of add
	$('#add').click(function(e){
		e.preventDefault();
		//create local variables to store project input fields
		var projectName = $('#projectName').val(),
			projectDescription = $('#projectDescription').val(),
			projectDueDate = $('#projectDueDate').val(),
			status = $('input[name = "permissions"]:checked').val();
		//print the variables to the console
		console.log("Name: " + projectName);
		console.log("Description: " + projectDescription);
		console.log("Due Date: " + projectDueDate);
		console.log("Permissions: " + status);
		//pass variables through to new_project.php
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
			//on successful connection to new_project.php run function
			success: function(response){
				console.log('Added Project');

				if(response.error) {
					alert(response.error);
				}else{
					//take user to projects page
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
	//create a local variable to store function projects
	var projects = function(){
		//call ajax for projects list
		$.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.error){
					alert(response.error);
				}else{
					//create a loop to cycle through all projects
					for(var i= 0, j=response.projects.length; i <j; i++){
						var result = response.projects[i];
						//append html code in div class = 'projects'
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
					//listening for click on delete button
					$('.deletebtn').on('click', function(e){
						//created a variable to store ID associated with ID button
						var ID = $(this).parent().find('input').val();
						e.preventDefault();
						console.log(ID);
						console.log("Delete Button");
						$.ajax({
							url: 'xhr/delete_project.php',
							data: {
								//pass through local variable which stores the correct project ID
								projectID: ID
							},
							type: 'POST',
							dataType: 'json',
							success: function(response){
								if(response.error){
									alert(response.error);
								}else {
									//takes user back to projects page
									window.location.assign("projects.html");
								}
							}
						});
					});
				}
			}
		})
	};
	//initialize projects function
projects();

})(jQuery); // end private scope




