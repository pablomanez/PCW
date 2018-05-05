var url_paginacion = "";
var num_paginacion = "1/1";

function muestraPopap(msg,url,elim){
	//SI ELIM ES TRUE: SE ELIMINA EL POPUP
	let div = document.getElementById("popap");
	let popap;

	if(!elim){
		popap =
		`<div class="bg-dark-t2 w-100 h-100 d-flex align-items-center justify-content-center position-fixed z-100 text-center" id="EL_POPAP">
			<div style="width: 300px; height: 200px;" class="position-relative bg-light d-flex align-items-center justify-content-center box-shadow-light">
				`+msg+`
				<a href="`+url+`"><span class="position-absolute pointer t0 r0 m-2 text-blood h3 z-2"><i class="far fa-times-circle"></i></span></a>
			</div>
		</div>`;
	}
	else{
		popap =
		`<div class="bg-dark-t2 w-100 h-100 d-flex align-items-center justify-content-center position-fixed z-100 text-center" id="EL_POPAP">
			<div style="width: 300px; height: 200px;" class="position-relative bg-light d-flex align-items-center justify-content-center box-shadow-light">
				`+msg+`
				<span class="position-absolute pointer t0 r0 m-2 text-blood h3 z-2" onclick="eliminaPopap();"><i class="far fa-times-circle"></i></span>
			</div>
		</div>`;
	}

	div.innerHTML = popap;
}

function eliminaPopap(){
	let popap = document.getElementById("EL_POPAP");
	popap.parentNode.removeChild(popap);
}

function ingrediente_masmas() {
	//AÑADE UN INGREDIENTE MAS A LA LISTA DE NUEVA RECETA

	let j = 0;
	while(true){
		if(!document.getElementById("i_"+j)){
			break
		}
		j++;
	}

	let ingr = document.getElementById("new_ingredient").value; //EL INGREDIENTE
	let list = document.getElementById("l_ingr"); 				//LA LISTA
	let li = document.createElement("li");						//CREO EL LI
	let span = document.createElement("span");					//CREO EL SPAN
	let textnode = document.createTextNode(ingr);				//DOY VALOR AL SPAN
	
	span.appendChild(textnode);									//<span>Chirimoya</span>
	span.setAttribute("class","text-dark");						//<span class="text-dark">Chirimoya</span>
	li.setAttribute("class","bg-orange p-2 mb-1");				//<li class="bg-orange p-2 mb-1"><span class="text-dark">Chirimoya</span></li>
	li.setAttribute("id","i_"+j);
			
	//<span class="position-absolute pointer t0 r0 m-2 text-blood h3 z-2" onclick="borraFoto(id)"><i class="fas fa-times"></i></span>
	let i = document.createElement("i");
	i.setAttribute("class","fas fa-times");

	let span2 = document.createElement("span");
	span2.setAttribute("class","pointer t0 r0 m-2 text-blood h3 z-2");
	span2.setAttribute("id","bi_"+j);
	span2.setAttribute("onclick","borraIngrediente(id)");
	//span.onclick = "";

	span2.appendChild(i);
	li.appendChild(span2);
	li.appendChild(span);										//<li><span class="text-dark">Chirimoya</span></li>


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
				div.setAttribute("class","div_supremo_fotos");

				div.getElementsByTagName("span")[0].id = "b_"+i;
				div.getElementsByTagName("input")[0].id = "l_input_foto_"+i;
				div.getElementsByTagName("label")[0].setAttribute("for","l_input_foto_"+i);

				//console.log(div.getElementsByTagName("input")[0]);
				document.getElementById("l_fotos").appendChild(div);
			}
		}
	}
	request.send(null);
}

