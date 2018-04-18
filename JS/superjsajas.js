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
	let url = 'rest/receta/?u=6'; //LAS 6 RECETAS MAS RECIENTES
	let div_recetas = document.getElementById("recetas");

	fetch(url).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			console.log(datos);
			//AHORA DEBO TRATAR LA PETICION CON datos.FILAS[]
			//PARA CADA RECETA QUE HE SACADO TENGO QUE CREAR UN SUPER FIGURE Y AÑADIRLO A div_recetas, SUERTE!

			
			//SACO LAS FOTOS DE CADA RECETA
			for(let i=0 ; i<1 ; i++){

				//PARA CONSEGUIR EL USUARIO QUE HA HECHO LA RECETA DEBO DE SACAR TODA LA INFORMACIÓN DE LA RECETA, :clap:
				let url_r = 'rest/receta/'+datos.FILAS[i].id; //rest/receta/i
				fetch(url_r).then(function(response){
					if(!response.ok){
						return false;
					}

					response.json().then(function(datos2){
						console.log(datos);
						/*
						<a href="receta.html" class="h2 revers-a">Pollo con chicharrón</a>
						<a href="buscar.html" class="mt-3 d-block revers-a">
							<div style="background-image: url(Images/Shut-up-and-take-my-money!.png);" class="circle bg-orange justify-self-center box-shadow footer-logo bg-image d-flex align-items-end justify-content-center"></div>
							<span>Pablomanez</span>
						</a>
						*/

						let div_foto_usu = document.createElement('div');
						div_foto_usu.setAttribute("style","background-image: url(Images/Shut-up-and-take-my-money!.png);");
						div_foto_usu.setAttribute("class","circle bg-orange justify-self-center box-shadow footer-logo bg-image d-flex align-items-end justify-content-center");
						
						let span_usu = document.createElement('span');
						span.createTextNode(datos2.FILAS[0].autor);

						let a_buscar = document.createElement("a");










						/*
						let url_f = 'rest/receta/'+datos.FILAS[i].id+'/fotos';
						fetch(url_f).then(function(response){
							if(!response.ok){
								return false;
							}

							response.json().then(function(datos){
								console.log(datos);



								
							});
						},function(response){
							console.log("ERROR");
						});
						*/


						
					});
				},function(response){
					console.log("ERROR");
				});



				
			}
		});

	},function(response){
		console.log("ERROR");
	});




	console.log("hola");
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