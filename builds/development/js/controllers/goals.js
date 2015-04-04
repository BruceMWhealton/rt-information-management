myApp.controller('GoalsController', function($scope, $rootScope, $firebase, FIREBASE_URL) {
	
	var ref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/goals');

	var goalsInfo = $firebase(ref);
	var goalsObj = goalsInfo.$asObject();
	var goalsArray = goalsInfo.$asArray();

	goalsObj.$loaded().then(function(data) {
		$scope.goals = data;
	}); // make sure meeting data is loaded

	$scope.addGoal = function() {
		goalsInfo.$push({
			name: $scope.goalname,
			date: Firebase.ServerValue.TIMESTAMP
		}).then(function() {
			$scope.goalname = '';
		});
	}; // addgoal

	$scope.deleteGoal = function(key) {
		goalsInfo.$remove(key);
	}; // deleteGoal

});  //GoalsController