function borraIngrediente(id){
	//id = bi_0
	id = id.substring(3);
	//console.log(id);

	let ingr = document.getElementById("i_"+id);

	ingr.parentNode.removeChild(ingr);
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

function muestraFoto(input){
	if(input && input.files[0].size < 300000){
		let imgNode = input.nextElementSibling.nextElementSibling;
		imgNode = imgNode.getElementsByTagName("img")[0];
		imgNode.attr("src", URL.createObjectURL(input.files[0]));
	}
	else{
		muestraPopap("La fotos supera el tamaño máximo de 300kb","#",true);
	}
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

	/*
	for(var pair of fd.entries()) {
	   console.log(pair[0]+ ', '+ pair[1]); 
	}
	*/

	//COMPRUEBO SI HAY FOTOS PARA SUBIR
	let b_fotos = true;
	let div_fotos = document.getElementById('l_fotos').getElementsByTagName('textarea');
	let input_fotos = document.getElementById('l_fotos').getElementsByTagName('input');
	//let div_fotos = document.getElementById('l_fotos').getElementsByClassName("div_supremo_fotos");

	if(div_fotos.length == 0 || input_fotos.length == 0){
		b_fotos = false;
	}

	if(b_fotos){
		let init = { 'method':'post', 'body':fd, 'headers':{'Authorization':usu.clave} };

		fetch(url,init).then(function(response){
			if(!response.ok){
				return false;
			}

			response.json().then(function(datos){
				//console.log(datos);
				//SE HAN SUBIDO LOS DATOS DE LA RECETA CORRECTAMENTE

				//datos.ID -> ID DE LA RECETA
				let id_receta = datos.ID;
				let fd2 = new FormData();
				let list = document.getElementById('l_ingr').getElementsByTagName("li");
				let ingr = '[';

				//VECTOR DE INGREDIENTES EN FORMATO JSON ["ingr1","ingr2",...]

				for(let i=0 ; i<list.length ; i++){
					let node = list[i].getElementsByTagName("span")[1].innerText;
					//ingr.push(list[i].getElementsByTagName("span")[1].innerText);
					
					i==0? ingr += '"'+node+'"' : ingr += ',"'+node+'"';
				}
				ingr += ']';
				//console.log(ingr);

				fd2.append('l',usu.login);
				fd2.append("i",ingr);

				let url2 = 'rest/receta/'+id_receta+'/ingredientes';
				let init2 = { 'method':'post', 'body':fd2, 'headers':{'Authorization':usu.clave} };

				fetch(url2,init2).then(function(response){
					if(!response.ok){
						return false;
					}

					response.json().then(function(datos){
						console.log(datos);
						//SE HAN SUBIDO LOS INGREDIENTES CORRECTAMENTE

						for(let i=0 ; i<div_fotos.length && b_fotos ; i++){
							let fd3 = new FormData();
							let url3 = 'rest/receta/'+id_receta+'/foto';

							fd3.append("l",usu.login);
							fd3.append("t",div_fotos[i].value);
							fd3.append("f",input_fotos[i].files[0]);

							for(var pair of fd3.entries()) {
							   console.log(pair[0]+ ', '+ pair[1]);
							}
							
							let init3 = { 'method':'post', 'body':fd3, 'headers':{'Authorization':usu.clave} };
							fetch(url3,init3).then(function(response){
								if(!response.ok){
									//console.log(response.code);
									return false;

								}

								response.json().then(function(datos){
									console.log(datos);
									//SE HA SUBIDO LA FOTO CORRECTAMENTE

								});

							},function(response){
								console.log("error");
								b_fotos = false;
							});//FETCH DE LAS FOTOS


						}//FOR

						//SE HA SUBIDO TODO CORRECTAMENTE
						muestraPopap("La receta "+name+" se ha creado óptimamente","index.html",false);

					});

				},function(response){
					console.log("error");
				});//FETCH DE LOS INGREDIENTES

			});

		},function(response){
			console.log("error");
		});//FETCH DE LOS DATOS
	}
	else{
		muestraPopap("No has introducido ninguna foto para la receta","#",true);
	}

	return false;
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
			
		}

	};
	xhr.setRequestheader('Authorization',clave);
	xhr.send(fd);
}

