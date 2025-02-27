export const projects = (function () {
    const myProjects = [];

    const getAllProjects = () => myProjects;

    function createProject(title) {
        return { title }
    };
    
    function addProject(title) {
        let newProject = createProject(title);
        myProjects.push(newProject);
    };

    return { getAllProjects, addProject };
})();