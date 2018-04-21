/*
TODO:
	NUEVARECETA:
		Solamente acceder estando logueado
		Al añadir un nuevo ingrediente que se añada al final de la lista automaticamente		HECHO
		Lo de añadir las fotos 																	HECHO (FALTA LO DE LA RUTA)
		Tamaño de imagen máximo para las fotos (300kb) >> MENSAJE MODAL O EMERGENTE				HECHO
		Al enviar la receta si no hay ninguna foto, sedebe de avisar al usuario

		MÁS >> Punto c2

		PODER ELIMINAR LOS INGREDIENTES DE LA RECETA

*/

var url_paginacion = "";
var num_paginacion = "1/1";


function ingrediente_masmas() {
	//AÑADE UN INGREDIENTE MAS A LA LISTA DE NUEVA RECETA

	let ingr = document.getElementById("new_ingredient").value; //EL INGREDIENTE
	let list = document.getElementById("l_ingr"); 				//LA LISTA
	let li = document.createElement("li");						//CREO EL LI
	let span = document.createElement("span");					//CREO EL SPAN
	let textnode = document.createTextNode(ingr);				//DOY VALOR AL SPAN
	
	span.appendChild(textnode);									//<span>Chirimoya</span>
	span.setAttribute("class","text-dark");						//<span class="text-dark">Chirimoya</span>
	li.appendChild(span);										//<li><span class="text-dark">Chirimoya</span></li>
	li.setAttribute("class","bg-orange p-2 mb-1");				//<li class="bg-orange p-2 mb-1"><span class="text-dark">Chirimoya</span></li>
		
	list.appendChild(li);

	document.getElementById("new_ingredient").value = "";

	//LOG
	//console.log("No, Muzska no ha subido video :(");
	//console.log("Aunque has añadido un/una "+ingr);

	//hacerLogin();
}

function foto_masmas(){
	//AÑADE UNA FOTO MAS A LA LISTA DE FOTOS DE UNA RECETA
	//let input = document.getElementById("input_foto").value;
	/*
	let reader = new FileReader();
	reader.onload = function(e){
		document.getElementById("input_foto").
	}
	*/
	let request = new XMLHttpRequest();
	request.open("GET", "includes/foto_nuevareceta.html", true);
	let node = this;
	request.onreadystatechange = function(oEvent){
		if(request.readyState == 4){
			if(request.status == 200){
				let div = document.createElement("div");
				div.innerHTML = request.responseText;

				let i = 0;
				while(true){
					if(!document.getElementById("f_"+i)){
						break;
					}
					i++;
				}
				div.id = "f_"+i;

				div.getElementsByTagName("span")[0].id = "b_"+i;

				//console.log(div.getElementsByTagName("input")[0]);
				document.getElementById("l_fotos").appendChild(div);
			}
		}
	}
	request.send(null);

/*
	if(input != ""){
		let file = document.getElementById("input_foto").files[0].name;
		let size = document.getElementById("input_foto").files[0].size;

		if(size >= 300000){
			//console.log("ERROR: Tamaño de imagen excedido");
			return;
		}

		//console.log("RUTA: "+ file);

		let list = document.getElementById("l_fotos");

		let div = document.createElement("div");
		let span = document.createElement("span");
		let img = document.createElement("img");
		let textarea = document.createElement("textarea");

		let j = 0;
		while(true){
			if(!document.getElementById("f_"+j)){
				break;
			}
			j++;
		}

		//SPAN
		let i = document.createElement("i");
		i.setAttribute("class","fas fa-times");
		span.appendChild(i);
		span.setAttribute("class","position-absolute pointer t0 r0 m-2 text-blood h3 z-2");
		span.setAttribute("id","b_"+j);
		span.setAttribute("onclick","borraFoto(id)");

		//IMG
		//<img style="border-radius: 5px;" class="mr-2 Mw-100" src="Images/EL_LOGO.jpg" alt="Foto de la receta">
		img.setAttribute("style","border-radius: 5px;");
		img.setAttribute("class","mr-2 Mw-100");
		img.setAttribute("src","Images/"+file);
		img.setAttribute("alt","Foto de la receta");

		//TEXTAREA
		//<textarea style="resize: none; height: auto; border: none;" class="form-control" rows="5" cols="35" name="d_foto" placeholder="Escribe una descripción de la foto" maxlength="250" required></textarea>
		textarea.setAttribute("style","resize: none; height: auto; border: none;");
		textarea.setAttribute("class","form-control");
		textarea.setAttribute("rows","5");
		textarea.setAttribute("cols","35");
		textarea.setAttribute("name","d_foto");
		textarea.setAttribute("placeholder","Escribe una descripción de la foto");
		textarea.setAttribute("maxlength","250");
		textarea.setAttribute("required","true");

		//DIV
		div.appendChild(span);
		div.appendChild(img);
		div.appendChild(textarea);
		div.setAttribute("class","bg-dark-t box-shadow p-4 text-light mb-2 position-relative");
		div.setAttribute("id","f_"+j)

		list.appendChild(div);

	}
	else{
		//console.log("No has subido ninguna foto");
	}
*/
}

