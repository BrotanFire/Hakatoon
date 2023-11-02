

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
let delete_btn = document.getElementById('delete_btn')
let div = document.getElementById('delete_btn');
div.className = "alert";
div.innerHTML = '<button type="button" class="btn btn-danger" onclick = "DeleteTask('+TaskData[0].id+')" data-bs-dismiss="modal">Удалить</button>';
let EmpName = document.getElementById('EmpName')
let div2 = document.createElement('add_emp_btn');
div2.innerHTML = '<button type="button" data-bs-toggle="modal" data-bs-target="#TaskAddEmp" onclick = "LoadEmp2('+TaskData[0].id+')"class="btn btn-primary">Назначить сотрудника</button>';
let Status = document.getElementById('Status')
let Desc = document.getElementById('Desc')
let created_ts = document.getElementById('created_ts')
let in_progress_ts = document.getElementById('in_progress_ts')
let executed_ts = document.getElementById('executed_ts')
title.innerHTML = ""
Desc.innerHTML = ""
EmpName.innerHTML = ""
Status.innerHTML =  ""
created_ts.innerHTML =  ""
executed_ts.innerHTML =  ""
in_progress_ts.innerHTML = ""
title.innerHTML = TaskData[0].title
Desc.innerHTML = TaskData[0].description
try
{EmpName.innerHTML = TaskData[0].assigned_to.first_name +' '+ TaskData[0].assigned_to.second_name}
catch(e){EmpName.innerHTML = ""}
Status.innerHTML =  TaskData[0].status.status_ru
let created_date = Date((TaskData[0].created_ts).toString())
var date1 = new Date(Date.parse((TaskData[0].created_ts).toString()))
console.log(date1.toUTCString())
created_ts.innerHTML = date1.toLocaleString()
date1 = new Date(Date.parse((TaskData[0].in_progress_ts).toString()))
in_progress_ts.innerHTML = date1.toLocaleString()
date1 = new Date(Date.parse((TaskData[0].executed_ts).toString()))
executed_ts.innerHTML = date1.toLocaleString()
}


async function AddTask()
{
let emp_stat = document.getElementById('emp_select').value
let TaskInfo
if (emp_stat == "null")
{
TaskInfo =
	{
    title:document.getElementById('title_add').value,
    description:  document.getElementById('Desc_Add').value
    }
}
else
{
TaskInfo =
	{
    title:document.getElementById('title_add').value,
    description:  document.getElementById('Desc_Add').value,
    assigned_to: document.getElementById('emp_select').value,
    }
}
var token = getCookie('token');
 let response = await fetch('http://92.51.44.167:8080/task/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(TaskInfo)
});
console.log(response.json())
ShowAllTasks()
}


async function LoadEmp()
{
var token = getCookie('token');
 let response = await fetch('http://92.51.44.167:8080/personal', {
  method: 'GET',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
});

let EmpData  = await response.json();
let emplist = document.getElementById('emp_select')
emplist.innerHTML = ""
let emp = document.createElement("option")
emp.value = "null"
emp.innerHTML = " "
emplist.appendChild(emp)
for (let i in EmpData)
{
let emp = document.createElement("option")
emp.value = EmpData[i].id
emp.innerHTML = EmpData[i].first_name + " " +EmpData[i].second_name
emplist.appendChild(emp)
}
}


async function LoadEmp2(id)
{
let div2 = document.createElement('addemp');
div2.innerHTML = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="AddEmpTask('+TasksData[i].id+')">Добавить </button>'

var token = getCookie('token');
 let response = await fetch('http://92.51.44.167:8080/personal', {
  method: 'GET',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
});

let EmpData  = await response.json();
let emplist = document.getElementById('emp_select_2')
emplist.innerHTML = ""
let emp = document.createElement("option")
emp.value = "null"
emp.innerHTML = " "
emplist.appendChild(emp)
for (let i in EmpData)
{
let emp = document.createElement("option")
emp.value = EmpData[i].id
emp.innerHTML = EmpData[i].first_name + " " +EmpData[i].second_name
emplist.appendChild(emp)
}
}


async function DeleteTask(task_id)
{
let TaskDel =
	{
	id:task_id
    }
var token = getCookie('token');
 let response = await fetch('http://92.51.44.167:8080/task/delete', {
  method: 'POST',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(TaskDel)
});
let TasksData = await response.json();
alert(TasksData.message)
ShowAllTasks()
}


async function ShowReadyTasks()
{
 var token = getCookie('token');

 let response = await fetch('http://92.51.44.167:8080/tasks/executed', {
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


async function ShowNotReadyTasks()
{
 var token = getCookie('token');

 let response = await fetch('http://92.51.44.167:8080/tasks/assigned', {
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
		let response3 = await fetch('http://92.51.44.167:8080/tasks/in-progress', {
  method: 'GET',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
});
TasksData = await response3.json();
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
		let response2 = await fetch('http://92.51.44.167:8080/tasks/created', {
  method: 'GET',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
});
TasksData = await response2.json();
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
}


async function AddEmpTask(task_id)
{
    let EmpAdd =
	{
	personal_id:document.getElementById('emp_select_2').value,
	id:task_id,
    }
var token = getCookie('token');
 let response = await fetch('http://92.51.44.167:8080/task/assign', {
  method: 'POST',
  headers: {
    'Authorization': 'Token '+token ,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(EmpAdd)
});
let TasksData = await response.json();
alert(TasksData.message)
ShowAllTasks()
}