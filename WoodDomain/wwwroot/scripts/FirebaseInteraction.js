// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyAriM1cYot7RFF9qD39uPwvOY57Fgi01MU",
	authDomain: "woodlinedomainapp.firebaseapp.com",
	storageBucket: "woodlinedomainapp.appspot.com",
	messagingSenderId: "357563189494",
	appId: "1:357563189494:web:b77bd208d0aa95b92a84d7",
	measurementId: "G-FLQG2MPWYC",
	projectId: "woodlinedomainapp"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


function isLogin() {
	var login = localStorage.getItem("user");
	if (!login) {
		window.location.href = "/login";
	}
}

function getUserInfo() {
	var login = localStorage.getItem("user");
	if (login) {
		return login;
	}
	else {
		logout();
	}
}

function redirectToHome() {
	var login = localStorage.getItem("user");
	if (login) {
		window.location.href = "/";
	}
}

function logout() {
	localStorage.removeItem("user");
	window.location.href = "/login";
	
}

function getEmployeesFromFirebase() {

	var table = document.getElementById("employeeTable"),
		tbody = table.getElementsByTagName("tbody")[0];
	tbody.innerHTML = '';
	const firebaseRef = firebase.database().ref().child('Employees');

	firebaseRef.once('value', function (snapshot) {

		if (snapshot.exists()) {
			var content = '';

			snapshot.forEach(function (data) {
				if (data.val().Email) {
					var row = document.createElement("tr");
					var cell1 = document.createElement("td");
					var cell2 = document.createElement("td");
					var cell3 = document.createElement("td");
					var cell4 = document.createElement("td");
					var cell5 = document.createElement("td");
					var cell6 = document.createElement("td");
					var cell7 = document.createElement("td");
					cell1.innerHTML = data.val()['First Name'] + " " + data.val()['Last Name'];
					cell2.innerHTML = data.val().Email
					cell3.innerHTML = data.val().Address.City;
					cell4.innerHTML = data.val().Address.State;
					cell5.innerHTML = data.val().Address['ZIP Code'];
					cell6.innerHTML = data.val().Address.Street;
					cell7.innerHTML = "<button class='btn btn-sm btn-danger mt-2 mb-2' onclick='EmployeeDeleteConfirmation(" + data.key + ")' >Delete</button>" +
						"<a class='btn btn-sm btn-info ml-2 mt-2 mb-2' href='editemployee/" + data.key + "' >Edit</a>";
					row.appendChild(cell1);
					row.appendChild(cell2);
					row.appendChild(cell3);
					row.appendChild(cell4);
					row.appendChild(cell5);
					row.appendChild(cell6);
					row.appendChild(cell7);
					tbody.appendChild(row);
				}

			});


		}
	});
}

function getCustomersFromFirebase() {

	var table = document.getElementById("customerTable"),
		tbody = table.getElementsByTagName("tbody")[0];
	tbody.innerHTML = '';
	const firebaseRef = firebase.database().ref().child('Customers');

	firebaseRef.once('value', function (snapshot) {

		if (snapshot.exists()) {
			var content = '';

			snapshot.forEach(function (data) {
				if (data.val().Email) {
					var row = document.createElement("tr");
					var cell1 = document.createElement("td");
					var cell2 = document.createElement("td");
					var cell3 = document.createElement("td");
					var cell4 = document.createElement("td");
					var cell5 = document.createElement("td");
					var cell6 = document.createElement("td");
					var cell7 = document.createElement("td");
					cell1.innerHTML = data.val()['First Name'] + " " + data.val()['Last Name'];
					cell2.innerHTML = data.val().Email
					cell3.innerHTML = data.val().Address.City;
					cell4.innerHTML = data.val().Address.State;
					cell5.innerHTML = data.val().Address['ZIP Code'];
					cell6.innerHTML = data.val().Address.Street;
					cell7.innerHTML = "<button class='btn btn-sm btn-danger mt-2 mb-2' onclick='CustomerDeleteConfirmation(" + data.key + ")' >Delete</button>" +
						"<a class='btn btn-sm btn-info ml-2 mt-2 mb-2' href='editcustomer/" + data.key + "' >Edit</a>";
					row.appendChild(cell1);
					row.appendChild(cell2);
					row.appendChild(cell3);
					row.appendChild(cell4);
					row.appendChild(cell5);
					row.appendChild(cell6);
					row.appendChild(cell7);
					tbody.appendChild(row);
				}

			});


		}
	});
}

