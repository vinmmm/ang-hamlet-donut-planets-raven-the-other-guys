var app = angular.module("RavensApp", []);

RavensApp.controller('MainCtrl', function($scope, $http){
   $http.get('colors.json').success(function(data){
    $scope.colors = data;
  }).error(function(err){
    throw err;
  });
  // using success/error callback style
  $http.get('resources/json/donut-data.json').success(function(data){
    $scope.donutData1 = data;
  }).error(function(err){
    throw err;
  });
  // using `then()` callback style
  $http.get('resources/json/donut-data-2.json').then(function(response){
    $scope.donutData2 = response.data;
  }, function(err){
    throw err;
  });
});

RavensApp.directive('donutChart', function(){
  function link(scope, el, attr){
    var color = d3.scale.category10();
    var width = 200;
    var height = 200;
    var min = Math.min(width, height);
    var svg = d3.select(el[0]).append('svg');
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
      .outerRadius(min / 2 * 0.9)
      .innerRadius(min / 2 * 0.5);

    svg.attr({width: width, height: height});

    // center the donut chart
    var g = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    // add the <path>s for each arc slice
    var arcs = g.selectAll('path');

    scope.$watch('data', function(data){
      if(!data){ return; }
      arcs = arcs.data(pie(data));
      arcs.exit().remove();
      arcs.enter().append('path')
        .style('stroke', 'white')
        .attr('fill', function(d, i){ return color(i) });
      // update all the arcs (not just the ones that might have been added)
      arcs.attr('d', arc);
    }, true);
  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
});