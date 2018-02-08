var app = angular.module("myApp", ["moment-picker"]);
// Set start view of moment-picker to month (default: year)
app.config(['momentPickerProvider', function (momentPickerProvider) {
  momentPickerProvider.options({
    startView: "month"});
}]);
app.controller("formCtrl", function($scope, $http) {
  /*
    ctrl.datepicker: initialize from date as 2018-01-22
    ctrl.datepicker2: initialize end date as 2018-01-28
  */
  $scope.ctrl.datepicker = "2018-01-22";
  $scope.ctrl.datepicker2 = "2018-01-28";
  // Function "fetch" for fetching data from the API provided.
  $scope.fetch = function() {
    var datePicker1 = $scope.ctrl.datepicker;
    var datePicker2 = $scope.ctrl.datepicker2;
    $scope.orderByNone = false;
    $scope.orderByName = false;
    $scope.orderByStartTime = false;
    $scope.workoutDetails = 0;
    $http({
      method: "GET",
      url:
        "<YOUR URL>?<PARAMETER1>=" + datePicker1 + "&<PARAMETER2>=" + datePicker2
    }).then(
      function mySuccess(response) {
        var obj = response.data["workouts"];
        $scope.workoutNumber = "Number of workouts: " + obj.length;
        var workoutDetails = [];
        for (var i = 0; i < obj.length; i++) {
          workoutDetails.push({
            type: obj[i].workoutType.name,
            startTime: obj[i].startTime
          });
        }
        $scope.workoutDetails = workoutDetails;
        $scope.orderByNone = true;
      },
      function myError(response) {
        $scope.myWelcome = response.statusText;
      }
    );
  };
  // Function "sort" controls which ordering result should be shown.
  $scope.sort = function(byAttribute) {
    var workoutDetails = $scope.workoutDetails;
    if (byAttribute == "onTime") {
      $scope.orderByNone = false;
      $scope.orderByName = false;
      $scope.orderByStartTime = true;
    } else if (byAttribute == "onName") {
      $scope.orderByNone = false;
      $scope.orderByName = true;
      $scope.orderByStartTime = false;
    }
  };
});
