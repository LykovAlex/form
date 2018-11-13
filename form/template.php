<?php

header('Content-type: application/json; charset=utf-8');
$response = [];

if(isset($_POST['text'])){
  $text = trim($_POST['text']);
  if($text){
    $text = htmlentities($text);
    $date = date('Y-m-d H:i:s');
    file_put_contents("txt.txt", "$text  -  $date \r\n", FILE_APPEND);
    $response['statusText'] = true;
  } else {
      $response['statusText'] = false;
  }
}

if($_FILES){
  if(is_uploaded_file($_FILES["fileName"]["tmp_name"]) && $_FILES["fileName"]["error"] == 0){
      move_uploaded_file(
        $_FILES["fileName"]["tmp_name"],"fileStorage/".$_FILES["fileName"]["name"]
      );
      $response['statusFile'] = true;
    } else {
       $response['statusFile'] = false;
    }
}

echo json_encode($response);
?>
