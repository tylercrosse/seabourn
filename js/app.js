angular.module('cityRoads', [
  'cityRoads.controllers.MainController',
  'cityRoads.services.StopLightService',
  'cityRoads.directives.stopLightDirective',
  'cityRoads.directives.stopLightSwitchDirective'
])
  .run(function(){});

angular.module('cityRoads.controllers.MainController', [])
  .controller('MainController', ['$scope', '$interval', 'StopLightService', function($scope, $interval, StopLightService){
  $scope.test = "Hello World! Put your HTML here.";
  $interval(StopLightService.toggle, 5000)
}]);

angular.module('cityRoads.services.StopLightService', [])
  .service('StopLightService', ['$rootScope', function($rootScope){
    //- should hold value that indicates the direction of traffic. North/South and East/West
    //- create a function that will toggle the value.

    this.direction = 'northSouth';
    this.toggle = toggle;
    
    function toggle() {
      if (this.direction === 'northSouth') {
        setter('eastWest');
      } else {
        setter('northSouth');
      }
    };
    function setter(data) {
      this.direction = data;
      $rootScope.$broadcast('light:changed', this.direction)
    }
  }]);

angular.module('cityRoads.directives.stopLightDirective', [])
  .directive('stopLightDirective', ['StopLightService', function(StopLightService){
    //- should change colors based on stopLightService.
    //- use an attribute to determine which direction the stop light will use.
    var directive = {
      templateUrl: 'stopLight.html',
      link: link
    }
    return directive
    
    function link(scope) {
      scope.direction = StopLightService.direction;
      scope.$on('light:changed', function(event, data) {
        scope.direction = data;
      })
    }
  }]);

angular.module('cityRoads.directives.stopLightSwitchDirective', [])
  .directive('stopLightSwitchDirective', ['StopLightService',
  function(StopLightService){
    // - should contain button that will toggle stopLightService.
    var directive = {
      template: '<button ng-click="toggle()">StopLight Switch </button>',
      replace: true,
      link: link
    }
    return directive;
    
    function link(scope) {
      scope.toggle = StopLightService.toggle;
    }
  }]);