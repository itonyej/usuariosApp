<?php
include('../config.php');
include('../commons/Connections.php');
include('../commons/Usuarios.php');

//RECEPCION DE VARIABLES POST
if (isset($_POST['userId'])) {
  $userId = $_POST['userId'];
} else {
  $userId = "";
}

//SE INICIA CONEXION A LA BASE DE DATOS...
$con = new Connections();
$link = $con->connect();

//SE INICIA CLASE USUARIOS
$empleadosData = new Usuarios($link, "");
$deleteUser = $empleadosData->deleteUser($userId);

$arrayError = Array();
if($deleteUser == 1) {
  $arrayError['error'] = 1;
} else {
  $arrayError['error'] = $deleteUser;
}

//ARRAY DE RETORNO AL FRONT
$arrayReturn = Array();
array_push($arrayReturn, $arrayError);
echo json_encode($arrayReturn);