//TRUE: LOGUEADO
function logueado(){
	let usu = sessionStorage.getItem('usuario');

	if(!usu){
		//console.log("Ste men que no está logueado");

		return false;
	}
	else{
		//console.log("Así me gusta, logueado, siguiendo los pasos del gran E");

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
	url += fd.get('t');
	url += '&pag=0&lpag=6';
	console.log("URL DE BÚSQUEDA SIMPLE: " + url);

	buscarRecetas(url);
	updatePags();
	//return false;
}

function ultimasSeis(){
	//console.log("ultimasSeis()");

	let url = 'rest/receta/?u=6'; //LAS 6 RECETAS MAS RECIENTES+
	if(window.location.search && window.location.search[window.location.search.length-1]!='#'){
		url = 'rest/receta/'+window.location.search+'&pag=0&lpag=6';
	}

	buscarRecetas(url);
	updatePags();
}

function buscarRecetas(url){
	console.log("buscarRecetas("+url+")");
	//PASAS UNA PETICION COMO url
	//PARA LA PÁGINA buscar.html
	// res/receta/?a=usuario2&pag=0&lpag=6
	// res/receta/?a=usuario2&pag=0&lpag=6
	
	//console.log("CAMBIANDO URL DE PAGINACION");
	url_paginacion = url.split("&l")[0];
	//console.log("url_paginacion: "+url_paginacion);
	let resultado = false;

	fetch(url).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			//console.log(datos);

			//AHORA DEBO TRATAR LA PETICION CON datos.FILAS[]
			let request = new XMLHttpRequest();
			request.open("GET", "includes/newsearch_recipe.html", true);
			let node = this;
			request.onreadystatechange = function(oEvent){	
				if(request.readyState == 4){
					if(request.status == 200){
			
						//SACO LAS FOTOS DE CADA RECETA
						for(let i=0 ; i<datos.FILAS.length ; i++){
							resultado = true;
							//PETIÇAO DEL FICHERO
							
								//console.log(datos.FILAS[i]);
								$("#recetas").innerHTML += request.responseText;
								$(".receta_title")[i].append(datos.FILAS[i].nombre);
								$(".receta_autor")[i].append(datos.FILAS[i].autor);
								$(".receta_fecha")[i].append(datos.FILAS[i].fecha);
								$(".receta_pos")[i].append(datos.FILAS[i].positivos);
								$(".receta_neg")[i].append(datos.FILAS[i].negativos);
								//style="background-image: url(Images/RECETA_1.jpg);"
								$(".receta_fecha")[i].attr("datetime",datos.FILAS[i].fecha);
								$(".receta_img")[i].attr("style","background-image: url(fotos/"+datos.FILAS[i].fichero+");");
								$(".receta_title")[i].attr("href","receta.html?id="+datos.FILAS[i].id);
								$(".autor_href")[i].attr("href","buscar.html?a="+datos.FILAS[i].autor);

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


						} //FOR
						if(!resultado){
							muestraPopap("No se han encontrado resultados de la búsqueda realizada","buscar.html",false);
						}
					}
				}
			}
			request.send(null);


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
		//document.location.href = "http://localhost/buscar.html";

		console.log("HAY FORMULARIO");
		let id = []; //ARRAY DE LOS ID DE LAS RECETAS
		let vacion = true;
		let url = 'rest/receta/?';
		let fd = new FormData(frm);
		//console.log(fd);
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
		console.log(url);
		
		buscarRecetas(url);
		updatePags();
			
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
	console.log("Actualizo la paginacion con: "+url_paginacion);
	
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

function hacerLogin(frm){
	let url = "rest/login/";
	let fd = new FormData(frm);

	//console.log("ME LOGUEO");
	console.log(fd.get("login"));
	console.log(fd.get("pwd"));
	//fd.append('login',);
	//fd.append('pwd',);

	fetch(url,{'method':'POST','body':fd}).then(function(response){
		if(!response.ok){
			muestraPopap("Login incorrecto","#",true);
			return false;
		}

		response.json().then(function(datos){
			console.log(datos);
			sessionStorage.setItem('usuario',JSON.stringify(datos));

			//window.location.replace("http://localhost/index.html");

			muestraPopap("Bienvenido de nuevo "+fd.get("login")+" a The Lemon. Adelante, comienza a cocinar","index.html",false);
		});

	},function(response){

	});
	return false;
}








//EJEMPLO PROFESOR
//hacerLogin() es funcional
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


