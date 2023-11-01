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
document.cookie = 'token='+json.token
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
console.log(TasksData)
}