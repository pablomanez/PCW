ID = getUrlParameter(window.location.href, "id") == null ? null : parseInt(getUrlParameter(window.location.href, "id"));

LIKES = 0;
DISLIKES = 0;

function loadRecipe(){

	if(ID == null)
		window.location.href = "http://localhost/index.html";

	let consulta = "rest/receta/"+ID;
	fetch(consulta).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			if(datos.FILAS.length == 0){
				window.location.href = "http://localhost/404.html";
				console.log("404 NOT FOUND")
			}
			//console.log(datos);
			let emptyCircle = `<i class="far fa-circle"></i>`;
			let circle = `<i class="fas fa-circle mr-1"></i>`;
			let dude = `<i class="fas fa-male mr-1"></i>`;

			let date = new Date(datos.FILAS[0].fecha);
			let month = date.getMonth()+1;
			$("#name").append(datos.FILAS[0].nombre);

			getPhotos(datos.FILAS[0].id);
			$("#enlace_autor").attr("href", "buscar.html?a="+datos.FILAS[0].autor);
			$("#autor").append(datos.FILAS[0].autor);
			if(parseInt(datos.FILAS[0].dificultad) > 6){
				$("#dificultad").append(cicle+"x"+datos.FILAS[0].dificultad);
			}
			else if(parseInt(datos.FILAS[0].dificultad) == 0){
				$("#dificultad").append(emptyCircle);
			}
			else{
				for(let i = 0; i < parseInt(datos.FILAS[0].dificultad); i++){
					$("#dificultad").append(circle);
				}
			}

			$("#fecha").append("<time datetime='"+datos.FILAS[0].fecha+"'>"+date.getDate()+"/"+month+"/"+date.getFullYear() + "</time>");
			$("#tiempo").append(datos.FILAS[0].tiempo+" minutos");
			if(datos.FILAS[0].comensales > 6){
				$("#comensales").append(dude+"x"+datos.FILAS[0].comensales);
			}
			else{

				for(let i = 0; i < datos.FILAS[0].comensales; i++){
					$("#comensales").append(dude);
				}
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

			if(logueado()){
				$("#cuerpo").load("includes/Receta/Botones_like.html");
				$("#formulario_comentario").load("includes/Receta/Formulario_comentario.html");
			}
			else{

				$("#formulario_comentario").load("includes/Receta/Mensaje_comentario_no_logueado.html");
			}
			getComments(datos.FILAS[0].id);


		});
	},function(response){
		console.log("ERROR");
	});
}


function getIngredients(id){
	let request = new XMLHttpRequest();
	request.open("GET", "includes/Receta/Ingrediente.html", true);
	request.onreadystatechange = function(oEvent){
		if(request.readyState == 4){
			if(request.status == 200){


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
								//console.log(ingredients.FILAS[j]);
								$("#ingredientes").append(request.responseText);
								let fix = $(".ingredient-tag").length-1;
								$(".ingredient-tag")[fix].append(ingredients.FILAS[j].nombre);

							}
						}
					});
				});


			}
		}
	}
	request.send(null);
}


function getComments(id){
	let request = new XMLHttpRequest();
	request.open("GET", "includes/Receta/Comentario.html", true);
	let node = this;
	request.onreadystatechange = function(oEvent){
		if(request.readyState == 4){
			if(request.status == 200){
				

				//FICHERO CARGADO
				let url_c = 'rest/receta/'+id+'/comentarios'; //rest/receta/i/comentarios
				fetch(url_c).then(function(response){
					if(!response.ok){
						return false;
					}

					response.json().then(function(comments){
						if(comments.FILAS.length == 0){
							$("#Comentarios").load("includes/Receta/Sin_comentarios.html");
						}
						else{
							for(let j=0 ; j<comments.FILAS.length ; j++){
								//console.log(comments.FILAS[j]);
								
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
					});
				});
			}
		}
	}
	request.send(null);
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
	let request = new XMLHttpRequest();
	request.open("GET", "includes/Receta/Imagen_Descripcion.html", true);
	let node = this;
	request.onreadystatechange = function(oEvent){
		if(request.readyState == 4){
			if(request.status == 200){

				// Petición de las fotos
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
					});
				});




			}
		}
	}
	request.send(null);
}

