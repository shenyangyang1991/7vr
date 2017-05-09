<?php
	// $true_url = "http://121.42.194.207";
	$true_url = "http://api.7vr.tv";
	
	//课程列表接口
	$api['classesinfo'] = array('url'=>'/Course/Course/get_class','type'=>'post','info'=>'getinfo');
	//软件下载接口
	$api['downloadinfo'] = array('url'=>'/Course/Course/get_app_list','type'=>'post','info'=>'getinfo');
	//服务接口
	$api['serverinfo'] = array('url'=>'/Course/Course/get_fuwu','type'=>'post','info'=>'getinfo');
	//服务接口
	$api['equipmentinfo'] = array('url'=>'/Course/Course/get_shebei','type'=>'post','info'=>'getinfo');
	//登录接口
	$api['login'] = array('url'=>'/user/login/index','type'=>'post','info'=>'login');
	//注册接口
	$api['register'] = array('url'=>'/user/register/index','type'=>'post','info'=>'register');
	//获取图片接口
	$api['getimg'] = array('url'=>'/basic/ImgVerify/get_code','type'=>'post','info'=>'getImg');
	//获取短信接口
	$api['getcode'] = array('url'=>'/user/user/get_code','type'=>'post','info'=>'getcode');
	//修改密码接口
	$api['resetpwd'] = array('url'=>'/user/user/reset_pwd_for_phone','type'=>'post','info'=>'resetpwd');
	
?>