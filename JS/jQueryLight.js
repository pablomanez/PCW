//JQUERY_L ===============================================

// Devuelve un elemento dado su id
function $(id){
	let target = document.querySelectorAll(id);
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
	if(value == undefined)
		return null;

	return value;
}