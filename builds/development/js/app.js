var myApp = angular.module('myApp', ['ngRoute', 'appControllers', 'firebase'])
	.constant('FIREBASE_URL', 'https://goals-and-projects.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, next, previous, error) {
		if (error === 'AUTH_REQUIRED') {
			$rootScope.message = 'Sorry, you must log in to access that page.';
			$location.path('/login');
		}
	});
}]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/goals', {
			templateUrl: 'views/goals.html',
			controller: 'GoalsController'
		}).
		when('/contactslist', {
			templateUrl: 'views/contactslist.html',
			controller: 'ContactsController',
			resolve : {
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			}
		}).
		when('/editcontact/:uid', {
			templateUrl: 'views/editcontact.html',
			controller: 'ContactsController',
			resolve : {
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			}
		}).
		when('/addcontact', {
			templateUrl: 'views/addcontact.html',
			controller: 'ContactsController',
			resolve : {
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			}
		}).
		otherwise({
			redirectTo: '/login'
		});
}]);