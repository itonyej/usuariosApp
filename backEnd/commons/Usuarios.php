<?php

class Usuarios
{
  private $id;
  private $nombre;
  private $apellidos;
  private $direccion;
  private $pais;
  private $cp;
  private $estudios;
  private $link;

  public function __construct($link, $empleadoId)
  {
    $this->link = $link;

    $select = "SELECT * FROM usuarios WHERE id = '$usuarioId' ORDER BY id ASC";
    $query = $link->prepare($select);
    $query->execute();
    $query->setFetchMode(PDO::FETCH_ASSOC);
    if ($query->rowCount() != 0) {
      $arr = $query->fetch();

      $this->id = $arr['id'];
      $this->nombre = $arr['nombre'];
      $this->apellidos = $arr['apellidos'];
      $this->direccion = $arr['direccion'];
      $this->pais = $arr['pais'];
      $this->cp = $arr['cp'];
      $this->estudios = $arr['estudios'];
    }
  }

  public function getId() {
    return $this->id;
  }
  public function getNombre() {
    return $this->id;
  }
  public function getApellidos() {
    return $this->apellidos;
  }
  public function getDireccion() {
    return $this->direccion;
  }
  public function getPais() {
    return $this->pais;
  }
  public function getCP() {
    return $this->cp;
  }
  public function getEstudios() {
    return $this->estudios;
  }
  public function getUsuarios() {
    $empleados = Array();

    $select = "SELECT * FROM usuarios ORDER BY id ASC";
    $query = $this->link->prepare($select);
    $query->execute();
    $query->setFetchMode(PDO::FETCH_ASSOC);
    $i=0;
    if ($query->rowCount() != 0) {
      while ($arr = $query->fetch()) {

        $empleados[$i]['id'] = $arr['id'];
        $empleados[$i]['nombre'] = $arr['nombre'];
        $empleados[$i]['apellidos'] = $arr['apellidos'];
        $empleados[$i]['direccion'] = $arr['direccion'];
        $empleados[$i]['pais'] = $arr['pais'];
        $empleados[$i]['cp'] = $arr['cp'];
        $empleados[$i]['estudios'] = $arr['estudios'];

        $i++;
      }
    }

    return $empleados;
  }

  public function getSkills() {
    $skills = Array();

    $select = "SELECT * FROM skills ORDER BY skill ASC";
    $query = $this->link->prepare($select);
    $query->execute();
    $query->setFetchMode(PDO::FETCH_ASSOC);
    $i=0;
    if ($query->rowCount() != 0) {
      while ($arr = $query->fetch()) {

        $skills[$i]['id'] = $arr['id'];
        $skills[$i]['skill'] = $arr['skill'];

        $i++;
      }
    }
    return $skills;
  }

  public function createUsuario($nombre, $apellidos, $direccion, $pais, $cp, $estudios) {
    //SE INSERTA NUEVO USUARIO A LA BASE DE DATOS...
    $error = 0;
    $insert = "INSERT INTO usuarios (nombre, apellidos, direccion, pais, cp, estudios) VALUES (:nombre, :apellidos, :direccion, :pais, :cp, :estudios)";
    //echo $insert;
    $query = $this->link->prepare($insert);
    if ($query->execute(array(':nombre' => "$nombre", ':apellidos' => "$apellidos", ':direccion' => "$direccion", ':pais' => "$pais", ':cp' => "$cp", ':estudios' => "$estudios"))) {
      $error = 1;
    } else {
      $succes = $query->errorInfo();
    }

    return $error;
  }

  public function editUsuario($nombre, $apellidos, $direccion, $pais, $cp, $estudios, $userId) {
    //SE ACTUALIZA  USUARIO A LA BASE DE DATOS...
    $error = 0;
    $update = "UPDATE usuarios SET nombre = :nombre, apellidos = :apellidos, direccion = :direccion, pais = :pais, cp = :cp, estudios = :estudios WHERE id = :userId";
    //echo $insert;
    $query = $this->link->prepare($update);
    if ($query->execute(array(':nombre' => "$nombre", ':apellidos' => "$apellidos", ':direccion' => "$direccion", ':pais' => "$pais", ':cp' => "$cp", ':estudios' => "$estudios", ':userId' => "$userId"))) {
      $error = 1;
    } else {
      $succes = $query->errorInfo();
    }

    return $error;
  }

  public function deleteUser($userId) {
    //SE ELIMINA USUARIO..
    $error = 0;
    $delete = "DELETE FROM usuarios WHERE id = :id";
    $query = $this->link->prepare($delete);
    if ($query->execute(array(':id' => "$userId"))) {
      $error = 1;
    } else {
      $succes = $query->errorInfo();
    }

    return $error;
  }
}
