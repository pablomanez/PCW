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
