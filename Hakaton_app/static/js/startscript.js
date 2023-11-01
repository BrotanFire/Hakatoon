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
}

async function ShowAllTasks()
{
 let response = await fetch('http://92.51.44.167:8080/api/token', {
  method: 'GET',
  headers: {
    'Authorization': 'Token ad7be1d2088cd1490b5b6f6597080e14df6f404a'
    'Content-Type': 'application/json'
  },
});
console.log(response.json)
}