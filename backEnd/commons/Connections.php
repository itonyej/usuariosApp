<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jehu
 * Date: 16/07/2020
 * Time: 11:20
 */

class Connections {
  private $link;
  public function __construct(){}
  public function connect() {
    $host = "localhost";
    $dbname = "cloudgia_registro";
    $userName = "cloudgia_registro";
    $pass = "#registro-2020#";

    $this->link = new PDO("mysql:host=$host;dbname=$dbname", $userName, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    return $this->link;
  }
}
