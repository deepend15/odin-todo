export const todos = (function () {
    const myTodos = [];

    const getAllTodos = () => myTodos;
    
    function createTodo(title, description, dueDate, priority, project, isComplete ) {
        return { title, description, dueDate, priority, project, isComplete }
    };

    function addTodo(title, description, dueDate, priority, project, isComplete) 
        {
            let newTodo = createTodo(title, description, dueDate, priority, project, isComplete);
            myTodos.push(newTodo);
        };

    return { getAllTodos, addTodo };
})();