function muestraFoto(input){
	//console.log("MOSTRAR FOTO");
}

function nuevaReceta(frm){
	let name = document.getElementById("n").value;
	let elab = document.getElementById("e").value;
	let comen = document.getElementById("c").value;
	let time = document.getElementById("t").value;
	let diff = document.getElementById("d").value;

	let ingr = document.getElementById("l_ingr").getElementsByTagName("span"); //LISTA DE INGREDIENTES
	let img = document.getElementById("l_fotos").getElementsByTagName("img"); //LISTA DE FOTOS
	let d_img = document.getElementById("l_fotos").getElementsByTagName("textarea"); //LISTA DE DESCRIPCIONES DE CADA FOTO

	//CREAR RECETA >>>> SUBIR INGREDIENTES >>>> SUBIR FOTOS DE LA RECETA
	let fd = new FormData();
	let url = 'rest/receta/';
	let usu = JSON.parse(sessionStorage['usuario']);

	fd.append('l',usu.login);
	fd.append('n',name);
	fd.append('e',elab);
	fd.append('t',time);
	fd.append('d',diff);
	fd.append('c',comen);

	for(var pair of fd.entries()) {
	   console.log(pair[0]+ ', '+ pair[1]); 
	}
	/*
	let init = { 'method':'post', 'body':fd, 'headers':{'Authorization':usu.clave} };

	fetch(url,init).then(function(response){
		if(!response.ok){
			console.log("ERROR CON CÓDIGO: " + response.status);
			return false;
		}
		console.log("gilipollas");
		
		response.json().then(function(datos){
			console.log(datos);
		});

	},function(response){
		console.log("error");
	});
	*/
}

function borraFoto(id){
	//BORRAR UNA FOTO DE LA LISTA DE UNA RECETA
	let n = id.substring(2);
	
	let div = document.getElementById("f_"+n);
	//console.log(div);

	div.parentNode.removeChild(div);

	//LOG
	//console.log("BORRAR");
}

//EJEMPLO QUE PASÓ JUAN POR WHATSAPP
function login(frm){
	
	let fd = new FormData(frm);
	let xhr = new XMLHttpRequest();
	let url = '../rest/login';
	let u, clave;

	xhr.open('POST',url,true);
	xhr.onload = function(){
		console.log(xhr.responseText);
		let r = JSON.parse(xhr.responseText);

		if(r.RESPUESTA = 'OK'){
			console.log(r);
			sessionStorage.setItem('usuario',xhr.responseText);
			u = JSON.parse(sessionStorage['usuario']);
			clave = u.clave;

			sessionStorage.setItem('login',u.login);
			sessionStorage.setItem('clave',u.clave);
		}
		else{
			console.log("EROEOROEROEROERO");
		}

	};
	xhr.setRequestheader('Authorization',clave);
	xhr.send(fd);
}