async function getChatFromFirebase() {
	const firebaseRef = firebase.database().ref().child('Chat');
	let list = new Array();
	
	var json = "";
	await firebaseRef.once('value')
		.then(function (dataSnapshot) {
			//json = dataSnapshot.val();
			dataSnapshot.forEach(function (data) {

				list.push({ username: data.val().Email, body: data.val().Message, mine: false })
				

			});

		});
	return list;
}

function saveChatToFirebase(email, message) {

	const firebaseRef = firebase.database().ref();
	const refChildChat = firebaseRef.child("Chat");
	const newChat = refChildChat.push();
	newChat.child("Email").set(email);
	newChat.child("Message").set(message);

}


function getProjectsFromFirebaseByStatus(status) {

	var table = document.getElementById(status + "Table"),
		tbody = table.getElementsByTagName("tbody")[0];
	tbody.innerHTML = '';
	const firebaseRef = firebase.database().ref().child('Projects');

	firebaseRef.once('value', function (snapshot) {

		if (snapshot.exists()) {
			var content = '';

			snapshot.forEach(function (data) {
				if (data.val().Status == status && status == "Rejected") {
					var row = document.createElement("tr");
					var cell1 = document.createElement("td");
					var cell2 = document.createElement("td");
					var cell3 = document.createElement("td");
					var cell4 = document.createElement("td");
					var cell5 = document.createElement("td");
					var cell6 = document.createElement("td");
					var cell7 = document.createElement("td");
					var cell8 = document.createElement("td");
					var cell9 = document.createElement("td");
					cell1.innerHTML = data.val().Title;
					cell2.innerHTML = data.val().Status;
					cell3.innerHTML = data.val().Employees;
					cell4.innerHTML = data.val().Customer;
					cell5.innerHTML = data.val().Description;
					cell6.innerHTML = data.val().EstimateDueDate;
					cell7.innerHTML = data.val().InstallationDate;
					cell8.innerHTML = data.val().Deadline;
					cell9.innerHTML = "<button class='btn btn-sm btn-danger' onclick='ProjectDeleteConfirmation(" + data.key + ")' >Delete</button>" +
						"<a class='btn btn-sm btn-info ml-2 mb-2 mt-2' href='editproject/" + data.key + "' >Edit</a>" +
						"<a class='btn btn-sm btn-info ml-2 mb-2 mt-2' href='fileoverview/" + data.key + "' >Files</a>";
					row.appendChild(cell1);
					row.appendChild(cell2);
					row.appendChild(cell3);
					row.appendChild(cell4);
					row.appendChild(cell5);
					row.appendChild(cell6);
					row.appendChild(cell7);
					row.appendChild(cell8);
					row.appendChild(cell9);
					tbody.appendChild(row);
				} else if (data.val().Status == status) {
					var row = document.createElement("tr");
					var cell1 = document.createElement("td");
					var cell2 = document.createElement("td");
					var cell3 = document.createElement("td");
					var cell4 = document.createElement("td");
					var cell5 = document.createElement("td");
					var cell6 = document.createElement("td");
					var cell7 = document.createElement("td");
					var cell8 = document.createElement("td");
					var cell9 = document.createElement("td");
					cell1.innerHTML = data.val().Title;
					cell2.innerHTML = data.val().Status;
					cell3.innerHTML = data.val().Employees;
					cell4.innerHTML = data.val().Customer;
					cell5.innerHTML = data.val().Description;
					cell6.innerHTML = data.val().EstimateDueDate;
					cell7.innerHTML = data.val().InstallationDate;
					cell8.innerHTML = data.val().Deadline;
					cell9.innerHTML = "<button class='btn btn-sm btn-danger' onclick='ProjectDeleteConfirmation(" + data.key + ")' >Delete</button>" +
						"<a class='btn btn-sm btn-info ml-2 mb-2 mt-2' href='editproject/" + data.key + "' >Edit</a>" +
						"<a class='btn btn-sm btn-info ml-2 mb-2 mt-2 phaseBTN' onclick='ProjectNextPhaseConfirmation(" + data.key + ")' >Next Phase</a>" +
						"<a class='btn btn-sm btn-info ml-2 mb-2 mt-2' href='fileoverview/" + data.key + "' >Files</a>";
					row.appendChild(cell1);
					row.appendChild(cell2);
					row.appendChild(cell3);
					row.appendChild(cell4);
					row.appendChild(cell5);
					row.appendChild(cell6);
					row.appendChild(cell7);
					row.appendChild(cell8);
					row.appendChild(cell9);
					tbody.appendChild(row);
                }

			});


		}
	});

}



