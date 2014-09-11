module.exports = function(app, Todo) {
  // routes


  // api ----------------------------
    app.get('/api/todos', function(req, res) {

      // Use mongoose to get all the todos in the database
      Todo.find(function(err, todos) {

        // if there's an error then send the error
        if(err)
          res.send(err)

        res.json(todos); // return all todos in a JSON object
      });
    });

    // create a todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

      // create a todo, information comes from AJAX request from angular
      Todo.create({
        text : req.body.text,
        done : false
      }, function(err, todo) {
        if(err)
          res.send(err)

        // get and find all the todos after you create one
        Todo.find(function(err, todos) {
          if(err)
            res.send(err)
          res.json(todos);
        });
      });
    });

    // delete a todo and send back all of the todos after deletion
    app.delete('/api/todos/:todo_id', function(req, res) {
      Todo.remove({
        _id : req.params.todo_id
      }, function(err, todo) {
        if(err)
          res.send(err)

        // get and find all the todos after a delete
        Todo.find(function(err, todos) {
          if(err)
            res.send(err)
          res.json(todos);
        });
      });
    });
  
  //================
  // THIS IS FANCY
  //================

    app.get('*', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front end)
    });
}