export const todos = (function () {
    const myTodos = [];

    const getAllTodos = () => myTodos;
    
    function createTodo(title, description, dueDate, priority, project) {
        return { title, description, dueDate, priority, project }
    };

    function addTodo(title, description, dueDate, priority, project) 
        {
            let newTodo = createTodo(title, description, dueDate, priority, project);
            myTodos.push(newTodo);
        };

    return { getAllTodos, addTodo };
})();