function getProjectsFromFirebaseByStatusCardSelect(status) {

	var table = document.getElementById(status + "Table"),
		tbody = table.getElementsByTagName("tbody")[0];
	tbody.innerHTML = '';
	const firebaseRef = firebase.database().ref().child('Projects');

	firebaseRef.once('value', function (snapshot) {

		if (snapshot.exists()) {
			var content = '';

			snapshot.forEach(function (data) {
				if (data.val().Status == status) {
					var row = document.createElement("tr");
					var cell1 = document.createElement("td");
					var cell2 = document.createElement("td");
					
					cell1.innerHTML = data.val().Title;
					cell2.innerHTML = data.val().Customer;
					
					row.appendChild(cell1);
					row.appendChild(cell2);
					tbody.appendChild(row);
				}

			});
		}
	});

}


function EmployeeDeleteConfirmation(id) {
	localStorage.setItem("employeeId", id);
	$('#deleteModal').modal('show');
}
function CustomerDeleteConfirmation(id) {
	localStorage.setItem("customerId", id);
	$('#deleteModal').modal('show');
}
function ProjectDeleteConfirmation(id) {
	localStorage.setItem("projectId", id);
	$('#deleteModal').modal('show');
}
function ProjectNextPhaseConfirmation(id) {
	localStorage.setItem("projectId", id);
	$('#nextPhaseModal').modal('show');
}

function ReportUpdateStatsConfirmation() {
	$('#updateStatsModal').modal('show');
}

function DeleteEmployee() {
	var id = parseInt(localStorage.getItem("employeeId"));
	const firebaseRef = firebase.database().ref();
	const refChildEmployees = firebaseRef.child("Employees");
	refChildEmployees.child(id).remove();
	getEmployeesFromFirebase();
	$('#deleteModal').modal('hide');
}

function DeleteCustomer() {
	var id = parseInt(localStorage.getItem("customerId"));
	const firebaseRef = firebase.database().ref();
	const refChildEmployees = firebaseRef.child("Customers");
	refChildEmployees.child(id).remove();
	getCustomersFromFirebase();
	$('#deleteModal').modal('hide');
}

function DeleteProject() {
	var id = parseInt(localStorage.getItem("projectId"));
	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");
	refChildProjects.child(id).remove();
	$('#deleteModal').modal('hide');
}

function moveProjectToPhase(phase) {
	var id = parseInt(localStorage.getItem("projectId"));
	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");
	const refProjectID = refChildProjects.child(id);
	
	refChildProjects.child(id).child("Status").set(phase);
	$('#nextPhaseModal').modal('hide');
}

