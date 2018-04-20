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
	let fd = new FormData(frm);
	let url = 'rest/receta/?t=';
	url += fd.get('search_box');
	console.log(url);

	fetch(url).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			console.log(datos);
			//AHORA DEBO TRATAR LA PETICION CON datos.FILAS[]




		});

	},function(response){
		console.log("ERROR");
	});
}

function ultimasSeis(){

	if(window.location.search && window.location.search[window.location.search.length-1]!='#'){
		//LLEVA ARGUMENTOS
		formBuscar();
		return;
	}


	let url = 'rest/receta/?u=6'; //LAS 6 RECETAS MAS RECIENTES
	let div_recetas = document.getElementById("recetas");

	fetch(url).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			//console.log(datos);

			//AHORA DEBO TRATAR LA PETICION CON datos.FILAS[]
			//PARA CADA RECETA QUE HE SACADO TENGO QUE CREAR UN SUPER FIGURE Y AÑADIRLO A div_recetas, SUERTE!

			
			//SACO LAS FOTOS DE CADA RECETA
			for(let i=0 ; i<datos.FILAS.length ; i++){

				/*
				//USUARIO
				<div class="col-12 bg-dark-t text-center my-2">
					<a href="receta.html" class="h2 revers-a">Pollo con chicharrón</a>
					<a href="buscar.html" class="mt-3 d-block revers-a">
						<div style="background-image: url(Images/Shut-up-and-take-my-money!.png);" class="circle bg-orange justify-self-center box-shadow footer-logo bg-image d-flex align-items-end justify-content-center"></div>
						<span>Pablomanez</span>
					</a>
				</div>

				//COMENTARIOS
				<div class="col-12 bg-dark-t m-0 p-2 p-2">
					<span class="text-orange">SLM</span>
					<div class="text-light">Esto en daw no pasaba</div>
				</div>

				//FECHA+LIKES+DISLIKES
				<div class="col-12 bg-dark-t text-center mt-5 mb-2 py-1 text-light">
					<div class="row">
						<div class="col-6 d-flex align-items-center justify-content-center">
							<time datetime="1864-02-28">28/02/1864</time>
						</div>
						<div class="col-6">
							<div class="row text-center">
								<div class="col-2">
									<i class="fas fa-thumbs-up"></i>
								</div>
								<span class="col-10">65491</span>

								<div class="col-3">
									<i class="fas fa-thumbs-down"></i>
								</div>
								<span class="col-9">5</span>
							</div>

						</div>
					</div>
				</div>

				*/

				//USUARIO
				let div_foto_usu = document.createElement('div');
					div_foto_usu.setAttribute("style","background-image: url(Images/Shut-up-and-take-my-money!.png);");
					div_foto_usu.setAttribute("class","circle bg-orange justify-self-center box-shadow footer-logo bg-image d-flex align-items-end justify-content-center");
				
				let span_usu = document.createElement('span');
				//span.createTextNode(datos2.FILAS[0].autor);
				span_usu.appendChild(document.createTextNode(datos.FILAS[i].autor));

				let a_buscar = document.createElement("a");
					a_buscar.setAttribute("href","buscar.html");
					a_buscar.setAttribute("class","mt-3 d-block revers-a");

			a_buscar.appendChild(div_foto_usu);
			a_buscar.appendChild(span_usu);

				let a_receta = document.createElement("a");
					a_receta.setAttribute("href","receta.html");
					a_receta.setAttribute("class","h2 revers-a");
				a_receta.appendChild(document.createTextNode(datos.FILAS[i].nombre));

				let div_usu = document.createElement('div');
					div_usu.setAttribute("class","col-12 bg-dark-t text-center my-2");
			div_usu.appendChild(a_receta);
			div_usu.appendChild(a_buscar);

				let abs_div = document.createElement("div");
					abs_div.setAttribute("style","background-image: url(fotos/"+datos.FILAS[i].fichero+");");
					abs_div.setAttribute("class","pop-up box-shadow bg-image h-search p-2 mh-400px Mw-item-search justify-self-center");

			abs_div.appendChild(div_usu);

				//COMENTARIOS

				let url_c = 'rest/receta/'+datos.FILAS[i].id+'/comentarios'; //rest/receta/i/comentarios
				fetch(url_c).then(function(response){
					if(!response.ok){
						return false;
					}

					response.json().then(function(datos2){
						//console.log(datos2);

						/*
						<div class="col-12 bg-dark-t m-0 p-2 p-2">
							<span class="text-orange">SLM</span>
							<div class="text-light">Esto en daw no pasaba</div>
						</div>
						*/

						let div_c = document.createElement("div");
							div_c.setAttribute("class","col-12 bg-dark-t m-0 p-2 p-2");


						for(let j=0 ; j<datos2.FILAS.length ; j++){

							let div_tit_c = document.createElement("div");
								div_tit_c.setAttribute("class","text-light");

							div_tit_c.appendChild(document.createTextNode(datos2.FILAS[j].texto));

							let span_usu_c = document.createElement("span");
								span_usu_c.setAttribute("class","text-orange");

							span_usu_c.appendChild(document.createTextNode(datos2.FILAS[j].autor));


						div_c.appendChild(span_usu_c);
						div_c.appendChild(div_tit_c);

						}

						abs_div.appendChild(div_c);

						/*
						<div class="col-12 bg-dark-t text-center mt-5 mb-2 py-1 text-light">
							<div class="row">
								<div class="col-6 d-flex align-items-center justify-content-center">
									<time datetime="1864-02-28">28/02/1864</time>
								</div>



								<div class="col-6">
									<div class="row text-center">
										<div class="col-2">
											<i class="fas fa-thumbs-up"></i>
										</div>
										<span class="col-10">65491</span>

										<div class="col-3">
											<i class="fas fa-thumbs-down"></i>
										</div>
										<span class="col-9">5</span>
									</div>

								</div>


							</div>
						</div>
						*/

						//LIKES+DISLIKES
						let i_like = document.createElement("i");
							i_like.setAttribute("class","fas fa-thumbs-up");

						let div_like = document.createElement("div");
							div_like.setAttribute("class","col-2");

					div_like.appendChild(i_like);

						let span_like = document.createElement("span");
							span_like.setAttribute("class","col-10");

					span_like.appendChild(document.createTextNode(datos.FILAS[i].positivos));

						let i_dislike = document.createElement("i");
							i_dislike.setAttribute("class","fas fa-thumbs-up");

						let div_dislike = document.createElement("div");
							div_dislike.setAttribute("class","col-3");

					div_dislike.appendChild(i_dislike);

						let span_dislike = document.createElement("span");
							span_dislike.setAttribute("class","col-9");

					span_dislike.appendChild(document.createTextNode(datos.FILAS[i].negativos));

						let div_opinion = document.createElement("div");
							div_opinion.setAttribute("class","row text-center");

						let div_opinion2 = document.createElement("div");
							div_opinion2.setAttribute("class","col-6");

					div_opinion.appendChild(div_like);
					div_opinion.appendChild(span_like);
					div_opinion.appendChild(div_dislike);
					div_opinion.appendChild(span_dislike);

					div_opinion2.appendChild(div_opinion);

						//FECHA
						let time = document.createElement("time");
							time.setAttribute("datetime",datos.FILAS[i].fecha);

						time.appendChild(document.createTextNode(datos.FILAS[i].fecha));

						let div_time = document.createElement("div");
							div_time.setAttribute("class","col-6 d-flex align-items-center justify-content-center");

					div_time.appendChild(time);

						let div_b1 = document.createElement("div");
							div_b1.setAttribute("class","row");

					div_b1.appendChild(div_time);
					div_b1.appendChild(div_opinion2);

						let div_b2 = document.createElement("div");
							div_b2.setAttribute("class","col-12 bg-dark-t text-center mt-5 mb-2 py-1 text-light");

					div_b2.appendChild(div_b1);

					abs_div.appendChild(div_b2);

						/*
						<figure class="col-12 col-lg-6 col-xl-4 m-0 p-2 d-inline-block">
							<div style="background-image: url(Images/RECETA_1.jpg);" class="pop-up box-shadow bg-image h-search p-2 mh-400px Mw-item-search justify-self-center">
							
								=> USUARIO
								=> COMENTARIOS
								=> FECHA+LIKES+DISLIKES
							
							</div>
						</figure>
						*/


						let figure = document.createElement("figure");
							figure.setAttribute("class","col-12 col-lg-6 col-xl-4 m-0 p-2 d-inline-block");

						figure.appendChild(abs_div);

						div_recetas.appendChild(figure);
						
					});
				},function(response){
					console.log("ERROR");
				});

			} //FOR
		});

	},function(response){
		console.log("ERROR");
	});
}

