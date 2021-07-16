<?php
header('content-type: application/json');
include 'conn.php';
$action = $_POST['action'];
function khar($db){
    $date = array();
    $mess = array();
    $s = 'SELECT * FROM user';
    $r = $db->query($s);
    if($r){
        while($row = $r->fetch_assoc()){
            $date [] = $row;
        }
        $mess = array('status' => true,'data' => $date);
    }else{
        $mess = array('status' => false, 'data' => $db->error);
    }
    echo json_encode($mess);
}
function all($db){
    $date = array();
    $mess = array();

    $id = $_POST['id'];
    $s = "SELECT * FROM user WHERE id = '$id'";
    $r = $db->query($s);
    if($r){
        while($row = $r->fetch_assoc()){
            $date [] = $row;
        }
        $mess = array('status' => true,'data' => $date);
    }else{
        $mess = array('status' => false, 'data' => $db->error);
    }
    echo json_encode($mess);
}
function register($db){
    $data = array();
    $id = $_POST['id'];
    $name = $_POST['name'];
    $class = $_POST['class'];

    $s = "INSERT INTO user(id,name,class) 
    VALUES('$id','$name','$class')";

    $r = $db -> query($s);
    if($r){
        $data = array('status' => true,'data' => 'is sax hay ayaah isku diwaangalisar');
    }
    else{
        $data = array('status' => false, 'data' => $db->error);
    }
    echo json_encode($data);
}
function delete($db){
    $data = array();
    $id = $_POST['id'];

    $s = "DELETE FROM user  WHERE id = '$id'";

    $r = $db -> query($s);
    if($r){
        $data = array('status' => true,'data' => 'waa ladir id ');
    }
    else{
        $data = array('status' => false, 'data' => $db->error);
    }
    echo json_encode($data);
}
function update($db){
    $data = array();
    $id = $_POST['id'];
    $name = $_POST['name'];
    $class = $_POST['class'];

    $s = "UPDATE user SET name='$name',class='$class' WHERE id = '$id'";

    $r = $db -> query($s);
    if($r){
        $data = array('status' => true,'data' => 'is sax hay ayaah loo updategareey');
    }
    else{
        $data = array('status' => false, 'data' => $db->error);
    }
    echo json_encode($data);
}
if(isset($action)){
    $action($db);
}
else{
    echo 'action ma jiro';
}
?>