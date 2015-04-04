myApp.controller('ContactsController', function($scope, $rootScope, $location, $firebase, FIREBASE_URL) {
	
	var ref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/contacts');

	var contactsInfo = $firebase(ref);
	var contactsObj = contactsInfo.$asObject();
	var contactsArray = contactsInfo.$asArray();
	$scope.firstname = '';
	$scope.lastname = '';
	$scope.company = '';
	$scope.email = '';
	$scope.streetAddress = '';
	$scope.city = '';
	$scope.state = '';
	$scope.zipcode = '';
	$scope.phoneNumbers = '';
	$scope.category = '';
	$scope.notes = '';
	$scope.query = '';
	$scope.direction = null;
	$scope.order = "lastname";

	contactsObj.$loaded().then(function(data) {
		$scope.contacts = data;
	}); // make sure meeting data is loaded

	$scope.addContact = function() {
		contactsInfo.$push({
			firstname: $scope.firstname,
			lastname: $scope.lastname,
			email: $scope.email,
			streetAddress: $scope.streetAddress,
			city: $scope.city,
			state: $scope.state,
			zipcode: $scope.zipcode,
			company: $scope.company,
			phoneNumbers: $scope.phoneNumbers,
			category: $scope.category,
			notes: $scope.notes,
			dateAdded: Firebase.ServerValue.TIMESTAMP,
			dateEdited: Firebase.ServerValue.TIMESTAMP
		}).then(function(currentUser) {
			$scope.firstname = '';
			$scope.lastname = '';
			$scope.company = '';
			$scope.email = '';
			$scope.streetAddress = '';
			$scope.city = '';
			$scope.state = '';
			$scope.zipcode = '';
			$scope.phoneNumbers = '';
			$scope.category = '';
			$scope.notes = '';
			$location.path('/contactslist');
		});
	}; // addcontact

	$scope.deleteContact = function(contact.$id) {
		contactsInfo.$remove(contact.$id);
	}; // deleteMeeting
	
	$scope.editContact = function(key) {
		contactsInfo.$update({
			firstname: $scope.firstname,
			lastname: $scope.lastname,
			company: $scope.company,
			email: $scope.email,
			streetAddress: $scope.streetAddress,
			city: $scope.city,
			state: $scope.state,
			zipcode: $scope.zipcode,
			phoneNumbers: $scope.phoneNumbers,
			category: $scope.category,
			notes: $scope.notes,
			dateEdited: Firebase.ServerValue.TIMESTAMP
		}).then(function(currentUser) {
			$scope.firstname = '';
			$scope.lastname = '';
			$scope.company = '';
			$scope.email = '';
			$scope.streetAddress = '';
			$scope.city = '';
			$scope.state = '';
			$scope.zipcode = '';
			$scope.phoneNumbers = '';
			$scope.category = '';
			$scope.notes = '';
			$location.path('/contactslist');
		});
	}; // Edit Contact

});  //ContactsController