var todoList = {
    todos: [],

    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    toggleCompleted: function(position){
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function(){
        var allTrue = true;
        for(let todo of this.todos){
            if(todo.completed === false){
                allTrue = false;
                break;
            }
        }

        var completed;
        if (allTrue === true){
            completed = false;
        } else {
            completed = true;
        }
        for(let todo of this.todos){
            todo.completed = completed;
        }
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
    toggleTodo: function(){
        var button = document.createElement('button');
        button.textContent = 'Toggle Completed'
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
        for(let todo of todoList.todos){
            let todoLi = document.createElement('li');
            let completeSign = '[ ]';
            if(todo.completed === true) {
                completeSign = '[x]';
            }
            todoLi.textContent = completeSign + ' ' + todo.todoText;
            todosUl.appendChild(todoLi);
        }
    }

};
