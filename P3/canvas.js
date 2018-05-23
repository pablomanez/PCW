const _ANCHO = 360;
const _ALTO = 240;

var ncols;
var nrows;

var imgCargada = false;

// PIEZAS ALMACENA LA POSICION Y LAS DIMENSIONES
// DE TODOS LOS CUADROS DEL PUZZLE
// PARA DESPUES INVOCAR EL getImageData(...) 
var piezas = [];
var solucion = []

var readyToChange = -1;
var TIMER;
var elapsedSeconds = 0;

var SEACEPTANFOTOS = true;
var aiudando = false;

function getCTX(query){
	let cv = document.querySelector(query);

	return cv.getContext('2d');
}

function getCV(query){
	return document.querySelector(query);
}

function prepararCanvases(){
	let cvs = document.querySelectorAll("canvas");
	
	cvs.forEach(function(e){
		e.width 	= _ANCHO;
		e.height 	= _ALTO;
	});

	//derrapa&dropea
	let c1 = document.querySelector('#c1');
	c1.ondragover = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;
		console.log("DERRAPANDO");
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
					let ctx = c1.getContext('2d');
					ctx.drawImage(img,0,0,c1.width,c1.height);
					imgCargada = true;

					copiarCanvas();	//CARGA DE FORMA ASÍNCRONA ÓPTIMA :ok_hand:
				};
				img.src = fr.result;
			};
			fr.readAsDataURL(fichero);
			SEACEPTANFOTOS = false;
		}
	};

	
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
		
		$("#c2").onmouseover = function(e){
			if(aiudando)
				dibujaPiezas();
		};

		$("#c2").onclick = function(e){
			let [row,col] = sacarFilaColumna(e);
			//Debug
			//document.querySelector('#posXY').innerHTML = `(${row},${col})`;
			if(readyToChange == -1){
				readyToChange = row*ncols + col;
			}
			else{
				let aux = piezas[readyToChange];
				piezas[readyToChange] = piezas[row*ncols + col];
				piezas[row*ncols + col] = aux;
				readyToChange = -1;
			}

			dibujaPiezas();
		};

		//CREO LAS LINEAS
		dibujarLineas();

		creaArrayPiezas();
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

		SEACEPTANFOTOS = false;
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

	let target = 0;
	//FILAS > COLUMNAS
	for(let i=0 ; i<nrows; i++){
		for(let j=0 ; j<ncols ; j++){
			//imgData = ctx1.getImageData(x*j,y*i,x,y);

			pieza ={
				'id': target,
				'imgData': [x*j,y*i,x,y]
			}
			piezas.push(pieza);
			solucion.push(pieza);
			++target;
		}
	}

	console.log(solucion);
	console.log(piezas);
}

function comiensaElPusle(){
	if(imgCargada){
		console.log("Se ha cargado una imagen y puedes empezar");

		deshordena();
		dibujaPiezas();

		$("#c1").removeClass("pointer");
		$("#c2").addClass("pointer");

		$("#timer > div").attr("style", "margin-top: 0;");
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

	console.log(piezas);
	console.log(solucion);
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
	console.log(piezas);
	console.log(solucion);
	aiudando = true;
	let k = 0;
	let ctx = $("#c2").getContext('2d');
	for(let i = 0; i < nrows; ++i){
		for(let j = 0; j < ncols; ++j){

			if(piezas[k].id != solucion[k].id){
			
				let xp = piezas[k].imgData[0];
				let yp = piezas[k].imgData[1];
				let w = piezas[k].imgData[2];
				let h = piezas[k].imgData[3];
				ctx.globalAlpha = 0.7;
				ctx.fillStyle = "#ff8800";
				ctx.fillRect(xp,yp,w,h);
				ctx.globalAlpha = 1.0;
				dibujarLineas();
			}
			++k;
		}
	}
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