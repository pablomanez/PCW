//JQUERY_L ===============================================
var dayList = new Array(7);
dayList[0] = "domingo";
dayList[1] = "lunes";
dayList[2] = "martes";
dayList[3] = "miércoles";
dayList[4] = "jueves";
dayList[5] = "viernes";
dayList[6] = "sábado";

// Devuelve un elemento dado su id
function $(id){
	let target = document.querySelectorAll(id);
	if(target.length == 1 && id.substr(0,1) != ".")
		return target[0];
	else
		return target;
}

// Devuelve un elemento concreto dentro de otro
HTMLElement.prototype.$ = function(id){
	let target = this.querySelectorAll(id);
	if(target.length == 1 && id.substr(0,1) != ".")
		return target[0];
	else
		return target;
}

NodeList.prototype.$ = function(id){
	let target = this.querySelectorAll(id);
	if(target.length == 1 && id.substr(0,1) != ".")
		return target[0];
	else
		return target;
}

// Añade código HTML a un elemento
HTMLElement.prototype.append = function(obj){
	this.innerHTML += obj;
}

NodeList.prototype.append = function(obj){
	this.innerHTML += obj;
}

// Añade o devuelve el código HTML de un elemento
HTMLElement.prototype.val = function(val){
	if(val == "" || val)
		this.value = val;
	else
		return this.value;
}

NodeList.prototype.val = function(val){
	if(val == "" || val)
		this.value = val;
	else
		return this.value;
}

// Cambia o devuelve el código HTML de un elemento
HTMLElement.prototype.html = function(obj){
	if(obj == "" || obj)
		this.innerHTML = obj;
	else
		return this.innerHTML;
}

NodeList.prototype.html = function(obj){
	if(obj == "" || obj)
		this.innerHTML = obj;
	else
		return this.innerHTML;
}

// Atributos
HTMLElement.prototype.attr = function(attribute, value){
	this.setAttribute(attribute, value);
}

NodeList.prototype.attr = function(attribute, value){
	this.setAttribute(attribute, value);
}

// Elimina clase
HTMLElement.prototype.removeClass = function(classname){
	this.classList.remove(classname);
}

NodeList.prototype.removeClass = function(classname){
	this.classList.remove(classname);
}

// Añade clase 
HTMLElement.prototype.addClass = function(classname){
	this.classList.add(classname);
}

NodeList.prototype.addClass = function(classname){
	this.classList.add(classname);
}

// Load
HTMLElement.prototype.load = function(url){
	let request = new XMLHttpRequest();
	request.open("GET", url, true);
	let node = this;
	request.onreadystatechange = function(oEvent){
		if(request.readyState == 4){
			if(request.status == 200){
				node.innerHTML += request.responseText;
			}
		}
	}
	request.send(null);
}

NodeList.prototype.load = function(url){
	let request = new XMLHttpRequest();
	request.open("GET", url, true);
	let node = this;
	request.onreadystatechange = function(oEvent){
		if(request.readyState == 4){
			if(request.status == 200){
				node.innerHTML += request.responseText;
			}
		}
	}
	request.send(null);
}

function getUrlParameter(url, p){
	let params = url.split("?")[1];

	if(params == undefined)
		return null

	let begin = params.indexOf(p);
	let substring = params.substr(begin);
	let end = substring.indexOf("&");

	if(end != -1){
		substring = substring.substr(0, end);
	}

	let value = substring.split("=")[1];

	if(!value)
		return null;

	return value;
}



// Funciones globales
function logueado(){

	let usu = sessionStorage.getItem('usuario');

	if(!usu){
		return false;
	}
	else{
		return true;
	}

	//console.log("Hola");
}

function muestraPopUp(msg){
	let popap =
	`<div class="bg-dark-t2 w-100 h-100 d-flex align-items-center justify-content-center position-fixed z-100"> 
			<div class="position-relative">
				<div onclick="destroyPopUP();"class="position-absolute t0 r0 bg-darkt-t p-1 div-link pointer h4 text-blood">
					<i class="far fa-times-circle"></i>
				</div>
				<div  class="bg-light d-flex align-items-center justify-content-center box-shadow-light text-center p-3 t-2">
					`+msg+`
				</div>
			</div>
		</div>`;

	$("#popap").html(popap);
}


function destroyPopUP(){
	$("#popap").html("");
}


//FUNCION QUE PONE DIVS EN SU SITIO EN EL CASO QUE ESTES O NO LOGUEADO
function loginControl(){
	let login 		= '<a class="btn revers-a ml-auto" href="login.html">Login</a>';
	let registro 	= '<a class=" btn btn-outline-orange" href="registro.html">Registro</a>';
	let logout 		= '<a onclick="logout();" class=" btn btn-outline-orange" href="index.html">Log out</a>';
	let newRecipe 	= '<span class=" h2"><i class="fas fa-file text-orange"></i></span><span class="d-initial d-md-none d-lg-initial text-orange"> Nueva receta</span>';
	if(logueado()){
		let username = JSON.parse(sessionStorage.getItem('usuario')).login;
		$("#sign_div_noH").html("Hola, <span class='text-orange'>"+username+" </span>"+logout);
		$("#sign_div_siH").html("Hola, <span class='text-orange'>"+username+" </span>"+logout);
		$("#new_recipe").attr("style", "");
	}
	else{
		if(document.location.pathname == '/nueva-receta.html'){
			window.location.replace("http://localhost/registro.html");
		}
		
		document.getElementById("sign_div_noH").innerHTML = login+registro;
		document.getElementById("sign_div_siH").innerHTML = login+registro;
	}
}

function logout(){
	sessionStorage.clear();
	window.location.href = "http://localhost/index.html";
}