function uploadCustomerToFirebase(cusID) {



	const firebaseRef = firebase.database().ref();
	const refChildCustomers = firebaseRef.child("Customers");
	const refCustomerID = refChildCustomers.child(cusID);

	var cusFirstName = document.getElementById("cusFirstName");
	var cusLastName = document.getElementById("cusLastName");
	var cusEmail = document.getElementById("cusEmail");
	var cusAddress = document.getElementById("cusAddress");
	var cusCity = document.getElementById("cusCity");
	var cusState = document.getElementById("cusState");
	var cusZIP = document.getElementById("cusZIP");

	var cFName = cusFirstName.value;
	var cLName = cusLastName.value;
	var cEmail = cusEmail.value;
	var cStreet = cusAddress.value;
	var cCity = cusCity.value;
	var cState = cusState.value;
	var cZIP = cusZIP.value;

	refCustomerID.child("First Name").set(cFName);
	refCustomerID.child("Last Name").set(cLName);
	refCustomerID.child("Email").set(cEmail);
	refCustomerID.child("Address").child("Street").set(cStreet);
	refCustomerID.child("Address").child("City").set(cCity);
	refCustomerID.child("Address").child("State").set(cState);
	refCustomerID.child("Address").child("ZIP Code").set(cZIP);
	window.location = "/customers";

}

function updateNextCustomerID(cusID) {

	const firebaseRef = firebase.database().ref();
	const refChildCustomers = firebaseRef.child("Customers");
	refChildCustomers.child("NextID").set(cusID);
}

function getNextCustomerID() {

	const firebaseRef = firebase.database().ref();
	const refChildCustomers = firebaseRef.child("Customers");

	var nextID = refChildCustomers.child("NextID").get();
	return nextID;
}

function getCustomerFromFirebaseById(cusID) {

	const firebaseRef = firebase.database().ref();
	const refChildEmployees = firebaseRef.child("Customers");
	const refEmployeeID = refChildEmployees.child(cusID);

	var cusFirstName = document.getElementById("cusFirstName");
	var cusLastName = document.getElementById("cusLastName");
	var cusEmail = document.getElementById("cusEmail");
	var cusAddress = document.getElementById("cusAddress");
	var cusCity = document.getElementById("cusCity");
	var cusState = document.getElementById("cusState");
	var cusZIP = document.getElementById("cusZIP");

	refEmployeeID.once("value")
		.then((snapshot) => {
			cusFirstName.value = snapshot.val()['First Name'];
			cusLastName.value = snapshot.val()['Last Name'];
			cusEmail.value = snapshot.val().Email;
			cusAddress.value = snapshot.val().Address.Street;
			cusCity.value = snapshot.val().Address.City;
			cusState.value = snapshot.val().Address.State;
			cusZIP.value = snapshot.val().Address['ZIP Code'];
		})
		.catch(error => ({
			errorCode: error.code,
			errorMessage: error.message
		}));
}

function getEmployeeFromFirebaseById(empID) {

	const firebaseRef = firebase.database().ref();
	const refChildEmployees = firebaseRef.child("Employees");
	const refEmployeeID = refChildEmployees.child(empID);

	var empFirstName = document.getElementById("empFirstName");
	var empLastName = document.getElementById("empLastName");
	var empEmail = document.getElementById("empEmail");
	var empAddress = document.getElementById("empAddress");
	var empCity = document.getElementById("empCity");
	var empState = document.getElementById("empState");
	var empZIP = document.getElementById("empZIP");

	refEmployeeID.once("value")
		.then((snapshot) => {
			empFirstName.value = snapshot.val()['First Name'];
			empLastName.value = snapshot.val()['Last Name'];
			empEmail.value = snapshot.val().Email;
			empAddress.value = snapshot.val().Address.Street;
			empCity.value = snapshot.val().Address.City;
			empState.value = snapshot.val().Address.State;
			empZIP.value = snapshot.val().Address['ZIP Code'];
		})
		.catch(error => ({
			errorCode: error.code,
			errorMessage: error.message
		}));
}

