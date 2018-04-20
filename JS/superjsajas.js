/*
TODO:
	NUEVARECETA:
		Solamente acceder estando logueado
		Al añadir un nuevo ingrediente que se añada al final de la lista automaticamente		HECHO
		Lo de añadir las fotos 																	HECHO (FALTA LO DE LA RUTA)
		Tamaño de imagen máximo para las fotos (300kb) >> MENSAJE MODAL O EMERGENTE				HECHO
		Al enviar la receta si no hay ninguna foto, sedebe de avisar al usuario

		MÁS >> Punto c2

		|-------------- FALLA EL POST --------------|

	BUSCAR:
		CAMBIAR FORMULARIO DE BUSCAR Y AÑADIR MÁS CAMPOS



	localhost/rest/get/receta/u=6      ULTIMAS 6 RECETAS
*/

var dayList = new Array(7);
dayList[0] =  "domingo";
dayList[1] = "lunes";
dayList[2] = "martes";
dayList[3] = "miércoles";
dayList[4] = "jueves";
dayList[5] = "viernes";
dayList[6] = "sábado";


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

	//LOG
	//console.log("No, Muzska no ha subido video :(");
	//console.log("Aunque has añadido un/una "+ingr);

	hacerLogin();
}

function foto_masmas(){
	//AÑADE UNA FOTO MAS A LA LISTA DE FOTOS DE UNA RECETA
	let input = document.getElementById("input_foto").value;
	/*
	let reader = new FileReader();
	reader.onload = function(e){
		document.getElementById("input_foto").
	}
	*/

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

function login(frm){
	//EJEMPLO QUE PASÓ JUAN POR WHATSAPP
	
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
		}
		else{
			console.log("EROEOROEROEROERO");
		}

	};
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

	//LOGS
	/*
	console.log(name);
	console.log(elab);
	console.log(comen);
	console.log(time);
	console.log(diff);

	for(let i=0 ; i<ingr.length ; i++){
		console.log(ingr[i].innerHTML);
	}
	for(let i=0 ; i<img.length ; i++){
		console.log(img[i].src + "-> DESCRIPCIÓN: " + d_img[0].value);
	}
	*/

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
	/*
	console.log(fd.get('l'));
	console.log(fd.get('n'));
	console.log(fd.get('e'));
	console.log(fd.get('t'));
	console.log(fd.get('d'));
	console.log(fd.get('c'));
	*/

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

	/*
	let url = 'rest/receta/';
	//let fd = new FormData();
	let xhr = new XMLHttpRequest();
	let usu = JSON.parse(sessionStorage['usuario']);

	let args = 'l='+usu.login+'&n='+name+'&e='+elab+'&t='+time+'&d='+diff+'&c='+comen;
	console.log(args);
	if(xhr){
		xhr.open('POST',url,true);

		xhr.send(args);
	}
	*/
}

