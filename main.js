const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');

//Add Filters and Effects
document.addEventListener('click', (e) => {
	if(e.target.classList.contains('filter-btn')){		
		if(e.target.classList.contains('brightness-add')){
			Caman('#canvas', img, function(){
				this.brightness(5).render();
			});
		} else if(e.target.classList.contains('brightness-remove')){
			Caman('#canvas', img, function(){
				this.brightness(-5).render();
			});
		} else if(e.target.classList.contains('contrast-add')){
			Caman('#canvas', img, function(){
				this.contrast(5).render();
			});
		} else if(e.target.classList.contains('contrast-remove')){
			Caman('#canvas', img, function(){
				this.contrast(-5).render();
			});
		} else if(e.target.classList.contains('saturation-add')){
			Caman('#canvas', img, function(){
				this.saturation(5).render();
			});
		} else if(e.target.classList.contains('saturation-remove')){
			Caman('#canvas', img, function(){
				this.saturation(-5).render();
			});
		} else if(e.target.classList.contains('vibrance-add')){
			Caman('#canvas', img, function(){
				this.vibrance(5).render();
			});
		} else if(e.target.classList.contains('vibrance-remove')){
			Caman('#canvas', img, function(){
				this.vibrance(-5).render();
			});
		} else if(e.target.classList.contains('vintage-add')){
			Caman('#canvas', img, function(){
				this.vintage().render();
			});
		} else if(e.target.classList.contains('lomo-add')){
			Caman('#canvas', img, function(){
				this.lomo().render();
			});
		} else if(e.target.classList.contains('clarity-add')){
			Caman('#canvas', img, function(){
				this.clarity().render();
			});
		} else if(e.target.classList.contains('sincity-add')){
			Caman('#canvas', img, function(){
				this.sinCity().render();
			});
		} else if(e.target.classList.contains('crossprocess-add')){
			Caman('#canvas', img, function(){
				this.crossProcess().render();
			});
		} else if(e.target.classList.contains('pinhole-add')){
			Caman('#canvas', img, function(){
				this.pinhole().render();
			});
		} else if(e.target.classList.contains('nostalgia-add')){
			Caman('#canvas', img, function(){
				this.nostalgia().render();
			});
		} else if(e.target.classList.contains('hermajesty-add')){
			Caman('#canvas', img, function(){
				this.herMajesty().render();
			});
		}		
	}
})

// Revert Filters

revertBtn.addEventListener('click', () => {
	Caman('#canvas', img, function(){
		this.revert();
	});
})

//Upload File

uploadFile.addEventListener('change', (e) => {
	//Get File
	const file = document.getElementById('upload-file').files[0];


	//Init FileReader
	const reader = new FileReader();

	if(file){
		//Set File Name
		fileName = file.name;
		//Read data as Url
		reader.readAsDataURL(file);
	}

	//Add image to canvas
	reader.addEventListener('load', () => {
		//Create img
		img = new Image();
		//Set src
		img.src = reader.result;
		//On Image load, add to Canvas
		img.onload = function(){
			canvas.width = img.width;
			canvas.height = img.height;	
			ctx.drawImage(img, 0,0, img.width, img.height);		
			canvas.removeAttribute('data-caman-id');	
		}
	}, false);
});

//Add Caption
const captionBtn = document.getElementById('caption-btn');
captionBtn.addEventListener('click', () => {
	let textToAdd = document.getElementById('caption');
	ctx.font = "30px Arial";
	ctx.fillStyle = colorValue.value;
	console.log(ctx.fillStyle);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(img, 0,0, img.width, img.height);		
	ctx.textAlign = "center";     
	ctx.fillText(textToAdd.value, (canvas.width/2), canvas.height-30);	
	textToAdd.value = '';
})

//Change Font Color
const colorValue = document.getElementById('fontColor');

//Download Image

downloadBtn.addEventListener('click', (e) => {
	//Get File Text
	const fileExtension = fileName.slice(-4);
	//console.log(e);
	//console.log("E's target", e.target);
	//Initialize new FileName
	let newFileName;

	//Check Image Type
	if(fileExtension === '.jpg' || fileExtension === '.png' || fileExtension === '.jpeg' || fileExtension === '.JPG' ){
		newFileName = fileName.substring(0, fileName.length-4) + '-edited.jpg';
	};

	// Call Download
	download(canvas, newFileName);
})

// Download Function

function download(canvas, filename){
	//Init event
	let g;
	//Create Link
	const link = document.createElement('a');
	//console.log(typeof link);
	//console.dir(link);

	//Set Properties
	link.download = filename;
	link.href = canvas.toDataURL('image/jpeg', 0.8);	

	//New Mouse Event
	g = new MouseEvent('click');
	//Dispatch Event
	//console.log(g);
	//console.log("G's target", g.target);
	link.dispatchEvent(g);
}