function uploadEmployeeToFirebase(empID) {

	console.log('doing something important')

	const firebaseRef = firebase.database().ref();
	const refChildEmployees = firebaseRef.child("Employees");
	const refEmployeeID = refChildEmployees.child(empID);

	var empFirstName = document.getElementById("empFirstName");
	var empLastName = document.getElementById("empLastName");
	var empEmail = document.getElementById("empEmail");
	var empAddress = document.getElementById("empAddress");
	var empCity = document.getElementById("empCity");
	var empState = document.getElementById("empState");
	var empZIP = document.getElementById("empZIP");

	var cFName = empFirstName.value;
	var cLName = empLastName.value;
	var cEmail = empEmail.value;
	var cStreet = empAddress.value;
	var cCity = empCity.value;
	var cState = empState.value;
	var cZIP = empZIP.value;

	refEmployeeID.child("First Name").set(cFName);
	refEmployeeID.child("Last Name").set(cLName);
	refEmployeeID.child("Email").set(cEmail);
	refEmployeeID.child("Address").child("Street").set(cStreet);
	refEmployeeID.child("Address").child("City").set(cCity);
	refEmployeeID.child("Address").child("State").set(cState);
	refEmployeeID.child("Address").child("ZIP Code").set(cZIP);
	window.location = "/employees";
}

function updateNextEmployeeID(empID) {

	const firebaseRef = firebase.database().ref();
	const refChildEmployees = firebaseRef.child("Employees");
	refChildEmployees.child("NextID").set(empID);
}

function getNextEmployeeID() {

	const firebaseRef = firebase.database().ref();
	const refChildEmployees = firebaseRef.child("Employees");

	var nextID = refChildEmployees.child("NextID").get();
	return nextID;
}

function populateEmployeeDropdown() {
	const firebaseRef = firebase.database().ref();
	const refChildEmployees = firebaseRef.child("Employees");

	var menu = document.getElementById("projectEmployees");

	firebaseRef.once('value', function (snapshot) {

		if (snapshot.exists()) {
			var content = '';
			console.log("test");
			snapshot.forEach(function (data) {
				if (data.val().Email != "") {
					var option = document.createElement("option");
					option.textContent = data.val()['First Name'] + " " + data.val()['Last Name'];
					option.value = data.val()['First Name'] + " " + data.val()['Last Name'];
					menu.appendChild(option);
				}

			});


		}
	});
}

function getProjectFromFirebaseById(proID) {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");
	const refProjectID = refChildProjects.child(proID);

	var proTitle = document.getElementById("projectTitle");
	var proCustomer = document.getElementById("projectCustomer");
	var proEmployees = document.getElementById("projectEmployees");
	var proStatus = document.getElementById("projectStatus");
	var proDescription = document.getElementById("projectDescription");
	var proEstimateDueDate = document.getElementById("estimateDueDate");
	var proInstallationDate = document.getElementById("installationDate");
	var proDeadline = document.getElementById("projectDeadline");

	refProjectID.once("value")
		.then((snapshot) => {
			proTitle.value = snapshot.val().Title;
			proCustomer.value = snapshot.val().Customer;
			proEmployees.value = snapshot.val().Employees;
			proStatus.value = snapshot.val().Status;
			proDescription.value = snapshot.val().Description;
			proEstimateDueDate.value = snapshot.val().EstimateDueDate;
			proInstallationDate.value = snapshot.val().InstallationDate;
			proDeadline.value = snapshot.val().Deadline;
		})
		.catch(error => ({
			errorCode: error.code,
			errorMessage: error.message
		}));
}

function uploadProjectToFirebase(proID) {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");
	const refProjectID = refChildProjects.child(proID);

	var proTitle = document.getElementById("projectTitle");
	var proCustomer = document.getElementById("projectCustomer");
	var proEmployees = document.getElementById("projectEmployees");
	var proStatus = document.getElementById("projectStatus");
	var proDescription = document.getElementById("projectDescription");
	var proEstimateDueDate = document.getElementById("estimateDueDate");
	var proInstallationDate = document.getElementById("installationDate");
	var proDeadline = document.getElementById("projectDeadline");

	var pTitle = proTitle.value;
	var pCustomer = proCustomer.value;
	var pEmployees = proEmployees.value;
	var pStatus = proStatus.value;
	var pDescription = proDescription.value;
	var pEstimateDueDate = proEstimateDueDate.value;
	var pInstallationDate = proInstallationDate.value;
	var pDeadline = proDeadline.value;

	
	refProjectID.child("Title").set(pTitle);
	refProjectID.child("Customer").set(pCustomer);
	refProjectID.child("Employees").set(pEmployees);
	refProjectID.child("Status").set(pStatus);
	refProjectID.child("Description").set(pDescription);
	refProjectID.child("EstimateDueDate").set(pEstimateDueDate);
	refProjectID.child("InstallationDate").set(pInstallationDate);
	refProjectID.child("Deadline").set(pDeadline);

	window.location.href = "/Projects";

}