function logueado(){

	let usu = sessionStorage.getItem('usuario');

	if(!usu){
		console.log("Que no te has logueado chaval. ZOORROOOOOOOOOO");


	}
	else{
		console.log("Estás logueado y puedes crear una receta");
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
	console.log("URL DE BÚSQUEDA SIMPLE: " + url);

	buscarRecetas(url);

	return false;
}

function ultimasSeis(){
	console.log("ultimasSeis()");

	if(window.location.search && window.location.search[window.location.search.length-1]!='#'){
		//LLEVA ARGUMENTOS
		formBuscar();
		return;
	}

	let url = 'rest/receta/?u=6'; //LAS 6 RECETAS MAS RECIENTES
	buscarRecetas(url);
}

function buscarRecetas(url){
	console.log("buscarRecetas("+url+")");
	//PASAS UNA PETICION COMO url
	//PARA LA PÁGINA buscar.html
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
		
		let vacion = true;
		let url = '/rest/receta/?';
		let fd = new FormData(frm);
		resetBuscar();
		
		if(frm.elements[0].value != ""){
			let name = 'n='+frm.elements[0].value+'&';
			url += name;
		}
		if(frm.elements[1].value != ""){
			let t_min = 'di='+frm.elements[1].value+'&';
			url += t_min;
		}
		if(frm.elements[2].value != ""){
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

		console.log(url);
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

		console.log(url);
		/*
		console.log(name);
		console.log(ingr);
		console.log(t_min);
		console.log(t_max);
		console.log(diff);
		console.log(autor);
		*/

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


function indexLastSix(){
	let url = 'rest/receta/?u=6';
	fetch(url).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			//console.log(datos);
			
			for(let i=0 ; i<datos.FILAS.length; i++){

				let date = new Date(datos.FILAS[i].fecha);
				let month = date.getMonth()+1;

				var figure = 
				`<figure class="col-12 col-md-4 col-xl-2 bg-dark mh-index d-flex justify-content-center p-0 position-relative o-hidden">
					<img class="index-img position-absolute h-100 w-100" src="fotos/`+ datos.FILAS[i].fichero +`" alt="Costillas de cerdo BBQ">
					<div class="z-1 text-center p-1 pt-5 mh-100 w-100">
						<a href="receta.html?id=`+datos.FILAS[i].id+`" class="h-10 d-block text-shadow justify-self-center h2 justify-content-center mt-2 mb-5 h-10">	
							<span class="d-block tag">` + datos.FILAS[i].nombre + `</span>							<!-- TÍTULO -->
						</a>
						<div class="row m-0">
							<div class="col-12 col-sm-6 col-md-12">
								<a href="buscar.html" class="index-button">
									<div style="background-image: url(Images/Sona_profile.png);" class="circle bg-orange justify-self-center box-shadow bg-image d-flex align-items-end justify-content-center">
									</div>
									<div class="h3 text-shadow text-white">`+ datos.FILAS[i].autor +`</div>		<!-- USUARIO -->
								</a>
							</div>
							<div class="col-12 col-sm-6 col-md-12 row m-0">			
								<div class="col-12 mt-3 text-shadow h3"><time datetime="`+ datos.FILAS[i].fecha +`">` +date.getDate()+`/`+month +`/`+ date.getFullYear()+ `</time></div>		<!-- FECHA -->
								<div class="col-12 h3 my-3 text-shadow">
									<div class="row height-75px">
										<div class="col-5 text-right p-0">
											<i class="fas fa-thumbs-up"></i>
										</div>
										<div class="col-7 text-left pl-1">` + datos.FILAS[i].positivos + `</div>				<!-- LIKES -->

										<div class="col-5 text-right p-0">
											<i class="fas fa-thumbs-down"></i>
										</div>
										<div class="col-7 text-left pl-1">` + datos.FILAS[i].negativos + `</div>					<!-- DISLIKES -->
									</div>
								</div>
							</div>
						</div>
						<div class="comment_tab" class="pb-2">

						</div>
					</div>
				</figure>`;

				$("#recipes").append(figure);
				
				let url_c = 'rest/receta/'+datos.FILAS[i].id+'/comentarios'; //rest/receta/i/comentarios
				fetch(url_c).then(function(response){
					if(!response.ok){
						return false;
					}

					response.json().then(function(comments){
						console.log("FILAS DE COMMENTS " + comments.FILAS.length);
						for(let j=0 ; j<comments.FILAS.length ; j++){
							
							let comment =  `<div class="bg-dark-t text-left px-2 py-1 mb-1">				<!-- COMENTARIO -->
											<span class="text-orange h6">`+comments.FILAS[j].autor+`</span>
											<div class="h5">`+comments.FILAS[j].texto+`</div>
										</div>`;
							$(".comment_tab")[i].append(comment);
						}
					});
				});
				
			}

		});

	},function(response){
		console.log("ERROR");
	});
}


function loadRecipe(){
	let url = window.location.href;
	let id = getUrlParameter(url, "id");

	if(id == null)
		window.location.href = "http://localhost/index.html";

	let consulta = "rest/receta/"+id;
	fetch(consulta).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			if(datos.FILAS.length == 0){
				console.log("404 NOT FOUND")
			}
			//console.log(datos);

			let circle = `<i class="fas fa-circle mr-1"></i>`;
			let dude = `<i class="fas fa-male mr-1"></i>`;

			let date = new Date(datos.FILAS[0].fecha);
			let month = date.getMonth()+1;
			$("#name").append(datos.FILAS[0].nombre);

			getPhotos(datos.FILAS[0].id);

			$("#autor").append(datos.FILAS[0].autor);
			for(let i = 0; i < datos.FILAS[0].dificultad; i++){
				$("#dificultad").append(circle);
			}

			$("#fecha").attr("datetime", datos.FILAS[0].fecha);
			$("#fecha").append(date.getDate()+"/"+month+"/"+date.getFullYear());
			$("#tiempo").append(datos.FILAS[0].tiempo+" minutos");
			for(let i = 0; i < datos.FILAS[0].comensales; i++){
				$("#comensales").append(dude);
			}
			$("#likes").append(datos.FILAS[0].positivos);
			$("#dislikes").append(datos.FILAS[0].negativos);
			$("#n_comentarios").append(datos.FILAS[0].comentarios);
			

			let elaboracion = datos.FILAS[0].elaboracion;
			let sections = elaboracion.split("<br>");

			for(let i = 0; i < sections.length; i++){
				$("#preparacion").append(sections[i]+"<br><br>");
			}


			getIngredients(datos.FILAS[0].id);
			getComments(datos.FILAS[0].id);


		});
	},function(response){
		console.log("ERROR");
	});
	console.log(id);
}


