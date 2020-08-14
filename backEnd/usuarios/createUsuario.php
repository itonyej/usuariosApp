<?php
include('../config.php');
include('../commons/Connections.php');
include('../commons/Usuarios.php');

//RECEPCION DE VARIABLES POST
if (isset($_POST['nombre'])) {
  $nombre = $_POST['nombre'];
} else {
  $nombre = "";
}

if (isset($_POST['apellidos'])) {
  $apellidos = $_POST['apellidos'];
} else {
  $apellidos = "";
}

if (isset($_POST['direccion'])) {
  $direccion = $_POST['direccion'];
} else {
  $direccion = "";
}

if (isset($_POST['pais'])) {
  $pais = $_POST['pais'];
} else {
  $pais = "";
}

if (isset($_POST['cp'])) {
  $cp = $_POST['cp'];
} else {
  $cp = "";
}

if (isset($_POST['estudios'])) {
  $estudios = $_POST['estudios'];
} else {
  $estudios = "";
}

if (isset($_POST['editar'])) {
  $editar = $_POST['editar'];
} else {
  $editar = "";
}

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

if($editar == 0) {
  $createUser = $empleadosData->createUsuario($nombre, $apellidos, $direccion, $pais, $cp, $estudios);
} else {
  $createUser = $empleadosData->editUsuario($nombre, $apellidos, $direccion, $pais, $cp, $estudios, $userId);
}

$arrayError = Array();
if($createUser == 1) {
  $arrayError['error'] = 1;
} else {
  $arrayError['error'] = $createUser;
}

//ARRAY DE RETORNO AL FRONT
$arrayReturn = Array();
array_push($arrayReturn, $arrayError);
echo json_encode($arrayReturn);