function updateNextProjectID(empID) {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");
	refChildProjects.child("NextID").set(empID);
}

function getNextProjectID() {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	var nextID = refChildProjects.child("NextID").get();
	return nextID;
}


function signup() {

	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var cPassword = document.getElementById("cPassword");
	var message = document.getElementById("message");
	if (cPassword.value != password.value) {
		message.innerHTML = "Password does not match";
		return;
	}
	firebase.auth().createUserWithEmailAndPassword(username.value, password.value)
		.then((userCredential) => {
			// Signed in 
			var user = userCredential.user;
			console.log("user created")
			
			message.innerHTML = "Account created you can login now!";
			// ...
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			message.innerHTML = error.message;
			console.log(error);
		});
}

function login() {
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var message = document.getElementById("message");
	firebase.auth().signInWithEmailAndPassword(username.value, password.value)
		.then((userCredential) => {
			// Signed in
			var user = userCredential.user;
			localStorage.setItem("user", username.value);
			window.location.href = "/";
		
			// 1. Save user to session
			// SO gthat the user stays logged in between pages.
			// 2. Redirect user to the dashboard
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			message.innerHTML = "Invalid email or password";
			console.log(error.code);
		});
}

function getNumberOfOnTimeProjects() {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	var onTime = refChildProjects.child("OnTime").get();
	return onTime;
}

function getNumberOfDelayedProjects() {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	var delayed = refChildProjects.child("Delayed").get();
	return delayed;
}

function getNumberOfRejectedProjects() {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	var rejected = refChildProjects.child("Rejected").get();
	return rejected;
}

function getNumberOfAcceptedProjects() {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	var accepted = refChildProjects.child("Accepted").get();
	return accepted;
}

function setNumberOfOnTimeProjects(num) {
	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	refChildProjects.child("OnTime").set(num);
}

function setNumberOfDelayedProjects(num) {
	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	refChildProjects.child("Delayed").set(num);
}

function setNumberOfRejectedProjects(num) {
	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	refChildProjects.child("Rejected").set(num);
}

function setNumberOfAcceptedProjects(num) {
	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");

	refChildProjects.child("Accepted").set(num);
}

function updateReportStats() {

	const firebaseRef = firebase.database().ref();
	const refChildProjects = firebaseRef.child("Projects");


	var repRejected = document.getElementById("reportsRejected");
	var repAccepted = document.getElementById("reportsAccepted");
	var repDelayed = document.getElementById("reportsDelayed");
	var repOnTime = document.getElementById("reportsOnTime");

	var rRejected = repRejected.value;
	var rAccepted = repAccepted.value;
	var rDelayed = repDelayed.value;
	var rOnTime = repOnTime.value;

	refChildProjects.child("Rejected").set(rRejected);
	refChildProjects.child("Accepted").set(rAccepted);
	refChildProjects.child("Delayed").set(rDelayed);
	refChildProjects.child("OnTime").set(rOnTime);

	$('#updateStatsModal').modal('hide');
}

function getDate() {
	n = new Date();
	y = n.getFullYear();
	m = n.getMonth() + 1;
	d = n.getDate();
	document.getElementById("estimateDueDate").value = y + "-" + m + "-" + d;
	document.getElementById("installationDate").value = y + "-" + m + "-" + d;
	document.getElementById("projectDeadline").value = y + "-" + m + "-" + d;
}