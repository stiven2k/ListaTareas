const input = document.querySelector("input");
const inputTask = document.getElementById("taskName");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

const usuarioCorrecto = ""; 
const contraseñaCorrecta = "";

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const text = inputTask.value;

    if (text !== "") {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = text;

        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        ul.appendChild(li);

        inputTask.value = "";
        empty.style.display = "none";
    }
});

function addDeleteBtn() {
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll("li");

        if (items.length === 0) {
            empty.style.display = "block";
        }
    });

    return deleteBtn;
}

function InicioSesion() {
    let intentos = 0;

    while (intentos < 3) {
        const usuario = prompt("Introduce tu usuario:");
        const contraseña = prompt("Introduce tu contraseña:");

        if (usuario === usuarioCorrecto && contraseña === contraseñaCorrecta) {
            alert("Inicio de sesión exitoso!");
            return; 
        } else {
            intentos++;
            alert("Usuario o contraseña incorrectos. Intentos restantes: " + (3 - intentos));
        }
    }

    alert("Has superado el número máximo de intentos.");
}

// InicioSesion();

const users = {}; 
let currentUser = null; 

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    users[username] = { password, tasks: [] };
    if(username=== "" && password === "")
        alert("Ingrese usuario y/o contrasena");
    else
        alert('Registro exitoso');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.getElementById('loginRegister').style.display = 'none';
        document.getElementById('listaTareas').style.display = 'block';
        document.getElementById('listaTareas').style.display = 'block';
        renderTasks();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('loginRegister').style.display = 'block';
    document.getElementById('listaTareas').style.display = 'none';
}

function addTask() {
    const taskText = document.getElementById('newTask').value;
    if (taskText && currentUser) {
        users[currentUser].tasks.push(taskText);
        document.getElementById('newTask').value = '';
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 
    users[currentUser].tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
}

document.getElementById('listaTareas').style.display = 'none';

document.getElementById('username').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') login();
});
document.getElementById('password').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') login();
});
