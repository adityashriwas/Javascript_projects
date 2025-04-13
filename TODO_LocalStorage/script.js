document.addEventListener('DOMContentLoaded', ()=>{
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const addTaskButton = document.getElementById("add-task-btn");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => {
        rederTask(task)
    })

    addTaskButton.addEventListener('click', ()=>{
    const taskText = todoInput.value.trim()

    if (taskText === "") return

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }
    tasks.push(newTask)
    saveTasks()
    rederTask(newTask)
    todoInput.value = ""
    console.log(tasks)    
    })

    function rederTask(task){
        console.log(task);
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) {
            li.classList.add('completed')
        }
        li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>
        `;
        li.addEventListener('click', (e)=>{
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            saveTasks()
        })

        li.querySelector('button').addEventListener('click', (e)=>{
            e.stopPropagation()
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove()
            saveTasks()
        })

        todoList.appendChild(li)
    }

    function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})