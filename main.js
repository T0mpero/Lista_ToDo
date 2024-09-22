const formEditTask = document.getElementById("edit-task-form");
const formAddTask = document.getElementById("add-task-form");
const tableShowTasks = document.getElementById('show-tasks');
const menuBar = document.querySelector(".menu-bar");

let allNameTasks = [];

formEditTask.classList.add('hidden');
formAddTask.classList.add('hidden');

function createDivTask(title, desc){
    const div = document.createElement("div");
    div.classList.add('task-div');

    const titleTask = document.createElement('h4');
    titleTask.classList.add('title-task');
    titleTask.textContent = title.toUpperCase();
    
    const descTask = document.createElement('p');
    descTask.classList.add('desc-title');
    descTask.textContent = desc;

    const doneBtn = document.createElement('button');
    const iconDoneBtn = document.createElement("i");
    doneBtn.classList.add('done-task');
    iconDoneBtn.classList.add("bi-check-circle-fill");
    doneBtn.appendChild(iconDoneBtn);

    const editBtn = document.createElement('button');
    const iconEditBtn = document.createElement("i");
    editBtn.classList.add('edit-task');
    iconEditBtn.classList.add("bi-pencil-square");
    editBtn.appendChild(iconEditBtn);

    const deleteBtn = document.createElement('button');
    const iconDeleteBtn = document.createElement("i");
    deleteBtn.classList.add('delete-task');
    iconDeleteBtn.classList.add("bi-trash-fill");
    deleteBtn.appendChild(iconDeleteBtn);

    div.appendChild(titleTask);
    div.appendChild(descTask);
    div.appendChild(doneBtn);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    return div
};

const showAllTasks = () =>{
    let name;
    for (let i = 0; i < localStorage.length; i++)
    {
        name = localStorage.key(i);
        tableShowTasks.appendChild(createDivTask(name, localStorage.getItem(name)));
        allNameTasks.push(name);
    }
};

const editTaskDiv = (title, desc) =>{

    formEditTask.classList.remove('hidden');
    tableShowTasks.classList.add('hidden');
    menuBar.classList.add('hidden');
  
    document.getElementById("last-title").innerHTML = title;
    document.getElementById("title-edit-task").value = title;    
    document.getElementById("desc-edit-task").value = desc;    
};

const saveEditedTask = () =>{

    let newTitle, newDesc;
    const lastTitle = document.getElementById("last-title").innerHTML;

    localStorage.removeItem(lastTitle);

    newTitle = document.getElementById("title-edit-task").value;    
    newDesc = document.getElementById("desc-edit-task").value;    

    localStorage.setItem(newTitle, newDesc);

}

const createTaskDiv = () =>{
    formAddTask.classList.remove('hidden');
    tableShowTasks.classList.add('hidden');
    menuBar.classList.add('hidden');
};

formAddTask.addEventListener("submit", () =>{
    const title = document.getElementById("title-add-task").value.toUpperCase();
    const desc = document.getElementById("desc-add-task").value;

    if (title == ""|| desc == ""){
        alert("Digite um título e uma descrição");
    }else {
        localStorage.setItem(title,desc);
        createDivTask(title, desc);
        showAllTasks();
    }

    title = " ";
    desc = " ";
});

document.addEventListener("click", (item) => {
    
    const targetElement = item.target;
    const buttonElement = targetElement.closest("button");
    const parentElement = targetElement.closest('div');
    let titleTask, descTask;

    if (buttonElement) {
        if (parentElement && parentElement.querySelector("h4") && parentElement.querySelector('p')) {
            titleTask = parentElement.querySelector("h4").textContent;
            descTask = parentElement.querySelector('p').textContent;
        } else if (parentElement && buttonElement.classList.contains("add-task-btn")) {
            createTaskDiv();
        }
    }
    
    if (parentElement && targetElement.classList.contains("done-task")) {parentElement.classList.toggle("done");}
    else if (buttonElement && buttonElement.classList.contains("edit-task")){editTaskDiv(titleTask, descTask);}
    else if (buttonElement && buttonElement.classList.contains("delete-task")) {
        parentElement.remove();
        localStorage.removeItem(titleTask);
    }

});

document.getElementById("add-task-cancel").addEventListener("click",  () =>{
    formAddTask.classList.add('hidden');
    tableShowTasks.classList.remove('hidden');
    menuBar.classList.remove('hidden');
});

formEditTask.addEventListener('submit', (value)=>{
    if(value.submitter.id == "edit-task-cancel"){
        formEditTask.classList.add('hidden');
        tableShowTasks.classList.remove('hidden');
        menuBar.classList.remove('hidden');
    }
    else if(value.submitter.id == "save-edit-btn"){
        saveEditedTask()
        
    }
})

document.querySelector("#search-bar").addEventListener('input', ()=>{
    tableShowTasks.textContent = " ";
    let searchValue = document.querySelector("#search-bar").value.toUpperCase();
    let filteredTasks = allNameTasks.filter(task => task.includes(searchValue)); 

    if (filteredTasks.length > 0) {
        filteredTasks.forEach(task => {
            console.log(filteredTasks)
            let desc = localStorage.getItem(task) || "Sem descrição"; 
            let newDiv = createDivTask(task, desc);  
            tableShowTasks.appendChild(newDiv);  
        });
    }
});


showAllTasks();