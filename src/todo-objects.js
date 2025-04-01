export const todos = (function () {
    const myTodos = [];

    const getAllTodos = () => myTodos;
    
    function createTodo(title, description, dueDate, priority, project, isComplete, todoID) {
        return { title, description, dueDate, priority, project, isComplete, todoID }
    };

    function addTodo(title, description, dueDate, priority, project, isComplete, todoID) 
        {
            let newTodo = createTodo(title, description, dueDate, priority, project, isComplete, todoID);
            myTodos.push(newTodo);
        };

    return { getAllTodos, addTodo };
})();