<?php 
    include ('database.php');

    $query = "SELECT * FROM task";
    $result = mysqli_query($conexion,$query);

    if(!$result){
        die('Query Falied'.mysqli_error($conexion));
    }

    $json = array();
    While($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>