function loginControl(){
	//FUNCION QUE PONE DIVS EN SU SITIO EN EL CASO QUE ESTES O NO LOGUEADO
	let login 		= '<a class="btn revers-a ml-auto" href="login.html">Login</a>';
	let registro 	= '<a class=" btn btn-outline-orange" href="registro.html">Registro</a>';
	let logout 		= '<a class=" btn btn-outline-orange" href="index.html">Log out</a>';
	let newRecipe 	= '<span class=" h2"><i class="fas fa-file"></i></span><span class="d-initial d-md-none  d-lg-initial">Nueva receta</span>';
	if(logueado()){
		document.getElementById("sign_div_noH").innerHTML = logout;
		document.getElementById("sign_div_siH").innerHTML = logout;
		document.getElementById("new_recipe").innerHTML = newRecipe;
	}
	else{
		document.getElementById("sign_div_noH").innerHTML = login+registro;
		document.getElementById("sign_div_siH").innerHTML = login+registro;
	}
}

function logueado(){

	let usu = sessionStorage.getItem('usuario');

	if(!usu){
		console.log("Ste men que no está logueado");

		return false;
	}
	else{
		console.log("Así me gusta, logueado, siguiendo los pasos del gran E");

		return true;
	}

	//console.log("Hola");
}

function buscar_simple(frm){
	//rest/receta/?t={texto1,texto2,...}

	//BORRO PRIMERO LOS RESULTADOS EN EL CASO QUE HUBIERAN
	resetBuscar();

	let fd = new FormData(frm);
	let url = 'rest/receta/?t=';
	url += fd.get('search_box');
	url += '&pag=0&lpag=6';
	console.log("URL DE BÚSQUEDA SIMPLE: " + url);

	buscarRecetas(url);
	updatePags();
	return false;
}

function ultimasSeis(){
	//console.log("ultimasSeis()");

	if(window.location.search && window.location.search[window.location.search.length-1]!='#'){
		//LLEVA ARGUMENTOS
		formBuscar();
		return;
	}

	let url = 'rest/receta/?u=6'; //LAS 6 RECETAS MAS RECIENTES
	buscarRecetas(url);
	updatePags();
}

function buscarRecetas(url){
	//console.log("buscarRecetas("+url+")");
	//PASAS UNA PETICION COMO url
	//PARA LA PÁGINA buscar.html


	url_paginacion = url.split("&l")[0];
	//console.log("url_paginacion: "+url_paginacion);

	fetch(url).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			//console.log(datos);

			//AHORA DEBO TRATAR LA PETICION CON datos.FILAS[]

			
			//SACO LAS FOTOS DE CADA RECETA
			for(let i=0 ; i<datos.FILAS.length ; i++){
				//PETIÇAO DEL FICHERO
				let request = new XMLHttpRequest();
				request.open("GET", "includes/search_recipe.html", true);
				let node = this;
				request.onreadystatechange = function(oEvent){	
					if(request.readyState == 4){
						if(request.status == 200){
							//console.log(datos.FILAS[i]);
							$("#recetas").innerHTML += request.responseText;
							$(".receta_title")[i].append(datos.FILAS[i].nombre);
							$(".receta_autor")[i].append(datos.FILAS[i].autor);
							$(".receta_fecha")[i].append(datos.FILAS[i].fecha);
							$(".receta_pos")[i].append(datos.FILAS[i].positivos);
							$(".receta_neg")[i].append(datos.FILAS[i].negativos);
							//style="background-image: url(Images/RECETA_1.jpg);"
							$(".receta_img")[i].attr("style","background-image: url(fotos/"+datos.FILAS[i].fichero+");");

				
							let url_c = 'rest/receta/'+datos.FILAS[i].id+'/comentarios'; //rest/receta/i/comentarios
							fetch(url_c).then(function(response){
								if(!response.ok){
									return false;
								}

								response.json().then(function(comments){
									//console.log(datos2);
									let div_comments = "";

									for(let j=0 ; j<comments.FILAS.length ; j++){
										let comment = 
										`<div class="col-12 bg-dark-t m-0 p-2 p-2">
											<span class="text-orange">`+comments.FILAS[j].autor+`</span>
											<div class="text-light">`+comments.FILAS[j].texto+`</div>
										</div>`;
										div_comments += comment;
									}

									if($(".receta_comentarios")[i] != undefined){
										$(".receta_comentarios")[i].innerHTML += div_comments;
									}
									else{
										console.log("ERROR EN: "+datos.FILAS[i].nombre);
									}
									
								});
							},function(response){
								console.log("ERROR");
							});

						}
					}
				}
				request.send(null);

			} //FOR
		});

	},function(response){
		console.log("ERROR");
	});
}

