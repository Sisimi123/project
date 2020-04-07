<!-- <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String mid = request.getParameter("mid");
%> -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<meta charset="utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=8" >
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" >
	<title>证照材料上传</title>
	<script type="text/javascript">
 	var BASE_PATH="<%=basePath%>";
 	var Mid="<%=mid%>";
  	</script>
	<link href="../ws/css/liangtianstyle.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="./js/jquery.min.js"></script>
 	<script src="js/globeVar.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/main.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/WebSocket.js" type="text/javascript" charset="utf-8"></script>
    <style type="text/css">
		.one {
			border-color: #ffa8a8;
			background-color: #fff3f3;
			color: #000;
		}
		.top {
			width: 100%;
			height: 88px;
			background: url(images/Top_bg.gif) repeat-x;
		}
		.top .logo {
			margin: 17px 0 0 0;
		}
		.status {
			width: 100%;
			height: 36px;
			background: url(images/Top_bg.gif) repeat-x 0 bottom;
			line-height: 36px;
		}
		.submit_01 {
			width: 101px;
			height: 24px;
			border: 0;
			background: url("<%=path%>/gpy/images/submit.gif") no-repeat;
			text-align: center;
			font: 14px/24px 宋体;
		}
		.t {
			height: 41px;
			background: url(images/right_bg.gif) no-repeat;
			font: 14px 宋体;
			padding: 10px 0 0 30px;
		}
	</style>
</head>

<body onload="load()" onunload="unload()" >
	<div class="top">
		<div class="global-width" style="line-height: 70px;">
			<div id="center"> 
				<div id="ld" style="width:100%; height:100%;  z-index:1000;"> 
					<h1 id="disp" style="text-align: center;">页面加载中,请等待...</h1>
				</div> 
			</div> 
		</div>
	</div>
	<div class="status">
		<div class="global-width"></div>
	</div>
	<div class="main">
		<div class="global-width">
			<div >
				<div class="t">开始预览</div>
				<div  style="width:758px;background-color:#FFF;text-align:center">
					<div style="width:100%;" align="center" id="mainUI">
						<img id="myCanvas" width='600' height='400' style="background-color: black;" />
						<br /><br />
						<label id="lab1">设备类别:</label>
						<select id="device"></select>
						<label id="lab1">分辨率:</label>
						<select name="" id="resoultion" ></select>
						<label id="lab1">视频格式:</label>
						<select id="videoStyle" ></select>
						<br/><br />
						<input class="submit_01" type="button" value="拍照"	onclick="CaptureBase64()" />
						<input class="submit_01" type="button" value="结束拍照" onclick="closeDev();window.close();" />
						<br /><br />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="copyright"></div>
</body>
</html>
