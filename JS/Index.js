function indexLastSix(){
	// Cargo el archivo que contiene la estructura de un bloque de receta
	let figure = new XMLHttpRequest();
	figure.open("GET", "includes/Index/Figure_receta.html", true);
	figure.onreadystatechange = function(oEvent){
		if(figure.readyState == 4){
			if(figure.status == 200){
				//Fichero bloque cargado
				let bloque = figure.responseText;

				// Cargo el fichero que contiene los comentarios
				let comentario = new XMLHttpRequest();
				comentario.open("GET", "includes/Index/Figure_comentario.html", true);
				comentario.onreadystatechange = function(oEvent){
					if(comentario.readyState == 4){
						if(comentario.status == 200){
							// Fichero bloque de comentario cargado
							let bloqueComentario = comentario.responseText;

							// Peticion de las 6 últimas recetas
							let url = 'rest/receta/?u=6';
							fetch(url).then(function(response){
								if(!response.ok){
									return false;
								}
								response.json().then(function(datos){
									console.log(datos);
									
									for(let i=0 ; i<datos.FILAS.length; i++){

										let date = new Date(datos.FILAS[i].fecha);
										let month = date.getMonth()+1;


										$("#recipes").append(bloque);
										let last = $(".THE_FIGURE").length-1;
										let actual_node = $(".THE_FIGURE")[last];

										actual_node.$(".index-img")[0].attr("src", "fotos/"+datos.FILAS[i].fichero);
										actual_node.$(".index-img")[0].attr("alt", datos.FILAS[i].nombre);
										actual_node.$(".enlace")[0].attr("href", "receta.html?id="+datos.FILAS[i].id);
										actual_node.$(".titulo")[0].append(datos.FILAS[i].nombre);
										actual_node.$(".autor")[0].append(datos.FILAS[i].autor);
										actual_node.$(".fecha")[0].attr("datetime", datos.FILAS[i].fecha);
										actual_node.$(".fecha")[0].append(date.getDate()+"/"+month +"/"+ date.getFullYear());
										actual_node.$(".likes")[0].append(datos.FILAS[i].positivos);
										actual_node.$(".dislikes")[0].append(datos.FILAS[i].negativos);

							
										// Petición de comentario
										let url_c = 'rest/receta/'+datos.FILAS[i].id+'/comentarios';
										fetch(url_c).then(function(response){
											if(!response.ok){
												return false;
											}
											response.json().then(function(comments){
												console.log(comments.FILAS);
												for(let j=0 ; j < Math.min(1, comments.FILAS.length) ; j++){
													$(".comment_tab")[i].append(bloqueComentario);
													let lastC = $(".THE_FIGURE")[i].$(".THE_COMMENT").length-1;
													let comment_node = $(".THE_FIGURE")[i].$(".THE_COMMENT")[lastC];
													comment_node.$(".commentNombre")[0].append(comments.FILAS[j].autor);
													comment_node.$(".commentTitulo")[0].append(comments.FILAS[j].titulo);
													comment_node.$(".commentMensaje")[0].append(comments.FILAS[j].texto);
												}
											});
										});
										// ==================


									}

								});

							},function(response){
								console.log("ERROR");
							});
						}	// IF 200 OK
					}	// IF READY STATE
				}
				comentario.send(null);
			}
		}
	}
	figure.send(null);
}