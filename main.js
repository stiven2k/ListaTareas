const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const text = input.value;

    if (text !== "") {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = text;

        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        ul.appendChild(li);

        input.value = "";
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
    const usuarioCorrecto = "Maria"; 
    const contraseñaCorrecta = "1234";
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

InicioSesion();

const users = {}; 
let currentUser = null; 

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username]) {
        alert('usuario ya existe');
    } else {
        users[username] = { password, tasks: [] };
        alert('Registro exitoso');
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.getElementById('loginRegisterArea').style.display = 'none';
        document.getElementById('taskArea').style.display = 'block';
        renderTasks();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('loginRegisterArea').style.display = 'block';
    document.getElementById('taskArea').style.display = 'none';
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

document.getElementById('username').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') login();
});
document.getElementById('password').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') login();
});
