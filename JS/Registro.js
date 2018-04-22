let ocUsername = false;

function checkUsername(){
	let username = $("#login").val();
	console.log(username);
	if(username){
		let url = 'rest/login/'+username;
		fetch(url).then(function(response){
			if(!response.ok){
				return false;
			}
			response.json().then(function(datos){
				if(datos.DISPONIBLE == true){
					$("#callbackName").removeClass("text-red");
					$("#callbackName").addClass("text-green");
					$("#callbackName").html(`<i class="fas fa-check"></i> &nbsp; Nombre de usuario disponible.`);
					ocUsername = true;
				}
				else{
					$("#callbackName").removeClass("text-green");
					$("#callbackName").addClass("text-red");
					$("#callbackName").html(`<i class="fas fa-times-circle"></i> &nbsp; Nombre de usuario en uso.`);
					ocUsername = false;
				}
			});

		},function(response){
			console.log("ERROR");
		});
	}
	else{
		$("#callbackName").html("");
	}
}

function checkPasswords(){
	let password1 = $("#pwd").val();
	let password2 = $("#pwd2").val();

	if(password1 && password2){
		if(password1 != password2)
			$("#callbackPassword").html(`<i class="fas fa-times-circle"></i> &nbsp; Las contraseñas no coinciden`);
		else
			$("#callbackPassword").html("");
	}

}