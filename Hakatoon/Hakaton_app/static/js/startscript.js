async function GetToken()
{
	let UserInfo =
	{
    username: "Team 4.0",
    password:  "CyinhJ44GX",
	}
  let response = await fetch('http://92.51.44.167:8080/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(UserInfo)
});
const json = await response.json();
console.log("Успех:", JSON.stringify(json));
console.log(json.token)
document.cookie = "token="+json.token+"; SameSite=None; Secure"
ShowAllTasks()
}
function getCookie(name) {
   var value = "; " + document.cookie;
   var parts = value.split("; " + name + "=");
   if (parts.length == 2) return parts.pop().split(";").shift();
}

async function ShowAllTasks()
{
 var token = getCookie('token');

 let response = await fetch('http://92.51.44.167:8080/tasks', {
  method: 'GET',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
});
let TasksData = await response.json();
let Table_body = document.getElementById("row_start")
Table_body.innerHTML = '';
for (let i in TasksData)
		{
			let Cell = document.createElement("div");
			Cell.className = "col";
			Cell.setAttribute("id",i)
			Table_body.appendChild(Cell);
			let cell = document.createElement("div")
			cell.className = "card mb-4 shadow-sm h-80"
			let cell_header = document.createElement("div")
			cell_header.className = "card-header"
			let cell_title = document.createElement("h4")
			cell_title.className = "my-0 font-weight-normal"
			cell_title.innerHTML = TasksData[i].title
			let cell_body = document.createElement("div")
			cell_body.className = "card-body"
			let body_text =  document.createElement('ul');
			body_text.className = "list-unstyled"
			let body_text_description =  document.createElement("h6");
			body_text_description.innerHTML = 'Описание: ' + TasksData[i].description
			let body_text_status =  document.createElement("h6");
			body_text_status.innerHTML = 'Статус: ' + TasksData[i]['status'].status_ru
			let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = '<button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#TaskInfo" onclick = "ShowTask('+TasksData[i].id+')">Подробнее</button>';
			Cell.appendChild(div);
			Cell.appendChild(cell)
			cell.appendChild(cell_header)
			cell.appendChild(cell_body)
			cell_header.appendChild(cell_title)
			cell_body.appendChild(body_text)
			body_text.appendChild(body_text_description)
			body_text.appendChild(body_text_status)
			cell.appendChild(div)
		}
		console.log(TasksData)
}

async function ShowTask(TaskId)
{
var token = getCookie('token');

 let response = await fetch('http://92.51.44.167:8080/task/'+TaskId, {
  method: 'GET',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
});
let TaskData  = await response.json();
let title = document.getElementById('title')
let EmpName = document.getElementById('EmpName')
let Status = document.getElementById('Status')
let Desc = document.getElementById('Desc')
let created_ts = document.getElementById('created_ts')
let in_progress_ts = document.getElementById('in_progress_ts')
let executed_ts = document.getElementById('executed_ts')
title.innerHTML = 'Задача: ' + TaskData[0].title
Desc.innerHTML = 'Подробно: ' + TaskData[0].description
EmpName.innerHTML = 'ФИО: ' +  TaskData[0].assigned_to.first_name +' '+ TaskData[0].assigned_to.second_name
Status.innerHTML = 'Статус: ' + TaskData[0].status.status_ru
let created_date = Date((TaskData[0].created_ts).toString())
var date1 = new Date(Date.parse((TaskData[0].created_ts).toString()))
console.log(date1.toUTCString())
created_ts.innerHTML = 'Задача создана: ' + date1.toLocaleString()
date1 = new Date(Date.parse((TaskData[0].in_progress_ts).toString()))
in_progress_ts.innerHTML = 'Задача принята в работу: ' + date1.toLocaleString()
date1 = new Date(Date.parse((TaskData[0].executed_ts).toString()))
executed_ts.innerHTML = 'Задача выполнена: ' + date1.toLocaleString()
}
async function AddTask()
{
var token = getCookie('token');

 let response = await fetch('http://92.51.44.167:8080/task/'+TaskId, {
  method: 'POST',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
});
let TaskData  = await response.json();
let title = document.getElementById('title')
let EmpName = document.getElementById('EmpName')
let Status = document.getElementById('Status')
let Desc = document.getElementById('Desc')
let created_ts = document.getElementById('created_ts')
let in_progress_ts = document.getElementById('in_progress_ts')
let executed_ts = document.getElementById('executed_ts')
title.innerHTML = 'Задача: ' + TaskData[0].title
Desc.innerHTML = 'Подробно: ' + TaskData[0].description
EmpName.innerHTML = 'ФИО: ' +  TaskData[0].assigned_to.first_name +' '+ TaskData[0].assigned_to.second_name
Status.innerHTML = 'Статус: ' + TaskData[0].status.status_ru
let created_date = Date((TaskData[0].created_ts).toString())
var date1 = new Date(Date.parse((TaskData[0].created_ts).toString()))
console.log(date1.toUTCString())
created_ts.innerHTML = 'Задача создана: ' + date1.toLocaleString()
date1 = new Date(Date.parse((TaskData[0].in_progress_ts).toString()))
in_progress_ts.innerHTML = 'Задача принята в работу: ' + date1.toLocaleString()
date1 = new Date(Date.parse((TaskData[0].executed_ts).toString()))
executed_ts.innerHTML = 'Задача выполнена: ' + date1.toLocaleString()
}