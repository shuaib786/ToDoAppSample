/**
 * Created by shuaib .
 */

var TodoController = function($scope, $http){

    $scope.editMode = false;
    $scope.position = '';

    $scope.getAllTodos = function(){
        $scope.resetError();
        $http.get('/api/todos/').success(function(response){
            $scope.todos = response;
        }).error(function() {
            $scope.setError('Could not display all todos');
        });
    }
    $scope.getAllTodosCompleted = function(){
        $scope.resetError();
        $http.get('/api/todos/completed').success(function(response){
            $scope.todosCompleted = response;
        }).error(function() {
            $scope.setError('Could not display all todos');
        });
    }

    $scope.addTodo = function(newTodo){
    	var Todo = {
    			title : newTodo
		};
    	$http({
    	    method : "POST",
    	    url : "/api/todos/",
    	    data : angular.toJson(Todo)
    	})
        .success(function(response){
            $scope.getAllTodos();
            $scope.getAllTodosCompleted();
        }).error(function() {
            $scope.setError('Could add todo');
        });
        $scope.todoName = '';
    }

    $scope.deleteTodo = function(deleteTodoId){
        $scope.resetError();
        $http.delete('/api/todos/'+deleteTodoId).success(function(response){
            $scope.getAllTodos();
            $scope.getAllTodosCompleted();
        }).error(function() {
            $scope.setError('Could not delete todo');
        });
    }

    $scope.editTodo = function(id, todo){
        $scope.resetError();
        $scope.todoName = todo.title;
        $scope.id = id;
        $scope.completed = todo.completed;
        $scope.editMode = true;
    }
    
    $scope.checkTodo = function(todo){
        $scope.resetError();
        $scope.id = todo.id;
        $scope.completed = todo.completed;
        $scope.updateTodo(todo.title);
    }

    $scope.updateTodo = function(updateTodo){
        $scope.resetError();
        var Todo = {
        		id : $scope.id,
    			title : updateTodo,
    			completed :$scope.completed
		};
        $http({
            method : "PUT",
            url : "/api/todos/",
            data : angular.toJson(Todo)
        })
        .success(function(response){
            $scope.getAllTodos();
            $scope.getAllTodosCompleted();
            $scope.id = '';
            $scope.todoName = '';
            $scope.editMode = false;
        }).error(function(){
            $scope.setError('Could not update todo');
         })
    }

    $scope.resetTodoField = function() {
        $scope.resetError();
        $scope.todoName = '';
        $scope.editMode = false;
    };

    $scope.resetError = function() {
        $scope.error = false;
        $scope.errorMessage = '';
    };

    $scope.setError = function(message) {
        $scope.error = true;
        $scope.errorMessage = message;
    };

    $scope.getAllTodos();
    $scope.getAllTodosCompleted();
}