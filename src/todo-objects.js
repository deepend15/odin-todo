export const todos = (function () {
    function createTodo(title, description, dueDate, priority, project) {
        return { title, description, dueDate, priority, project }
    };

    const myTodos = [];

    const getTodos = () => myTodos;

    function addTodo(title, description, dueDate, priority, project) 
        {
            let newTodo = createTodo(title, description, dueDate, priority, project);
            myTodos.push(newTodo);
        };

    return { getTodos, addTodo };
})();