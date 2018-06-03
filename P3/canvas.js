var easterEgg = false;

const _ANCHO = 360;
const _ALTO = 240;

var ncols = -1;
var nrows = -1;

var imgCargada = false;

var click = false;
var marcadorClick = {
	'x' : -1,
	'y' : -1
}
var ratonFuera = false;

// PIEZAS ALMACENA LA POSICION Y LAS DIMENSIONES
// DE TODOS LOS CUADROS DEL PUZZLE
// PARA DESPUES INVOCAR EL getImageData(...) 
var piezas = [];

var readyToChange = -1;
var TIMER;
var elapsedSeconds = 0;

var SEACEPTANFOTOS = true;
var aiudando = false;

var MOVIMIENTOS = 0;
var DESORDENADAS = 0;

var STATE;

function getCTX(query){
	let cv = document.querySelector(query);

	return cv.getContext('2d');
}

function getCV(query){
	return document.querySelector(query);
}

function escribeTextoInicial(){
	//TEXTO DEL C1
	let ctx1 = getCTX('#c1');

	ctx1.shadowBlur = 0;
	ctx1.fillStyle = '#F4F4F4';
	ctx1.font = '20px Arial'; //COMO EN CSS
	ctx1.textAlign = "center";
	
	ctx1.fillText("Haz click o arrastra una imagen aquí",_ANCHO/2,_ALTO/2+10);
}

function prepararCanvases(){
	let cvs = document.querySelectorAll("canvas");
	let ctx1 = getCTX('#c1');

	cvs.forEach(function(e){
		e.width 	= _ANCHO;
		e.height 	= _ALTO;
	});
	
	escribeTextoInicial();
	saveState();

	//derrapa&dropea
	let c1 = document.querySelector('#c1');
	c1.ondragover = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;
		console.log("DERRAPANDO");
	};

	c1.ondragenter = function(e){


		if(imgCargada)
			ctx1.globalAlpha = 0.83;
		
		ctx1.fillStyle = '#00af95';
		ctx1.fillRect(0,0,_ANCHO,_ALTO);

		ctx1.shadowOffsetX = 0;
		ctx1.shadowOffsetY = 0;
		ctx1.shadowBlur = 20;
		ctx1.shadowColor = "#000";

		ctx1.shadowBlur = 0;
		ctx1.fillStyle = '#F4F4F4';
		ctx1.font = '20px Arial'; //COMO EN CSS
		ctx1.textAlign = "center";
		
		ctx1.fillText("DROP IT!",_ANCHO/2,_ALTO/2+10);
		ctx1.globalAlpha = 1.0;
	};

	c1.ondragleave = function(e){
		//c1.width = c1.width;
		//escribeTextoInicial();
		restoreState();
	};

	c1.ondrop = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;	
		if(SEACEPTANFOTOS){

			let fichero = e.dataTransfer.files[0];
			let fr = new FileReader();

			fr.onload = function(){
				let img = new Image();
				img.onload = function(){
					ctx1.clearRect(0, 0, _ANCHO, _ALTO);
					let ctx = c1.getContext('2d');
					ctx.drawImage(img,0,0,c1.width,c1.height);
					imgCargada = true;

					copiarCanvas();	//CARGA DE FORMA ASÍNCRONA ÓPTIMA :ok_hand:
					saveState();
				};
				img.src = fr.result;
			};
			fr.readAsDataURL(fichero);
			$("input[type=file]").val("fichero");
		}
	};

	let cv1 = getCV("#c1");
	let cv2 = getCV("#c2");


	$("#c2").onmouseover = function(e){
		if(aiudando){
			dibujaPiezas();
			aiudando = false;
		}
	};

	$("#c2").onclick = function(e){
		if(!SEACEPTANFOTOS){
			let [row,col] = sacarFilaColumna(e);
			//Debug
			//document.querySelector('#posXY').innerHTML = `(${row},${col})`;
			if(readyToChange == -1){
				readyToChange = row*ncols + col;
			}
			else if (piezas[readyToChange].id != piezas[row*ncols + col].id){
				let aux = piezas[readyToChange];
				piezas[readyToChange] = piezas[row*ncols + col];
				piezas[row*ncols + col] = aux;
				readyToChange = -1;

				++MOVIMIENTOS;
				$("#MOVIMIENTOS").html(MOVIMIENTOS);
			}

			let WINNER = checkWin();
			if(WINNER == true){
				endo(true);
			}

			dibujaPiezas();
			actualizaMarcadorClick(e);
			console.log(MOVIMIENTOS);
		}
	};
	

	cv2.onmousemove = function(e){
		if(!SEACEPTANFOTOS){
			muestraMarcador(e);
		}
	};

	cv2.onmouseleave = function(e){
		if(!SEACEPTANFOTOS){
			ratonFuera = true;
			muestraMarcador(e);			
		}
	};

	cv2.onmouseenter = function(e){
		if(!SEACEPTANFOTOS){
			ratonFuera = false;
			muestraMarcador(e);
		}
	};

	let body = document.getElementsByTagName('body');

	body[0].onkeyup = function(e){
		if(e.key == 'e'){
			easterEgg? easterEgg = false : easterEgg = true;
		}
	}
}

