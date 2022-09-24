// Вывести список студентов и оценки по 10 домашкам
// Это должна быть таблица, где в строках студенты, а в колонках домашки. 
// В каждой строке 10 инпутов (по числу домашек). 
// Пользователь может изменить значение в инпуте, и когда уберет фокус из поля, должен отправится запрос на обновления соответствующего студента.
// Рядом с именем студента находится кнопка удалить, которая удаляет студента из списка.
// Под списком находится инпут и кнопка добавить, Пользователь может внести имя студента и нажать кнопку, после этого новый студент добавить в список.
// Проект собирать с помощью gulp + browsersync

const API = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io";

const controller = async (path, method = "GET", body) => {
    const URL = `${API}${path}`;

    const params = {
        method,
        headers: {
            "content-type": "application/json",
        }
    }

    if (body) {
        params.body = JSON.stringify(body);
    }

    let request = await fetch(URL, params);
    let response = await request.json();
    return response;
}

window.addEventListener("load", async () => {
    const response = await controller("/students");

    if(response) {
        const exemplarStudent = new Student(response);

        for(let key in exemplarStudent) {
            this[key] = exemplarStudent[key];
            exemplarStudent.render(response[key]);  
        }
    }
});

class Student {
    constructor(studentObj) {
        for(let key in studentObj) {
            this[key] = studentObj[key]
        }
    }

    render(key) {
        const table = document.getElementById("table");
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdButton = document.createElement("td");
        const deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", "deleteButton");
            deleteButton.innerText = "delete";
        const studName = `${key.name}`;

        function getMarks () {
            for(let i = 0; i < key.marks.length; i++ ) {
                var tdInput = document.createElement("td");
                var inputMark = document.createElement("input");
                inputMark.setAttribute("type", "text");
                inputMark.setAttribute("id", "mark");
                inputMark.setAttribute("value", `${key.marks[i]}`);

                tr.append(tdInput);
                tdInput.append(inputMark);

                inputMark.addEventListener("blur", async (e) => {

                    const { value } = e.target;
                    console.log(value);     ////  получили изменененную оценку

                    const body = {
                        name: key.name,
                        marks: key.mars   ////  ???????????? 
                    }
                    
                    const response = await controller(`/students/${key.id}`, "PUT", body);
                    console.log(response);
                })               
            }
        }
            
        tdName.innerHTML = studName;

        table.append(tr);
        tr.append(tdName);
        getMarks ();
        tr.append(tdButton);
        tdButton.append(deleteButton);

        deleteButton.addEventListener("click", async () => {
            await controller(`/students/${key.id}`, "DELETE");
    
            if(key.id) {
                tr.innerHTML = "";
            }
        })
    }      
}

function addBlock() {
    const addForm = document.getElementById("addForm");

    addForm.addEventListener("submit", async e => {
        e.preventDefault();

        const name = addForm.querySelector("#addStudent").value;
        const students = await controller("/students");
        const student = students.find(elem => elem.name === name);

        if(student && student !== "undefined") {
            alert(`Student ${name} already exist!`);
        }
        else {
            const body = {name};
            const response = await controller("/students", "POST", body);

            if(response) {
                const exemplarStudent = new Student(response);
                exemplarStudent.render(response);
            }
        }  
    })
}

addBlock();