function like(){

	let user = JSON.parse(sessionStorage['usuario']);
	console.log(user);
	let url = "rest/receta/"+ID+"/voto/1";
	let fd = new FormData();
	fd.append('l', user.login);
	console.log(url);

	let post = { 'method':'post', 'body':fd, 'headers':{'Authorization':user.clave} };

	fetch(url, post).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){

			$("#messageLikes").removeClass("d-none");
			LIKES = LIKES+1;

			if(LIKES > 1)
				$("#contadorLikes").html(" x"+LIKES);

			let consulta = "rest/receta/"+ID;
			fetch(consulta).then(function(response){
				if(!response.ok){
					return false;
				}

				response.json().then(function(datos){
					$("#likes").html(datos.FILAS[0].positivos);
				});

			},function(response){
					console.log("ERROR");
			});

		});

	},function(response){

	});
}

function dislike(){

	let user = JSON.parse(sessionStorage['usuario']);
	let url = "rest/receta/"+ID+"/voto/0";
	let fd = new FormData();
	fd.append('l', user.login);

	let post = { 'method':'post', 'body':fd, 'headers':{'Authorization':user.clave} };

	fetch(url, post).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			

			$("#messageDislikes").removeClass("d-none");
			DISLIKES = DISLIKES+1;

			console.log("DISLIKES "+DISLIKES);
			if(DISLIKES > 1)
				$("#contadorDislikes").html(" x"+DISLIKES);

			// Actualizo la info
			let consulta = "rest/receta/"+ID;
			fetch(consulta).then(function(response){
				if(!response.ok){
					return false;
				}

				response.json().then(function(datos){
					$("#dislikes").html(datos.FILAS[0].negativos);
				});

			},function(response){
					console.log("ERROR");
			});

		});

	},function(response){

	});
}

function destroyLikeMessage(){
	$("#messageLikes").addClass("d-none");
	LIKES = 0;
	$("#contadorLikes").html("");
}

function destroyDislikeMessage(){
	$("#messageDislikes").addClass("d-none");
	DISLIKES = 0;
	$("#contadorDislikes").html("");
}

function comenta(){
	let user = JSON.parse(sessionStorage['usuario']);

	let url = "rest/receta/"+ID+"/comentario";
	let fd = new FormData();
	fd.append('l', user.login);
	fd.append('titulo', $("#formCommentTitulo").val());
	fd.append('texto', $("#formCommentMessage").val());

	let post = { 'method':'post', 'body':fd, 'headers':{'Authorization':user.clave} };

	fetch(url, post).then(function(response){
		if(!response.ok){
			return false;
		}

		response.json().then(function(datos){
			console.log(datos.RESULTADO);
			if(datos.RESULTADO == "OK"){

				muestraPopUpReceta("Mensaje posteado óptimamente.", 1);
				
				// Actualizo la info
				let consulta = "rest/receta/"+ID;
				fetch(consulta).then(function(response2){
					if(!response2.ok){
						return false;
					}

					response2.json().then(function(datos2){
						$("#Comentarios").html("");
						getComments(datos2.FILAS[0].id);
					});

				},function(response2){
						console.log("ERROR");
				});
			}
			else{
				muestraPopUpReceta("Hubo un error al postear el comentario.", 2);
			}

		});

	},function(response){
		console.log("why");
	});
}

function muestraPopUpReceta(msg, type){
	let popap =
	`<div class="bg-dark-t2 w-100 h-100 d-flex align-items-center justify-content-center position-fixed z-100"> 
			<div class="position-relative">
				<div onclick="destroyPopUPType`+type+`();"class="position-absolute t0 r0 bg-darkt-t p-1 div-link pointer h4 text-blood">
					<i class="far fa-times-circle"></i>
				</div>
				<div  class="bg-light d-flex align-items-center justify-content-center box-shadow-light text-center p-3 t-2">
					`+msg+`
				</div>
			</div>
		</div>`;

	$("#popap").html(popap);
}


function destroyPopUPType1(){
	$("#formCommentTitulo").val("");
	$("#formCommentMessage").val("");
	$("#popap").html("");
}

function destroyPopUPType2(){
	$("#formCommentTitulo").focus();
	$("#popap").html("");
}