function resetBuscar(){
	let recetas = document.getElementById("recetas");
	while(recetas.firstChild){
		recetas.removeChild(recetas.firstChild);
	}
}

function formBuscar(frm){
	
	if(frm){
		console.log("HAY FORMULARIO");
		
		let id = []; //ARRAY DE LOS ID DE LAS RECETAS
		let vacion = true;
		let url = 'rest/receta/?';
		let fd = new FormData(frm);
		resetBuscar();
		
		if(frm.elements[0].value != ""){
			let name = 'n='+frm.elements[0].value+'&';
			url += name;
		}
		if(frm.elements[1].value != "0"){
			let t_min = 'di='+frm.elements[1].value+'&';
			url += t_min;
		}
		if(frm.elements[2].value != "0"){
			let t_max = 'df='+frm.elements[2].value+'&';
			url += t_max;
		}
		if(frm.elements[3].value != "-"){
			let diff = 'd='+frm.elements[3].value+'&';
			url += diff;
		}
		if(frm.elements[4].value != ""){
			let autor = 'a='+frm.elements[4].value+'&';
			url += autor;
		}

		let ingr = document.getElementById('form_ingredientes').getElementsByTagName('li');
		url += 'i=';
		for(let i=0 ; i<ingr.length ; i++){
			if(ingr[i].innerText != ""){
				url += ingr[i].innerText+',';
			}
			console.log(ingr[i].innerText);
		}
		
		if(url[url.length-1] == ','){
			url = url.substr(0,url.length-1);
		}
		if(url[url.length-1] == '='){
			//SI NO SE HA COLOCADO NINGUN INGREDIENTE
			url = url.substr(0,url.length-2);
		}
		if(url[url.length-1] == '&'){
			url = url.substr(0,url.length-1);
		}
		
		url += '&pag=0&lpag=6';
		//console.log(url);
		
		buscarRecetas(url);
			
		/*
		console.log(url);
		console.log(name);
		console.log(ingr);
		console.log(t_min);
		console.log(t_max);
		console.log(diff);
		console.log(autor);
		*/

		return false;
	}
	else{
		//console.log("NO HAY FORMULARIO");
		/*
		let args = window.location.search;
			args = args.substr(1,args.length);
		let aa = args.split("&");

		for(let i=0 ; i<aa.length ; i++){
			console.log(aa[i]);
		}
		*/
	}
}

function limpiaIngredientes(){
	//AL HACER RESET DEL FORMULARIO DE BÚSQUEDA TAMBIÉN SE REINICIAN LOS INGREDIENTES
	let ingr = document.getElementById("form_ingredientes");
	while(ingr.firstElementChild){
		ingr.removeChild(ingr.firstElementChild);
	}
	let li = 
	`<li></li>
	<li></li>`;

	$("#form_ingredientes").innerHTML += li;
}

function updatePags(){
	//ACTUALIZA LOS NUMEROS DE LA PAGINACION
	//console.log("Actualizo la paginacion con: "+url_paginacion);
	
	fetch(url_paginacion).then(function(response){
		//TODO HA IDO BIEN
		if(!response.ok){	//!200
			return false;
		}
		
		response.json().then(function(datos){
			//console.log(datos);
			let min = 1;
			let max;

			let regs = datos.FILAS.length;
			//console.log(regs);

			if(regs > 6){
				//console.log("MAS DE 6");
				if(regs/6 >= 1.5){
					max = regs/6;
					max = max.toFixed();
				}
				else{
					max = regs/6;
					max = max.toFixed();
					max++;
				}
				num_paginacion = min +"/"+ max;

			}
			document.getElementById("pags").innerText = num_paginacion;

		});
		
	},function(response){
		//TODO HA IDO MAL
	});
}

