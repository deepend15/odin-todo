export const todos = (function () {
    const myTodos = [];

    const getAllTodos = () => myTodos;
    
    function createTodo(title, description, dueDate, priority, project, isComplete, projectID) {
        return { title, description, dueDate, priority, project, isComplete, projectID }
    };

    function addTodo(title, description, dueDate, priority, project, isComplete, projectID) 
        {
            let newTodo = createTodo(title, description, dueDate, priority, project, isComplete, projectID);
            myTodos.push(newTodo);
        };

    return { getAllTodos, addTodo };
})();