function actualizaMarcadorClick(e){
	if(!click){
		click = true;
		let [row,col] = sacarFilaColumna(e);
		
		marcadorClick.x = row;
		marcadorClick.y = col;

		//console.log(marcadorClick);
		//console.log('Primer click');
	}
	else{
		click = false;
		//console.log('Segundo click');
	}
}

function muestraMarcador(e){
	let cv1 = getCV("#c1");
	let cv2 = getCV("#c2");

	let dim = e.target.width / ncols;
	if(ncols != -1){
		let [row,col] = sacarFilaColumna(e);
		let ctx2 = cv2.getContext('2d');

		//document.querySelector('#posXY').innerHTML = `(${x},${y})`;

		/*
		if(!cv02.getAttribute('data-FC')){
			let FC = {'col':col,'row':row};
			cv02.setAttribute('data-FC',JSON.stringify(FC));
		}
		else{
			let FC = JSON.parse(cv02.getAttribute('data-FC'));
			if(FC.row == row && FC.col = col){
				return;
			}
		}#005e50
		*/
		cv2.width = cv2.width;

		let img = new Image();
		img.src = 'Images/BITCONNEEEEECT.png';
		dibujaPiezas();

		if(!ratonFuera){
			if(!easterEgg){
				ctx2.globalAlpha = 0.6;
				ctx2.fillStyle = document.querySelector("#color").value;
				ctx2.fillRect(col*dim,row*dim,dim,dim);
				ctx2.globalAlpha = 1.0;
			}
			else{
				ctx2.drawImage(img,col*dim,row*dim,dim,dim);
			}
		}

		if(click){
			if(!easterEgg){
				let mx = marcadorClick.x;
				let my = marcadorClick.y;

				ctx2.globalAlpha = 0.6;
				ctx2.fillStyle = document.querySelector("#color").value;
				ctx2.fillRect(my*dim,mx*dim,dim,dim);
				ctx2.globalAlpha = 1.0;
			}
			else{
				ctx2.drawImage(img,marcadorClick.y*dim,marcadorClick.x*dim,dim,dim);
			}
			console.log('Dibujaaaaaaaaaaaaaaaaaaaa');
		}

		dibujarLineas()
	}
}

//FUNCION PRINCIPAL
function copiarCanvas(){
	if(imgCargada){
		let query = '#c1';
			let cv1 = getCV(query);
			let ctx1 = getCTX(query);

		query = '#c2';
		let cv2 = getCV(query);
		let ctx2 = getCTX(query);


		let imgData = ctx1.getImageData(0,0,cv1.width,cv1.height);

		ctx2.putImageData(imgData,0,0);

		//CREO LAS LINEAS
		dibujarLineas();
		creaArrayPiezas();
		$("#buttonStarto").removeAttr("disabled");
		$("#buttonStarto").addClass("pointer");
	}
}

function dibujarLineas(){
	if(imgCargada){
		let query = '#c2';
		let cv = getCV(query);
		let ctx = getCTX(query);

		let diff = document.querySelector("#diff");
		if(diff.value == 0){
			nrows = 4;
			ncols = 6;
		}
		else if(diff.value == 1){
			nrows = 6;
			ncols = 9;	
		}
		else if(diff.value == 2){
			nrows = 8;
			ncols = 12;
		}
		else{
			nrows = 4;
			ncols = 3;
		}

		let dimx = cv.width/ncols;
		let dimy = cv.height/nrows;

		ctx.beginPath();
		ctx.strokeStyle = document.querySelector("#color").value;
		ctx.lineWidth = 2;

		for(let i=0 ; i<nrows ; i++){
			ctx.moveTo(0, i*dimx);
			ctx.lineTo(cv.width, i*dimx);
		}
		
		for(let i=0 ; i<ncols ; i++){
			ctx.moveTo(i*dimy, 0);
			ctx.lineTo(i*dimy, cv.height);
		}

		ctx.rect(0,0,cv.width,cv.height);
		ctx.stroke();
	}
}

