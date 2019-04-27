$(function(){
    let edit = false;
    console.log('JQuery esta Listo');
    $('#task-result').hide();
    fetchTasks();
    $('#search').keyup(function(){
        if($('#search').val()){
            let search = $('#search').val();
        
            /* Este metodo de JQuery nos permite hacer una peticion a un servidor utiliza un objeto*/
                $.ajax({
                    url:'task-search.php',
                    type:'POST',
                    data:{ search },
                    success: function(response){
                        let tasks= JSON.parse(response);
                        let template = '';
                        tasks.forEach(task => {
                            template += `<li>
                                ${task.name}
                            </li>`
                        });
    
                        $('#container').html(template);
                        $('#task-result').show();
    
                    }
                })
        }

    });
    $('#task-form').submit(function(){
        const postData={
            name: $('#name').val(),
            description:$('#description').val(),
            id: $('#taskId').val()
        };

        let url = edit == false ? 'task-add.php' : 'task-edit.php';
        console.log(url);
        $.post(url,postData,function(response){
            console.log(response);
            fetchTasks();
            /* Esto sirve para recetear los datos del formulario con la propiedad tigger*/
            $('#task-form').trigger('reset');
        });
        e.preventDefault();
        
        
    });

    function fetchTasks(){
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
               let tasks = JSON.parse(response);
               let template = '';
               tasks.forEach(task =>{
                   template+=
                   `<tr taskId="${task.id}">
                       <td>${task.id}</td>
                       <td>
                           <a href="#" class='task-item'>${task.name}</a>
                           
                       </td>
                       <td>${task.description}</td>
                       <td>
                            <button class="task-delete btn btn-danger">
                            DELETE
                            </button>
                       </td>
                    </tr>`
               });
               $('#tasks').html(template);
            }
        })
    }

    $(document).on('click','.task-delete',function(){
        if(confirm('Estas seguro de querer eliminarlo')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('task-delete.php',{id},function(response){
                fetchTasks();
                
            })
        }
    });

    $(document).on('click','.task-item',function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('task-single.php',{id},function(response){
           const task = JSON.parse(response);
           $('#name').val(task.name);
           $('#description').val(task.description);
           $('#taskId').val(task.id);
           edit = true;
        })
    })
});