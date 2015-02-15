var userListData = [];

$(document).ready(function (){
	populateTable();
	$('#userList table tbody').on('click','td a.linkshowuser', showUserInfo);
	$('#btnAddUser').on('click', addUser);
});

function populateTable(){
	var tableContent = '';

	$.getJSON('/users/userlist', function(data){
			userListData = data;
			$.each(data, function(){
				tableContent += '<tr>';
				tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
				tableContent += '<td>' + this.email + '</td>';
				tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            	tableContent += '</tr>';
			});
		$('#userList table tbody').html(tableContent);
		$('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
	});
};

// Show User Info
function showUserInfo(event) {
	event.preventDefault();
	var thisUserName = $(this).attr('rel');
	var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
};

function addUser(event) {
	event.preventDefault();
	// basic basic basic validation - increase errorCount variable if any fields are blank
	var errorCount = 0;
	$('#addUser input').each(function (index,val){
		if($(this).val() === '') { errorCount++; }
	});
	// check and make sure errorCount is still at zero
	if(errorCount === 0){
		// if errorCount is zero, compile all user info into one object
		var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/users/adduser',
			dataType: 'JSON',
		}).done(function (response){
			if (response.msg === ''){
				$('#addUser fieldset input').val('');
				populateTable();
			}
			else {
				alert('Please fill in all fields');
				return false;
			}
		});
	};
};

function deleteUser(event){
	event.preventDefault();

	// pop up a confirmation dialog
	var confirmation = confirm('are you sure you want to delete this user?');

	if(confirmation === true){
		$.ajax({
			type: 'DELETE',
			url: '/users/deleteuser/' + $(this).attr('rel')
		}).done(function (response) {
			if (response.msg === ''){

			}
			else {
				alert('Error: ' + response.msg);
			}
			populateTable();
		});
	}
	else 
		return false;
};