function cargaImg(input){
	if(SEACEPTANFOTOS){

		let query = '#c1';
			let cv = getCV(query);
			let ctx = getCTX(query);

		let img = new Image();

		img.onload = function(){
			//PROBAR CON LOCALHOST
			ctx.drawImage(img,0,0,c1.width,c1.height);

			imgCargada = true;

			copiarCanvas();
		};
		img.src = URL.createObjectURL(input.files[0]);

	}
	//console.log(input.files[0]);
}

//SE LLAMA DESDE COPIARCANVAS
function creaArrayPiezas(){
	let query = '#c1';
	let cv1 = getCV(query);
	let ctx1 = getCTX(query);

	piezas = [];

	let pieza;

	let x = cv1.width/ncols;
	let y = cv1.height/nrows;

	console.log(ncols+' , '+nrows);

	let target = 0;
	//FILAS > COLUMNAS
	for(let i=0 ; i<nrows; i++){
		for(let j=0 ; j<ncols ; j++){
			//imgData = ctx1.getImageData(x*j,y*i,x,y);
			console.log()
			pieza ={
				'id': target,
				'imgData': [x*j,y*i,x,y]
			}
			piezas.push(pieza);
			++target;
		}
	}

	console.log(piezas);
}

function comiensaElPusle(){
	if(imgCargada){
		console.log("Se ha cargado una imagen y puedes empezar");
		SEACEPTANFOTOS = false;
		deshordena();
		dibujaPiezas();

		$("#c1").removeClass("pointer");
		$("#c2").addClass("pointer");

		$("main").attr("style", "margin-top: 0;");

		setTimeout(function() {

			$("#timer > div:first-child").attr("style", "margin-top: 0;");

			let marcadores = $("#marcador > div > div");
			for(let i = 0; i < marcadores.length; ++i)
				marcadores[i].attr("style", "margin-top: 0;");

		}, 500);

		$("#buttonStarto").attr("disabled","true");
		$("#buttonStarto").removeClass("pointer");
		$("#buttonEndo").removeAttr("disabled");
		$("#buttonEndo").addClass("pointer");
		$("#Aiuuuudame").removeAttr("disabled");
		$("#Aiuuuudame").addClass("pointer");
		$("input[type=file]").attr("disabled","true");
		$("input[type=color]").attr("disabled","true");
		$("select").attr("disabled","true");

		timea();
	}
	else{
		console.log("Como no cargues una imagen, golpe de remo");
	}
}

function deshordena(){
	let min = 0;
	let max = (ncols*nrows)-1;

	let aux = -1;
	let aux2 = -1;
	for(let i=0 ; i<=max ; i++){
		aux = getRandom(min,max);

		while(aux2==-1 || aux2==aux){
			aux2 = getRandom(min,max);
		}

		//AUX Y AUX2 SIEMPRE VAN A SER DISTINTOS
		let p_aux = piezas[aux];
		piezas[aux] = piezas[aux2];
		piezas[aux2] = p_aux;

		aux = -1;
		aux2 = -1;
	}

	checkWin();
	//console.log(piezas);
	//console.log(solucion);
}

//DEVUELVE UN NUMERO RANDOM ENTRE min Y max INCLUIDOS
function getRandom(min,max){
	return Math.floor((Math.random() * (max+1)) + min);
}

//DIBUJA LAS PIEZAS UNA VEZ HA EMPEZADO EL JUEGO
//EL ARRAY PIEZAS ESTA YA DESORDENADO
function dibujaPiezas(){
	let query = '#c1';
	let cv1 = getCV(query);
	let ctx1 = getCTX(query);
	
	query = '#c2';
	let cv2 = getCV(query);
	let ctx2 = getCTX(query);

	let imgData;
	let x = cv1.width/ncols;
	let y = cv1.height/nrows;
	let k = 0;

	for(let i=0 ; i<nrows ; i++){
		for(let j=0 ; j<ncols ; j++){
			let xp = piezas[k].imgData[0];
			let yp = piezas[k].imgData[1];
			let w = piezas[k].imgData[2];
			let h = piezas[k].imgData[3];
			
			imgData = ctx1.getImageData(xp,yp,w,h);
			ctx2.putImageData(imgData,x*j,y*i);

			k++;


		}
	}

	dibujarLineas();
}


