<?php

    include ('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query = "DELETE FROM task WHERE id = $id";
        $result = mysqli_query($conexion,$query);
        if(!$result){
            die('Query Failed');
        }
        echo "Talk Deleted Successfully";

    }




?>