function todoItem(text, completed) {
    this.todoText= text;
    this.completed= completed;
}

var todoList = {
    todos: [],
    addTodo: function(todoText){
        this.todos.push(new todoItem(todoText, false));
    },
    toggleCompleted: function(position){
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function(){
        var allCompleted = this.todos.every(function(todo){
            return todo.completed;
        });
        this.todos.forEach(function(todo){
            todo.completed = !allCompleted;
        })
    },
    deleteTodo: function(position){
        this.todos.splice(position, 1);
    },
    changeTodoText: function(position, newTodoText){
        this.todos[position].todoText = newTodoText;
    }
};

var handlers = { // methods in this object are handling different events
    toggleAll: function(){
        todoList.toggleAll();
        view.displayTodos();
    },
    toggleTodo: function(id){
        todoList.toggleCompleted(id);
        view.displayTodos();
    },
    deleteTodo: function(id){
        todoList.deleteTodo(id);
        view.displayTodos();
    },
    addTodo: function(){
        var text_elem = document.getElementById('addTodoTextInput');
        var text = text_elem.value
        text_elem.value = ''; // clear input form
        todoList.addTodo(text);
        view.displayTodos();
    }
};


var view = { // methods in this object are responsible for what user sees, object itself does not contain logic
    displayTodos: function(){
        var todosUl = document.getElementById('todoList');
        todosUl.innerHTML = ''; // clears list before adding all list items

        todoList.todos.forEach(function(todo, position){
            let completeSign = (todo.completed === true) ? '[x]' : '[ ]';

            let todoLi = document.createElement('li');
            todoLi.textContent = completeSign + ' ' + todo.todoText;
            todoLi.id = position;
            todoLi.appendChild(this.createButton('delete'));
            todoLi.appendChild(this.createButton('toggle'));
            todosUl.appendChild(todoLi);
        }, this)
    },
    createButton: function(name){
        var button = document.createElement('button');
        button.textContent = name;
        button.className = name + 'Button';
        return button;
    },
    setupEventListener: function(){
        var todosUl = document.getElementById('todoList');
        todosUl.addEventListener('click', function(event){
            var elementClicked = event.target; // the real element that was clicked on
            //check if element clicked is a proper button
            if (elementClicked.className === 'deleteButton'){
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
            if (elementClicked.className === 'toggleButton'){
                handlers.toggleTodo(parseInt(elementClicked.parentNode.id));
            }
        })
    }
};

view.setupEventListener()