function sacarFilaColumna(e){
	let x = e.offsetX;	
	let y = e.offsetY;
	let dimX = e.target.width / ncols;
	let dimY = e.target.height / nrows;

	let col = Math.floor(x / dimX);
	let row = Math.floor(y / dimY);

	if(col < 0)
		col = 0;
	else if(col > ncols-1)
		col = ncols-1;

	if(row < 0)
		row = 0;
	else if(row > nrows-1)
		row = nrows-1;

	return [row,col];
}


function timea() {
	TIMER = setInterval(function(){
		let ZeroS = "";
		let ZeroM = "";

		elapsedSeconds++;

		$("#seconds").html(elapsedSeconds);
	}, 1000);
}

function stopTimer(){
	clearInterval(TIMER);
	elapsedSeconds = 0;
}

function aiuda(){
	if(!aiudando){

		aiudando = true;
		let k = 0;
		let ctx = $("#c2").getContext('2d');
		for(let i = 0; i < nrows; ++i){
			for(let j = 0; j < ncols; ++j){

				if(piezas[k].id != k){
				
					let xp = piezas[k].imgData[0];
					let yp = piezas[k].imgData[1];
					let w = piezas[k].imgData[2];
					let h = piezas[k].imgData[3];
					ctx.globalAlpha = 0.6;
					ctx.fillStyle = "#ff8800";
					ctx.fillRect(xp,yp,w,h);
					ctx.globalAlpha = 1.0;
					dibujarLineas();
				}
				else{
					let xp = piezas[k].imgData[0];
					let yp = piezas[k].imgData[1];
					let w = piezas[k].imgData[2];
					let h = piezas[k].imgData[3];
					ctx.globalAlpha = 0.4;
					ctx.fillStyle = "#00ddbc";
					ctx.fillRect(xp,yp,w,h);
					ctx.globalAlpha = 1.0;
					dibujarLineas();
				}
				++k;
			}
		}
	}
}

function endo(flag){

	let color = "background: #930000;";
	let title = "Derrota";
	let k = 0;

	let message = "Has dejado "+DESORDENADAS+" piezas por colocar bien después de "+MOVIMIENTOS+" movimientos y has empleado "+elapsedSeconds+" segundos.";
	$("#Again").removeClass("again_green");
	$("#Again").addClass("again_red");

	if(flag){
		color = "background: #008470;";
		title = "Victoria";
		message = "¡¡¡Enhorabuena!!! Has montado el puzzle en "+MOVIMIENTOS+" movimientos y "+elapsedSeconds+" segundos.";
		$("#Again").removeClass("again_red");
		$("#Again").addClass("again_green");
	}

	stopTimer();
	$("#overlap-left").attr("style", color);
	$("#overlap-left").removeClass("w-0");
	$("#overlap-left").addClass("w-50");
	$("#overlap-right").attr("style", color);
	$("#overlap-right").removeClass("w-0");
	$("#overlap-right").addClass("w-50");

	setTimeout(function() {
	    $("#endMessageArea").removeClass("d-none");
	}, 250);
	setTimeout(function() {
		$("#title").html(title);
	    $("#title").attr("style", "font-size: 150px; color: rgba(255,255,255,1);");
	    $("#container").addClass("d-none");
	}, 750);
	setTimeout(function() {
		$("#infoEnd").html(message);
	    $("#infoEnd").attr("style", "color: rgba(255,255,255,1);");
	    let spans = $("#endMessageArea #infoEnd span");
	    for(let i = 0; i < spans.length; ++i)
	    	$("#endMessageArea #infoEnd span")[i].attr("style", "color: orange;");
	}, 1250);
	setTimeout(function() {
		
	    $("#Again").attr("style", "color: rgba(255,255,255,1); opacity: 1;");
	    $("#endMessageArea #Again img").attr("style", "opacity: 1;");
	}, 1750);
	
}

function checkWin(){
	let winner = true;
	let k = 0;
	DESORDENADAS = 0;
	for(let i = 0; i < nrows; ++i){
		for(let j = 0; j < ncols; ++j){

			if(piezas[k].id != k){
				DESORDENADAS++;
				winner = false;
			}
			++k;
		}
	}
	$("#DESORDENADAS").html(DESORDENADAS);
	return winner;
}


