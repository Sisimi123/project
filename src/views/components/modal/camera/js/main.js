
function load(){
	
	StartWebSocket();
	
}

function unload(){
	clearInterval();
	sendWsMessage("uinitSdk");
}

function sendPreZoneSize(){
	
	var w = document.getElementById("myCanvas").width;
	var h = document.getElementById("myCanvas").height;
	sendWsMessage("PreZoneSize"+m_splitTag+String(w)+m_splitTag+String(h));
	
}

function startShowUI(){
	
	var loadwaitUi = document.getElementById("ld");
	loadwaitUi.style.display = "none";
	
	document.getElementById("mainUI").style.display = "block";
}

function showErrorUI(msg){
	
	var loadwaitUi = document.getElementById("ld");
	loadwaitUi.style.display = "none";
	
	document.getElementById("mainUI").style.display = "block";
	
	document.getElementById("disp").value = msg;
	
}

function configureDevInfo(names){	
	//设备名字
	var objSelect = document.getElementById("device");
	objSelect.options.length = 0;
	for (var i = 1; i < names.length;i++ ) {
		var op = new Option(names[i],i);
		objSelect.options[objSelect.length] = op;
	}
	//设置设备
	objSelect.onchange = function(){
		sendWsMessage("OpenDevice"+m_splitTag+String(objSelect.selectedIndex));
	}
}
	
function configureRestionInfo(names){
	
	var objSelect = document.getElementById("resoultion");
	objSelect.options.length = 0;
	
	for (var i = 1; i < names.length;i++ ) {
		if(names[i].length <=0){
			continue;
		}
		var op = new Option(names[i],i);
		objSelect.options[objSelect.length] = op;
		
	}

	//设置分辨率
	objSelect.onchange = function(){
		
		sendWsMessage("SetResolution"+m_splitTag+String(objSelect.selectedIndex));
	
	}
}

function configureVideoStyle(names){
	
	var objSelect = document.getElementById("videoStyle");
	objSelect.options.length = 0;
	
	for (var i = 1; i < names.length;i++ ) {
	
		var op = new Option(names[i],i);
		objSelect.options[objSelect.length] = op;
		
	}

	//设置视频格式
	objSelect.onchange = function(){
		
		sendWsMessage("SetMediaType"+m_splitTag+String(objSelect.selectedIndex));
	
	}
	
}

function setCanvasImageSize(w,h,s){
	
	m_imageDataH = h;
	m_imageDataS = s;
	m_imageDataW = w;
	
}
function setCavasImage(bytearray){
	
	var tempcanvas = document.getElementById("myCanvas");  
	
    var imageheight = m_imageDataH;  
    var imagewidth = m_imageDataW;  
    var tempcontext = tempcanvas.getContext('2d');  
    var imgdata = tempcontext.createImageData(imagewidth,imageheight);  
	imgdata.data.set(bytearray);
 /*
    for(var i = 0 ;i < imageheight * imagewidth * 4; i ++)	
    {
    	imgdata.data[i] = bytearray[i]; 	
    }
   /* for (var row = 0; row < imageheight; row++) {  
		for (var col = 0; col < imagewidth; col++) {  
		 	imgdata.data[((imagewidth * row) + col) * 4] = bytearray[((imagewidth * row) + col) * 4 + 2];  
			imgdata.data[((imagewidth * row) + col) * 4 + 1] = bytearray[((imagewidth * row) + col) * 4 + 1];  
			imgdata.data[((imagewidth * row) + col) * 4 + 2] = bytearray[((imagewidth * row) + col) * 4];  
			imgdata.data[((imagewidth * row) + col) * 4 + 3] = 255;  
			}  	
	}*/  
	//tempcontext.drawImage(img,0,0,imagewidth,imageheight,0,0,tempcanvas.style.width,tempcanvas.style.height);
    tempcontext.putImageData(imgdata,0,0,0,0,imagewidth,imageheight);
    
}

function Uint8ToString(u8a){
  var CHUNK_SZ = 0x8000;
  var c = [];
  for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
  }
  return c.join("");
}
function setImageWithBase64(str){

	var myimg = document.getElementById("myCanvas"); 
	myimg.src = "data:image/png;base64,"+str;
	
}



function SetRotationStyle(){
	var objSelect = document.getElementById("rotationStyle");
	sendWsMessage("SetRotateMode"+m_splitTag+String(objSelect.selectedIndex));
}
function SetCutStyle(){
	var objSelect = document.getElementById("cutStyle");
	sendWsMessage("SetCutMode"+m_splitTag+String(objSelect.selectedIndex));
}
function SetImageStyle(){
	
	/*var objSelect = document.getElementById("imagestyle");*/
	var objSelect ="jpg";
	sendWsMessage("SetImageType"+m_splitTag+String(objSelect.selectedIndex));
	
}

function viewFolder(){
	
	var fileDir = document.getElementById("saveText").value;
	sendWsMessage("viewFolder"+m_splitTag+fileDir);
}

function openFolder(){
	var fileDir = document.getElementById("saveText").value;
	sendWsMessage("viewFolder"+m_splitTag+fileDir);
}

function setSavePath(path){
	
	document.getElementById("saveText").value = path;
	
}
//保存参数
function SavePara(){
	
	sendWsMessage("SetJPGQuanlity"+m_splitTag+"100");   //JPG
/*	sendWsMessage("SetImageDPI"+m_splitTag+x+m_splitTag+y); //DPI
	sendWsMessage("SetCusCropSize"+m_splitTag+left+m_splitTag+top+m_splitTag+right+m_splitTag+bottom); //Crop
*/	
}



function Capture(){
	
	var fileDir = "D:\\temp";
	var fileStyle = "jpg";
	alert(fileStyle);
	SavePara();
	sendWsMessage("CaptureImage"+m_splitTag+fileDir+m_splitTag+fileStyle);
	
}
function CaptureBase64(){
	var fileDir = "D:\\temp";
	var fileStyle ="jpg";
	SavePara();
	sendWsMessage("CaptureImageToBase64" + m_splitTag+fileDir+m_splitTag+fileStyle);
}
function showBase64info(str){
	UpLoad(str);
}

function closeDev(){
	
	sendWsMessage("camCloseDev");
	
}

function UpLoad(str){
	var formdata=new FormData();  
	formdata.append('img',str); 
	formdata.append('mid',Mid); 
	$.ajax({
		  url:BASE_PATH+'wsfile/wsupload.do',
		  data :  formdata,  
		  processData : false,   
		  contentType : false,   
		  dataType: 'json',  
		  type : "POST", 
		  success:function(data){
			if(data.success){
				alert("上传成功");
			}else{
				alert("上传失败");
			}
		  },
	});
}

