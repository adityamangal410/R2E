angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
            console.log($scope.loginData.username);
            console.log($scope.loginData.password);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('placesExplorerController', function ($scope, placesExplorerService, $filter) {
 
    $scope.exploreNearby = "New York";
    $scope.exploreQuery = "";
    $scope.filterValue = "";
 
    $scope.places = [];
    $scope.filteredPlaces = [];
    $scope.filteredPlacesCount = 0;
 
    //paging
    $scope.totalRecordsCount = 0;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
 
    init();
 
    function init() {
 
        createWatche();
        getPlaces();
    }
 
    function getPlaces() {
 
        var offset = ($scope.pageSize) * ($scope.currentPage - 1);
 
        placesExplorerService.get({ near: $scope.exploreNearby, query: $scope.exploreQuery, limit: $scope.pageSize, offset: offset }, function (placesResult) {
 
            if (placesResult.response.groups) {
                $scope.places = placesResult.response.groups[0].items;
                $scope.totalRecordsCount = placesResult.response.totalResults;
                filterPlaces('');
            }
            else {
                $scope.places = [];
                $scope.totalRecordsCount = 0;
            }
        });
    };
 
    function filterPlaces(filterInput) {
        $scope.filteredPlaces = $filter("placeNameCategoryFilter")($scope.places, filterInput);
        $scope.filteredPlacesCount = $scope.filteredPlaces.length;
    }
 
    function createWatche() {
 
        $scope.$watch("filterValue", function (filterInput) {
            filterPlaces(filterInput);
        });
    }
 
    $scope.doSearch = function () {
 
        $scope.currentPage = 1;
        getPlaces();
    };
 
    $scope.pageChanged = function (page) {
 
        $scope.currentPage = page;
        getPlaces();
    };
 
    $scope.buildCategoryIcon = function (icon) {
 
        return icon.prefix + '44' + icon.suffix;
    };
 
    $scope.buildVenueThumbnail = function (photo) {
 
        return photo.items[0].prefix + '128x128' + photo.items[0].suffix;
    };
});