function reset(){
	let ctx1 = $("#c1").getContext('2d');
	let ctx2 = $("#c2").getContext('2d');

	ctx1.clearRect(0, 0, _ANCHO, _ALTO);
	ctx2.clearRect(0, 0, _ANCHO, _ALTO);
    escribeTextoInicial();
	saveState();

	$("#c1").addClass("pointer");
	$("#c2").removeClass("pointer");

	$("#timer > div").attr("style", "margin-top: -300px;");
	$("#buttonStarto").removeAttr("disabled");
	$("#buttonStarto").addClass("pointer");
	$("#buttonEndo").attr("disabled", "true");
	$("#buttonEndo").removeClass("pointer");
	$("#Aiuuuudame").attr("disabled", "true");
	$("#Aiuuuudame").removeClass("pointer");
	$("input[type=file]").removeAttr("disabled");
	$("input[type=color]").removeAttr("disabled");
	$("select").removeAttr("disabled");
	$("main").attr("style", "margin-top: -70px;");
	let marcadores = $("#marcador > div > div");
	for(let i = 0; i < marcadores.length; ++i)
		marcadores[i].attr("style", "margin-top: 50px;");

	$("#DESORDENADAS").html("0");
	$("#MOVIMIENTOS").html("0");

	ncols = -1;
	nrows = -1;

	imgCargada = false;
	piezas = [];

	readyToChange = -1;
	elapsedSeconds = 0;
	MOVIMIENTOS = 0;
	DESORDENADAS = 0;

	SEACEPTANFOTOS = true;
	aiudando = false;

    $("#title").attr("style", "font-size: 150px; color: rgba(255,255,255, 0);");
    $("#infoEnd").attr("style", "color: rgba(255,255,255,0);");
    $("#Again").attr("style", "color: rgba(255,255,255,0); opacity: 0;");
	$("#endMessageArea #Again img").attr("style", "opacity: 0;");
	$("input[type=file]").val("");
	$("#seconds").html("0");

	setTimeout(function() {
		$("#overlap-left").addClass("w-0");
		$("#overlap-left").removeClass("w-50");

		$("#overlap-right").addClass("w-0");
		$("#overlap-right").removeClass("w-50");
		$("#title").attr("style", "font-size: 500px; color: rgba(255,255,255, 0);");
	    $("#endMessageArea").addClass("d-none");

	}, 500);

	$("#container").removeClass("d-none");
	
}

function saveState(){
	console.log("GUARDANDO");
	let ctx = $("#c1").getContext('2d');
	STATE = ctx.getImageData(0, 0, _ANCHO, _ALTO);
}

function restoreState(){

	let ctx = $("#c1").getContext('2d');
	ctx.putImageData(STATE, 0, 0);

}

//<TRON>
/*
ANCHO = 360;
ALTO = 240;
cv = $("#c1");
cvx =  cv.getContext("2d");

X = 20;
Y = 30;

X2 = 60;
Y2 = 60;

VELOCIDAD = 2;
KEYS = [];

for(var i = 0; i < 256; i++) {
    KEYS.push(false);
}

function canvea(){
	cv.width = ANCHO;
	cv.height = ALTO;
}	

function dibujarRect(){

	cvx.strokeStyle = "#d072ff";
	cvx.fillStyle = "#d072ff";
	cvx.lineWidth = 2;
	cvx.strokeRect(X, Y, 5, 5);

	cvx.strokeStyle = "#ff5400";
	cvx.fillStyle = "#ff5400";
	cvx.lineWidth = 2;
	cvx.strokeRect(X2, Y2, 5, 5);
}

function pressKey(event){
	console.log(event.keyCode);
	KEYS[event.keyCode] = true;
}

function releaseKey(event){
	KEYS[event.keyCode] = false;

}

/*
function move() {


//cvx.clearRect(0, 0, cv.width, cv.height);
if(KEYS[87])	//Arriba
	Y = Y-VELOCIDAD;
if(KEYS[68])	//Derecha
	X = X+VELOCIDAD;
if(KEYS[83])	//Derecha
	Y = Y+VELOCIDAD;
if(KEYS[65])	//Derecha
	X = X-VELOCIDAD;

if(X == cv.width)
	X = 0;
else if(X <= 0)
	X = cv.width;

if(Y >= cv.height)
	Y = 0;
else if(Y <= 0)
	Y = cv.height;

if(KEYS[38])	//Arriba
	Y2 = Y2-VELOCIDAD;
if(KEYS[39])	//Derecha
	X2 = X2+VELOCIDAD;
if(KEYS[40])	//Derecha
	Y2 = Y2+VELOCIDAD;
if(KEYS[37])	//Derecha
	X2 = X2-VELOCIDAD;

if(X2 == cv.width)
	X2 = 0;
else if(X2 <= 0)
	X2 = cv.width;

if(Y2 >= cv.height)
	Y2 = 0;
else if(Y2 <= 0)
	Y2 = cv.height;

dibujarRect();
setTimeout('move()',2);
}
*/
//</TRON>