function getIngredients(id){
	let url_c = 'rest/receta/'+id+'/ingredientes';
	fetch(url_c).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(ingredients){
			if(ingredients.FILAS.length == 0){
				$("#ingredientes").append("No se necesitan ingredientes para esta receta");
			}
			else{
				for(let j=0 ; j<ingredients.FILAS.length ; j++){
					// HACEMOS UNA PETICION DEL FICHERO
					//console.log(ingredients.FILAS[j]);
					let request = new XMLHttpRequest();
					request.open("GET", "includes/ingredient-tag.html", true);
					let node = this;
					request.onreadystatechange = function(oEvent){
						if(request.readyState == 4){
							if(request.status == 200){
								//AQUI SABEMOS QUE EL FICHERO HA CARGADO
								$("#ingredientes").append(request.responseText);
								let fix = $(".ingredient-tag").length-1;
								$(".ingredient-tag")[fix].append(ingredients.FILAS[j].nombre);
							}
						}
					}
					request.send(null);
				}
			}
		});
	});
}


function getComments(id){
	let url_c = 'rest/receta/'+id+'/comentarios'; //rest/receta/i/comentarios
	fetch(url_c).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(comments){
			if(comments.FILAS.length == 0){
				$("#Comentarios").load("includes/no-comments.html");
			}
			else{
				for(let j=0 ; j<comments.FILAS.length ; j++){
					// HACEMOS UNA PETICION DEL FICHERO
					//console.log(comments.FILAS[j]);
					let request = new XMLHttpRequest();
					request.open("GET", "includes/commentRecipe.html", true);
					let node = this;
					request.onreadystatechange = function(oEvent){
						if(request.readyState == 4){
							if(request.status == 200){
								//AQUI SABEMOS QUE EL FICHERO HA CARGADO
								$("#Comentarios").append(request.responseText);
								let fix = $(".commentUsuario").length-1;
								$(".commentUsuario")[fix].append(comments.FILAS[j].autor);
								$(".commentTitulo")[fix].append(comments.FILAS[j].titulo);
								$(".commentMensaje")[fix].append(comments.FILAS[j].texto);

								let date = new Date(comments.FILAS[j].fecha);
								let month = date.getMonth()+1;
								$(".commentFecha")[fix].attr("datetime", comments.FILAS[j].fecha);
								$(".commentFecha")[fix].append(dayList[date.getDay()]+", "+date.getDate()+"/"+month +"/"+ date.getFullYear() + " "+date.getHours()+":"+date.getMinutes() );
							}
						}
					}
					request.send(null);
				}
			}
		});
	});
}

let photo = 0;

function nextPhoto(){
	$(".recipeImg")[photo].addClass("d-none");
	$(".imageFigcaption")[photo].addClass("d-none");
	photo++;
	if(photo > $(".recipeImg").length-1){
		photo = 0;
	}
	$(".recipeImg")[photo].removeClass("d-none");
	$(".imageFigcaption")[photo].removeClass("d-none");
}

function prevPhoto(){
	$(".recipeImg")[photo].addClass("d-none");
	$(".imageFigcaption")[photo].addClass("d-none");
	photo--;
	if(photo < 0){
		photo = $(".recipeImg").length-1;
	}
	$(".recipeImg")[photo].removeClass("d-none");
	$(".imageFigcaption")[photo].removeClass("d-none");
}

function getPhotos(id){
	let url_c = 'rest/receta/'+id+'/fotos';
	fetch(url_c).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(photos){
			if(photos.FILAS.length == 0){
				//$("#Comentarios").load("includes/no-comments.html");
			}
			else{
				if(photos.FILAS.length == 1){
					$("#img_container").attr("style", "height: 452px; object-fit: cover;");
					$("#control_arrows").addClass("d-none");
				}
				for(let j=0 ; j<photos.FILAS.length ; j++){
					// HACEMOS UNA PETICION DEL FICHERO
					console.log(photos.FILAS[j]);
					
					let request = new XMLHttpRequest();
					request.open("GET", "includes/recipeImgCap.html", true);
					let node = this;
					request.onreadystatechange = function(oEvent){
						if(request.readyState == 4){
							if(request.status == 200){
								//AQUI SABEMOS QUE EL FICHERO HA CARGADO
								$("#img_container").append(request.responseText);
								let fix = $(".recipeImg").length-1;
								$(".recipeImg")[fix].attr("style", "background: url('fotos/"+photos.FILAS[j].fichero+"') center; background-size: cover;");
								//$(".recipeImg")[fix].attr("src", "fotos/"+photos.FILAS[j].fichero);
								//$(".recipeImg")[fix].attr("alt", photos.FILAS[j].texto);
								$(".imageFigcaption")[fix].append(photos.FILAS[j].texto);
								if(fix > 0){
									$(".recipeImg")[fix].addClass("d-none");
									$(".imageFigcaption")[fix].addClass("d-none");
								}
							}
						}
					}
					request.send(null);
					
				}
			}
		});
	});
}

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