let ocUsername = false;
let ocPassword = false;

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
		if(password1 != password2){
			ocPassword = false;
			$("#callbackPassword").html(`<i class="fas fa-times-circle"></i> &nbsp; Las contraseñas no coinciden`);
		}
		else{
			ocPassword = true;
			$("#callbackPassword").html("");
		}
	}

}


function registrame(){
	if(ocUsername && ocPassword){
		let url = "rest/usuario/";
		let fd = new FormData();

		fd.append('login', 	$("#login").val() 	);
		fd.append('pwd',	$("#pwd").val()		);
		fd.append('pwd2',	$("#pwd2").val()	);
		fd.append('nombre',	$("#nombre").val()	);
		fd.append('email',	$("#email").val()	);
		fd.append('fnac',	$("#fnac").val()	);

		fetch(url,{'method':'POST','body':fd}).then(function(response){
			if(!response.ok){
				return false;
			}

			response.json().then(function(datos){
				console.log(datos);
				muestraPopap("Resgistro efectuado correctamente.")
				//sessionStorage.setItem('usuario',JSON.stringify(datos));
			});

		},function(response){

		});
	}
}

functio refirige