<?php
    session_start();
	include_once "./config.php";
    
	if(!empty($_POST)){
		$url = $_POST['url'];



		if($api[$url]['type'] == 'post'){
			
            
			 $uri = $true_url.$api[$url]['url'];
            
            if(!empty($_FILES)){
                $sf = img_up();
                
                if(!empty($sf)){
                    
                    $_POST['file']='@'.$sf;
                }
            }
            
            
			$ch = curl_init ();
			curl_setopt ( $ch, CURLOPT_URL, $uri);
			curl_setopt ( $ch, CURLOPT_POST, 1 );
			curl_setopt ( $ch, CURLOPT_HEADER, 0 );
			curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
            if(!empty($_FILES)){
			    curl_setopt ( $ch, CURLOPT_POSTFIELDS,$_POST);
            }else{
                curl_setopt ( $ch, CURLOPT_POSTFIELDS, http_build_query($_POST));
            }
			$return = curl_exec ( $ch );

			curl_close ( $ch );
            
            echo $return;

		}
	}else if(!empty($_POST)){

    }else{
        //$srt = '{"rettoken":"","retcode":1,"retmsg":"ok","retdata":{"is_init_pwd":"1"}}';
        //var_dump(json_decode($srt,true));
		//var_dump($api);
		//exit;
	}

	function key_val($data){
        ksort($data,SORT_STRING);
        return $signature = md5(md5(implode($data)).'chuangqianmingyue');
	}
    function key_val_two($data){
        
        return $signature = md5(md5($data).'chuangqianmingyue');
    }
    function img_up(){
        $uploadDir = '/uploads/';
        $fileTypes = array('jpg', 'jpeg', 'gif', 'png'); // Allowed file extensions
        if (!empty($_FILES)) {
            $tempFile   = $_FILES['uploadFile']['tmp_name'];
            $uploadDir  = dirname(__FILE__).$uploadDir;
            $targetFile = $uploadDir.time().rand(0,99999).$_FILES['uploadFile']['name'];

            // Validate the filetype
            $fileParts = pathinfo($_FILES['uploadFile']['name']);
            if (in_array(strtolower($fileParts['extension']), $fileTypes)) {

                // Save the file
                @move_uploaded_file($tempFile, $targetFile);
                return $targetFile;

            } else {

                // The file type wasn't allowed
                return '';

            }
        }
    }
    /*
    $.ajax({
        type: 'POST',
        url: './index.php',
        data: {url:'tab7',username:mobile},
        dataType: 'json',
        success: function(data){

            console.log(data);
        },
        error: function(xhr, type){
            alert('Ajax error!')
        }
    })

     */
?>