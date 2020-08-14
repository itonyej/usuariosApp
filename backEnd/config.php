<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Mexico_City");
$_POST = json_decode(file_get_contents("php://input"),true);

$year = date("Y");
$today = date("Y-m-d");
$month = date("m");
$time = date("Y-m-d H:i:s");
$hourMinute = date("H:i");
$dayNumber = date('N', strtotime($today));
$day = date("d");