function formBuscar(frm){
	
	if(frm){
		console.log("HAY FORMULARIO");
	}
	else{
		console.log("NO HAY FORMULARIO");

		let args = window.location.search;
			args = args.substr(1,args.length);
		let aa = args.split("&");

		for(let i=0 ; i<aa.length ; i++){
			console.log(aa[i]);
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
			console.log(datos);

			let circle = `<i class="fas fa-circle mr-1"></i>`;
			let dude = `<i class="fas fa-male mr-1"></i>`;

			let date = new Date(datos.FILAS[0].fecha);
			let month = date.getMonth()+1;
			$("#name").append(datos.FILAS[0].nombre);
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



		/*
			// Comentarios
			let url_c = 'rest/receta/'+datos.FILAS[0].id+'/comentarios'; //rest/receta/i/comentarios
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
	*/

		});
	},function(response){
		console.log("ERROR");
	});
	console.log(id);
}

// Devuelve un elemento dado su id
function $(id){
	let target = document.querySelectorAll(id);
	if(target.length == 1)
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

// Atributos
HTMLElement.prototype.removeClass = function(classname){
	this.classList.remove(classname);
}

NodeList.prototype.removeClass = function(classname){
	this.classList.remove(classname);
}

// Load
HTMLElement.prototype.load = function(url){
	let request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null);

	this.innerHTML += request.responseText;
}

NodeList.prototype.load = function(url){
	let request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null);

	this.innerHTML += request.responseText;
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