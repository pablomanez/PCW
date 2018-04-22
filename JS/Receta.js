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
				window.location.href = "http://localhost/404.html";
				console.log("404 NOT FOUND")
			}
			//console.log(datos);

			let circle = `<i class="fas fa-circle mr-1"></i>`;
			let dude = `<i class="fas fa-male mr-1"></i>`;

			let date = new Date(datos.FILAS[0].fecha);
			let month = date.getMonth()+1;
			$("#name").append(datos.FILAS[0].nombre);

			getPhotos(datos.FILAS[0].id);

			$("#enlace_autor").attr("href", "buscar.html?a="+datos.FILAS[0].autor);
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

			if(!logueado()){
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
	console.log(id);
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
