const _ANCHO = 360;
const _ALTO = 360;
var ncols = 5;

function sacarFilaColumna(e){
	let x = e.offsetX;	
	let y = e.offsetY;
	let dim = e.target.width / ncols;
	let col = Math.floor(x / dim);
	let row = Math.floor(y / dim);

	return [col,row];
}

function getCTX(query){
	let cv = document.querySelector(query);

	return cv.getContext('2d');
}

function getCV(query){
	return document.querySelector(query);
}

function prepararCanvas(){
	let cvs = document.querySelectorAll("canvas");
	
	cvs.forEach(function(e){
		e.width 	= _ANCHO;
		e.height 	= _ALTO;
	});

	//derrapa&dropea
	let cv01 = document.querySelector('#cv01');

	cv01.ondragover = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;
		console.log("Drageando");
	};

	cv01.ondrop = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;	

		let fichero = e.dataTransfer.files[0];
		let fr = new FileReader();

		fr.onload = function(){
			let img = new Image();
			img.onload = function(){
				let ctx = cv01.getContext('2d');
				ctx.drawImage(img,0,0,cv01.width,cv01.height);
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(fichero);
	};

	//EVENTOS DEL MAUS
	let cv02 = document.querySelector('#cv02');
	
	cv02.onmousemove = function(e){
		let x = e.offsetX;
		let y = e.offsetY;
		let dim = e.target.width / ncols;
		let [col,row] = sacarFilaColumna(e);
		let ctx02 = cv02.getContext('2d');

		document.querySelector('#posXY').innerHTML = `(${x},${y})`;

		if(!cv02.getAttribute('data-FC')){
			let FC = {'col':col,'row':row};
			cv02.setAttribute('data-FC',JSON.stringify(FC));
		}
		else{
			let FC = JSON.parse(cv02.getAttribute('data-FC'));
			if(FC.row == row && FC.col = col){
				return;
			}
		}
		cv02.width = cv02.width;
		ctx02.drawImage(cv01,col*dim,row*dim,
						dim,dim,
						col*dim,row*dim,
						dim,dim);
		//dibujarLineas();
	};

	//ondragenter,ondragleave
	cv02.onmouseenter = function(e){
		let x = e.offsetX;	
		let y = e.offsetY;

		document.querySelector('#posXYe').innerHTML = `(${x},${y})`;
	};

	cv02.onmouseleave = function(e){
		let x = e.offsetX;	
		let y = e.offsetY;

		document.querySelector('#posXYs').innerHTML = `(${x},${y})`;
	};

	cv02.onclick = function(e){
		let x = e.offsetX;	
		let y = e.offsetY;

		document.querySelector('#posXYc').innerHTML = `(${x},${y})`;

		//SACAR FILA Y COLUMNA
		let [col,row] = sacarFilaColumna(e);
		let dim = e.target.width / ncols;
		document.querySelector('#rc').innerHTML = `(${row},${col})`;
		
		//NO PARA LA PRÁCTICA !!!
		let ctx01 = cv01.getContext('2d');
		let ctx02 = cv02.getContext('2d');
		let imgData = ctx01.getImageData(col*dim,row*dim,dim,dim);
		ctx02.putImageData(imgData,col*dim,row*dim);
		dibujarLineas();
	};

	cv02.onmousedown = function(e){
		let x = e.offsetX;	
		let y = e.offsetY;

		document.querySelector('#posXYcd').innerHTML = `(${x},${y})`;
	};

	cv02.onmouseup = function(e){
		let x = e.offsetX;	
		let y = e.offsetY;

		document.querySelector('#posXYcu').innerHTML = `(${x},${y})`;
	};

}

function prueba01(){
	let ctx = getCTX('#cv01');

	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 2;
	ctx.strokeRect(0,0,100,75);
}

//TRASLACIÓN DEL ORIGEN DEL CANVAS
function trasladar(){
	let ctx = getCTX('#cv01');

	//ctx.translate(150,100);
	//ctx.translate(10,0);
	ctx.translate(20,20);

}

function escalar(){
	let ctx = getCTX('#cv01');

	ctx.scale(1,2);

}

function rotar(){
	let ctx = getCTX('#cv01');
	let ang = 45;

	ctx.rotate(Math.PI*(ang/180));
}

function limpiar(e){
	//let cv = document.querySelector('#cv01');
	let footer = e.target.parentNode;
	let section = footer.parentNode;
	let cv = section.querySelector('canvas');

	cv.width = cv.width;
}

function pintar1(){
	let query = '#cv01';
	let cv = getCV(query);
	let ctx = getCTX(query);
	let img = new Image();

	img.onload = function(){
		ctx.drawImage(img,0,0,_ANCHO,_ALTO);
	};
	img.src = 'lidl.jpg';
}

/*
	¡¡SOLO FUNSIONA CON EL LOCALJÓS!!!
*/

//PARA RECORTAR
function pintar2(){
	let query = '#cv01';
		let cv = getCV(query);
		let ctx = getCTX(query);

	let img = new Image();

	img.onload = function(){
		//PROBAR CON LOCALHOST
		ctx.drawImage(img,300,300,100,100,0,0,100,100);
	};
	img.src = 'lidl.jpg';
}

function copiarCanvas(){
	let query = '#cv01';
		let cv1 = getCV(query);
		let ctx1 = getCTX(query);

	query = '#cv02';
		let cv2 = getCV(query);
		let ctx2 = getCTX(query);

	let imgData = ctx1.getImageData(0,0,cv1.width,cv1.height);

	ctx2.putImageData(imgData,0,0);
}

function dibujarLineas(){
	let query = '#cv02';
	let cv = getCV(query);
	let ctx = getCTX(query);

	let dim = cv.width/ncols;

	ctx.beginPath();
	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 2;

	for(let i=0 ; i<ncols ; i++){
		ctx.moveTo(0, i*dim);
		ctx.lineTo(cv.width, i*dim);

		ctx.moveTo(i*dim, 0);
		ctx.lineTo(i*dim, cv.height);
	}
	ctx.rect(0,0,cv.width,cv.height);
	ctx.stroke();
}