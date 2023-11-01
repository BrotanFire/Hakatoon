async function ShowBankInfo()
{
	const Table_headres_name = [
"id",
"BIK",
"idcharge",
"dPeriod",
"stabnum",
"FIO",
"nMoney",
"idkadr",
"idkadr_tmp"];
	let Table_name = document.getElementById('TableName');
	Table_name.innerText="Данные из банка";
	let Response = await fetch('http://localhost:3000/Bank_data');
	let Bank_data = await Response.json();
	let Table_header = document.getElementById("col_name_replace");
	Table_header.innerHTML = '';
	for(let HeaderName in Table_headres_name)
		{
	  let Col = document.createElement('th');
      Col.innerHTML = Table_headres_name[HeaderName];
			Col.setAttribute('scope','col')
	  Table_header.appendChild(Col);
		}
	/*
	console.log(Object.keys(Bank_data[1]));*/
	let Table_body = document.getElementById("col_info_replace")
	Table_body.innerHTML = '';
	for (let i in Bank_data)
		{
			let Cell = document.createElement("tr");
			Cell.setAttribute("id",i)
			Table_body.appendChild(Cell);
			for (let j in Bank_data[i])
				{
					let Cell_text = document.createElement('th');
					Cell_text.innerHTML = Bank_data[i][j];
					Cell_text.setAttribute("id",j+Bank_data[i].id); 
					Cell.appendChild(Cell_text);
				}
			let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = '<button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#BankInfoChange" onclick = "Change_Modal_BankInfo('+Bank_data[i].id+')">Изменить</button>';
			Cell.appendChild(div);
		}
}
async function ShowBank()
{
	const Table_headres_name = [
		"id",
"BIK",
"Bank_Name",
"correspondent_account_of_the_bank",
"location_bank"];
	let Table_name = document.getElementById('TableName');
	Table_name.innerText="Банки";
	let Response = await fetch('http://localhost:3000/Bank_info')
	let Bank_data = await Response.json();
	let Table_header = document.getElementById("col_name_replace");
	Table_header.innerHTML = '';
	for(let HeaderName in Table_headres_name)
		{
	  let Col = document.createElement('th');
      Col.innerHTML = Table_headres_name[HeaderName];
			Col.setAttribute('scope','col')
	  Table_header.appendChild(Col);
		}
	/*
	console.log(Object.keys(Bank_data[1]));*/
	let Table_body = document.getElementById("col_info_replace")
	Table_body.innerHTML = '';
	for (let i in Bank_data)
		{
			let Cell = document.createElement("tr");
			Table_body.appendChild(Cell);
			for (let j in Bank_data[i])
				{
					let Cell_text = document.createElement('th');
					Cell_text.innerHTML = Bank_data[i][j];
					Cell_text.setAttribute("id",j+Bank_data[i].id);
					Cell.appendChild(Cell_text);
				}
			let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = '<button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#BankChange" onclick = "Change_Modal_Bank(\''+String(Bank_data[i].id)+'\')">Изменить</button>';
		
			Cell.appendChild(div);
		}
}
async function ShowContract()
{
	const Table_headres_name = [
"Номер договора",
		"idkadr",
		"stabnum",
		"idcharge",
		"dogovorNum",
		"dogovorDate"
];
	let Table_name = document.getElementById('TableName');
	Table_name.innerText="Договоры";
	let Response = await fetch('http://localhost:3000/Contract')
	let Bank_data = await Response.json();
	let Table_header = document.getElementById("col_name_replace");
	Table_header.innerHTML = '';
	for(let HeaderName in Table_headres_name)
		{
	  let Col = document.createElement('th');
      Col.innerHTML = Table_headres_name[HeaderName];
			Col.setAttribute('scope','col')
	  Table_header.appendChild(Col);
		}
	/*
	console.log(Object.keys(Bank_data[1]));*/
	let Table_body = document.getElementById("col_info_replace")
	Table_body.innerHTML = '';
	for (let i in Bank_data)
		{
			let Cell = document.createElement("tr");
			Table_body.appendChild(Cell);
			for (let j in Bank_data[i])
				{
					let Cell_text = document.createElement('th');
					Cell_text.innerHTML = Bank_data[i][j];
					Cell_text.setAttribute("id",j+Bank_data[i].id);
					Cell.appendChild(Cell_text);
				}
			let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = '<button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#ContractChange"onclick = "Change_Modal_Contract(\''+String(Bank_data[i].id)+'\')">Изменить</button>';
			Cell.appendChild(div);
		}
}