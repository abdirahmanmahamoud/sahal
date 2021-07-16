<?php
$db = new mysqli('localhost','root','','web');
if($db->connect_error){
    echo $db->errno;
}else{
    
}
?>