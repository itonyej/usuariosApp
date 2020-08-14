<?php
include('../config.php');
include('../commons/Connections.php');
include('../commons/Usuarios.php');

//SE INICIA CONEXION A LA BASE DE DATOS
$con = new Connections();
$link = $con->connect();

//SE TRAE ARRAY DE USUARIOS
$usuariosData = new Usuarios($link, "");
$usuarios = $usuariosData->getUsuarios();
$skills = $usuariosData->getSkills();

//ARRAY DE RETORNO AL FRONT EN JSON
$arrayReturn = Array();
array_push($arrayReturn, $usuarios, $skills);
echo json_encode($arrayReturn);

