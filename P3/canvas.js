const _ANCHO = 360;
const _ALTO = 240;

var ncols;
var nrows;

var imgCargada = false;

// PIEZAS ALMACENA LA POSICION Y LAS DIMENSIONES
// DE TODOS LOS CUADROS DEL PUZZLE
// PARA DESPUES INVOCAR EL getImageData(...) 
var piezas = [];

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
			ncols = 4;
			nrows = 6;
		}
		else if(diff.value == 1){
			ncols = 6;
			nrows = 9;	
		}
		else if(diff.value == 2){
			ncols = 8;
			nrows = 12;
		}
		else{
			ncols = 4;
			nrows = 3;
		}

		let dimy = cv.width/nrows;
		let dimx = cv.height/ncols;

		ctx.beginPath();
		ctx.strokeStyle = document.querySelector("#color").value;
		ctx.lineWidth = 5;

		for(let i=0 ; i<ncols ; i++){
			ctx.moveTo(0, i*dimx);
			ctx.lineTo(cv.width, i*dimx);
		}
		
		for(let i=0 ; i<nrows ; i++){
			ctx.moveTo(i*dimy, 0);
			ctx.lineTo(i*dimy, cv.height);
		}

		ctx.rect(0,0,cv.width,cv.height);
		ctx.stroke();
	}
}

function cargaImg(input){
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

	//console.log(input.files[0]);
}

//SE LLAMA DESDE COPIARCANVAS
function creaArrayPiezas(){
	let query = '#c1';
		let cv1 = getCV(query);
		let ctx1 = getCTX(query);
	
	query = '#c2';
		let cv2 = getCV(query);
		let ctx2 = getCTX(query);

	piezas = [];
	let imgData;

	let x = cv1.width/nrows;
	let y = cv1.height/ncols;

	//FILAS > COLUMNAS
	for(let i=0 ; i<ncols ; i++){
		for(let j=0 ; j<nrows ; j++){
			//imgData = ctx1.getImageData(x*j,y*i,x,y);
			imgData = [x*j,y*i,x,y];

			piezas.push(imgData);
		}
	}

	//console.log(piezas);
}

function comiensaElPusle(){
	if(imgCargada){
		console.log("Se ha cargado una imagen y puedes empezar");

		deshordena();
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
}

//DEVUELVE UN NUMERO RANDOM ENTRE min Y max INCLUIDOS
function getRandom(min,max){
	return Math.floor((Math.random() * (max+1)) + min);
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