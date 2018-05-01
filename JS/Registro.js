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
				$("#login").val("");
				$("#pwd").val("");
				$("#pwd2").val("");
				$("#nombre").val("");
				$("#email").val("");
				$("#fnac").val("");
				$("#callbackName").html("");
				muestraPopUpRegitro("Registro efectuado óptimamente.");
				//sessionStorage.setItem('usuario',JSON.stringify(datos));
			});

		},function(response){

		});
	}
}


function muestraPopUpRegitro(msg){
	let popap =
	`<div class="bg-dark-t2 w-100 h-100 d-flex align-items-center justify-content-center position-fixed z-100"> 
			<div class="position-relative">
				<div onclick="destroyPopUPRegistro();"class="position-absolute t0 r0 bg-darkt-t p-1 div-link pointer h4 text-blood">
					<i class="far fa-times-circle"></i>
				</div>
				<div  class="bg-light d-flex align-items-center justify-content-center box-shadow-light text-center p-3 t-2">
					`+msg+`
				</div>
			</div>
		</div>`;

	$("#popap").html(popap);
}


function destroyPopUPRegistro(){
	

	window.location.href = "http://localhost/login.html";
}