function rePag(bool){
	let aux = num_paginacion;
	let min = parseInt(aux[0]);
	let max = parseInt(aux[2]);

	let url = url_paginacion;

	if(!bool){
		//VOY A LA PAGINA SIGUIENTE, SI HUBIERA
		if(min-1 > 0){
			//HAY PÁGINA
			url = url.split('&pag')[0];
			url += '&pag='+(min-2)+'&lpag=6';

			resetBuscar();
			buscarRecetas(url);

			num_paginacion = (min-1)+'/'+max;
			document.getElementById("pags").innerText = num_paginacion;
		}
	}
	else{
		//VOY A LA ÚLTIMA PÁGINA, SI NO ESTOY EN ELLA
		if(max == min){
			//NO ESTOY EN LA ULTIMA PÁGINA
			url = url.split('&pag')[0];
			url += '&pag=0&lpag=6';

			resetBuscar();
			buscarRecetas(url);

			num_paginacion = 1+'/'+max;
			document.getElementById("pags").innerText = num_paginacion;
		}
	}
}

function avPag(bool){
	let aux = num_paginacion;
	let min = parseInt(aux[0]);
	let max = parseInt(aux[2]);
	let url = url_paginacion;

	if(!bool){
		//VOY A LA PAGINA SIGUIENTE, SI HUBIERA
		if(max-min != 0){
			//HAY PÁGINA
			url += '&pag='+(min)+'&lpag=6';

			resetBuscar();
			buscarRecetas(url);

			num_paginacion = (min+1)+'/'+max;
			document.getElementById("pags").innerText = num_paginacion;
		}
	}
	else{
		//VOY A LA ÚLTIMA PÁGINA, SI NO ESTOY EN ELLA
		if(max != min){
			//NO ESTOY EN LA ULTIMA PÁGINA
			url += '&pag='+(max-1)+'&lpag=6';

			resetBuscar();
			buscarRecetas(url);

			num_paginacion = (max)+'/'+max;
			document.getElementById("pags").innerText = num_paginacion;
		}
	}

}

//EJEMPLO FETCH API
function pruebaFetch(){
	//let url = '../rest/receta/?u=6';
	let url = '../rest/receta/?pag=0&lpag=6';		//PARA LA PAGINACION
	//n=sal 	nombre
	//d=sal 	descripcion
	//t=sal 	por todo

	//fetch(url).then(fOK,fMAL);
	fetch(url).then(function(response){
		//TODO HA IDO BIEN

		if(!response.ok){	//!200
			return false;
		}

		response.json().then(function(datos){
			console.log(datos);

			let html = "";

			datos.FILAS.forEach(function(e){
				html += `<li>${e.nombre}</li>`;
			});

			console.log(html);

			//AÑADIR HTML DONDE SEA

		});

	},function(response){
		//TODO HA IDO MAL
	});

}

function hacerLogin(){
	let url = "rest/login/";
	let fd = new FormData();

	fd.append('login','usuario2');
	fd.append('pwd','usuario2');

	fetch(url,{'method':'POST','body':fd}).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			console.log(datos);
			sessionStorage.setItem('usuario',JSON.stringify(datos));
		});

	},function(response){

	});

}

function hacerComentario(){
	let url = "../rest/receta/1/comentario/";
	let fd = new FormData();
	let usu = JSON.parse(sessionStorage.getItem('usuario'));

	fd.append('l',usu.login);
	fd.append('titulo','Lujan vuelve');
	fd.append('texto','ESTO ES UN COMENTARIO CHACHI');


	fetch(url,{'method':'POST','body':fd,'headers':{'Authorization':usu.clave}}).then(function(response){
		if(!response.ok){
			console.log("error");
			return false;
		}

		response.json().then(function(datos){
			console.log(datos);
		});
	},function(response){
		//ERROROROROROROROR
	});


}


