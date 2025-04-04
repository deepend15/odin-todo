export function projectDialogController() {
    const addAndRemoveProjectDiv = document.querySelector(".add-remove-project-buttons-wrapper");
    const addProjectBtn = addAndRemoveProjectDiv.firstElementChild;
    const removeProjectBtn = addAndRemoveProjectDiv.lastElementChild;
    const addProjectDialog = document.querySelector("#add-project-dialog");

    function activateAddProjectBtn() {
        addProjectBtn.addEventListener("click", () => {
            addProjectDialog.showModal();
        })
    };

    return { activateAddProjectBtn }
}