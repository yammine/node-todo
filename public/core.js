var nodeTodo = angular.module('nodeTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all the Todos and show them
  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
      console.log(data)
    })
    .error(function(data) {
      console.log('Error ' + data);
    });

  // when submitting the add form, send the text to the node api
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form 
        $scope.todos    = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error ' + data);
      });
  };

  // delete a todo after checking the checkbox
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error ' + data);
      });
  };
}