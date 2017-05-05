<?php
	// $true_url = "http://121.42.194.207";
	$true_url = "http://api.7vr.tv";
	
	//课程列表接口
	$api['classesinfo'] = array('url'=>'/Course/Course/get_class','type'=>'post','info'=>'getinfo');
	//软件下载接口
	$api['downloadinfo'] = array('url'=>'/Course/Course/get_app_list','type'=>'post','info'=>'getinfo');
?>