<?php

    include 'database.php';

    if(isset($_POST['id'])){
        $id = $_POST['id'];

        $query = "SELECT * FROM task WHERE id = $id";
        $result = mysqli_query($conexion,$query);
        
        if(!$result){
            die('Query Failed');
        }

        While($row = mysqli_fetch_array($result)){
            $json[] = array (
                'name'=>$row['name'],
                'description'=>$row['description'],
                'id' => $row['id']
            );
        }
        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    }

?>