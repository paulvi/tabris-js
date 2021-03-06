/*
 * Adapted from the original Todo example: http://documentcloud.github.io/backbone/docs/todos.html
 */

/* global todo: true */
/* jshint nonew: false */

(function() {

  tabris.load(function() {
    new todo.TodoListView({model: createModel()});
  });

  var createModel = function() {
    var todos = new todo.TodoList();
    todos.fetch();
    return todos;
  };

}());
