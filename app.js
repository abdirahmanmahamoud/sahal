ler()
$('#add').click(function(){
   $('#modal').modal('show')
})

let btn = 'insert';

$('#form').submit(function (event) { 
   event.preventDefault();
   let form_data = new FormData($('#form')[0]);
   if(btn == 'insert'){
      form_data.append('action','register');
   }else{
      form_data.append('action','update');
   }

   $.ajax({
      method : 'POST',
      dataType : 'JSON',
      url :  'apl.php',
      data :  form_data,
      processData : false,
      contentType : false,
      success : function(data){
        let status = data.status;
        let per = data.data;
        $('#form')[0].reset();
        alert(per);
        btn = 'insert';
        $('#modal').modal('hide');
        ler();
      },
      error : function(data){
         console.log(data);
      },
   })
})

function ler(){
   $('#table tbody').html('');
   let send ={
      'action' :  'khar'
   }
   $.ajax({
      method : 'POST',
      dataType : 'JSON',
      url :  'apl.php',
      data :  send,
      success : function(data){
         let status = data.status;
         let per = data.data;
         let html ='';
         let tr = '';
         if(status){
            per.forEach(item =>{
               tr += '<tr>';
               for(let i in item){
                  tr += `<td>${item [i]}</td>`;
               }
               tr += `<td><a  class="btn btn-primary update_info" update_id = ${item['id']}><i class="fas fa-edit"></i></a><a class="ml-2"></a> <a class="btn btn-danger delete_info" delete_id = ${item['id']}><i class="fas fa-trash"></i></a></td>`;
               tr += '</tr>';
            })
            $('#table tbody').append(tr);
         }
       },
       error : function(data){
          console.log(data);
       },
   })
}
function all(id){
   let send ={
      'action' :  'all',
      'id' :  id,
   }
   $.ajax({
      method : 'POST',
      dataType : 'JSON',
      url :  'apl.php',
      data :  send,
      success : function(data){
         let status = data.status;
         let per = data.data;
         let html ='';
         let tr = '';
         if(status){
            $('#id').val(per[0].id);
            $('#name').val(per[0].name);
            $('#class').val(per[0].class);
            $('#modal').modal('show');
            btn = 'update';
         }
       },
       error : function(data){
          console.log(data);
       },
   })
}
function dele(id){
   let send ={
      'action' :  'delete',
      'id' :  id,
   }
   $.ajax({
      method : 'POST',
      dataType : 'JSON',
      url :  'apl.php',
      data :  send,
      success : function(data){
         let status = data.status;
         let per = data.data;
         let html ='';
         let tr = '';
         if(status){
            ler();
         }
       },
       error : function(data){
          console.log(data);
       },
   })
}
$('#table').on("click",'a.update_info',function(){
   let id = $(this).attr('update_id');
   all(id);
})
$('#table').on("click",'a.delete_info',function(){
   let id = $(this).attr('delete_id');
  if(confirm('mala tirtiyaah')){
     dele(id);
  }
})