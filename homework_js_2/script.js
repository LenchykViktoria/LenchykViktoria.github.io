const login = prompt ('кто пришел?', 'админ/ другое/ отмена');

if (login == 'админ') { 

	const password = prompt ('пароль?', '');

	if (password == "черный властелин") {
		alert ('добро пожаловать!');
	} else if (password == "другое") { 
		alert ('пароль неверен');
	} else if (password  == 'отмена') {
	alert ('вход отменен');
}


 
} else if (login == 'другое') {
	alert ('я вас не знаю!');
} else if (login == 'отмена') {  
	alert ('вход отменен');

}

