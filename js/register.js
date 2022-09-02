function confirmarCorreo()
{
	if((document.getElementById('mail').value!="" || document.getElementById('mail2').value!="")&&document.getElementById('mail').value==document.getElementById('mail2').value&&ValidarMail(document.getElementById('mail').value)&&ValidarMail(document.getElementById('mail2').value))
    {
        document.getElementById('mail').classList.add("border-warning");
        document.getElementById('mail2').classList.add("border-warning");        
        document.getElementById('mail').classList.add("text-warning");
        document.getElementById('mail2').classList.add("text-warning");

        document.getElementById('mail').classList.remove("border-danger");
        document.getElementById('mail2').classList.remove("border-danger");
        document.getElementById('mail').classList.remove("text-danger");     
        document.getElementById('mail2').classList.remove("text-danger");
    }
    else
    {
        document.getElementById('mail').classList.add("border-danger");
        document.getElementById('mail2').classList.add("border-danger");
        document.getElementById('mail').classList.add("text-danger");
        document.getElementById('mail2').classList.add("text-danger");
        document.getElementById('mail').classList.remove("border-warning");        
        document.getElementById('mail2').classList.remove("border-warning");
        document.getElementById('mail').classList.remove("text-warning");        
        document.getElementById('mail2').classList.remove("text-warning");
        
    }
}
function comprobar()
{
    if(document.getElementById('usr').value!="") 
        {
            document.getElementById('usr').classList.add("border-warning");
            document.getElementById('usr').classList.add("text-warning");
            document.getElementById('usr').classList.remove("border-muted");
            document.getElementById('usr').classList.remove("text-muted");
        }else{
            document.getElementById('usr').classList.remove("border-warning");
            document.getElementById('usr').classList.remove("text-warning");
            document.getElementById('usr').classList.add("border-muted");
            document.getElementById('usr').classList.add("text-muted");
        }
    if(document.getElementById('pwd').value!="")
        {
            document.getElementById('pwd').classList.add("border-warning");
            document.getElementById('pwd').classList.add("text-warning");
            document.getElementById('pwd').classList.remove("border-muted");
            document.getElementById('pwd').classList.remove("text-muted");
        }else{
            document.getElementById('pwd').classList.remove("border-warning");
            document.getElementById('pwd').classList.remove("text-warning");
            document.getElementById('pwd').classList.add("border-muted");
            document.getElementById('pwd').classList.add("text-muted");
        }
}
function tyc()
{
    //vadidacion de campos
    var umail = document.getElementById('mail').value;    
    var ulogin = document.getElementById('usr').value;    
    var upwd = document.getElementById('pwd').value;
    
    if(umail.length==0 || ulogin.length==0 || upwd.length==0){alert("Oye, necesito todos los datos para seguir :c");return;}

    $("#checkTyC").change(function() {
        document.getElementById("modal-s-btn").classList.toggle("disabled");
});
    $('#myModal').modal();    
}
function SendForm()
{
    document.getElementById('modal-s-btn').setAttribute('send', 1);
    //toma los datos
    var umail = document.getElementById('mail').value;    
    var ulogin = document.getElementById('usr').value;    
    var upwd = document.getElementById('pwd').value;
        //elimina los datos de los campos de texto    
    	document.getElementById('mail').value = "";
        document.getElementById('mail2').value = "";
    	document.getElementById('usr').value = "";
    	document.getElementById('pwd').value = "";
        //retomar aspecto
        document.getElementById('mail2').classList.add("border-warning");
    	document.getElementById('mail2').classList.remove("border-danger");
    	document.getElementById('mail').classList.add("border-warning");
        document.getElementById('mail').classList.remove("border-danger");
        //enviar datos
        htmlPromise("insert usuarios (correo,usuario,pin) values ("+umail+","+ulogin+",'"+upwd+")")

        .then( data => {
            if(data[0]=="300"){
                $('#myModal').modal('hide');
                $('#succesModal').modal();
            }
        });
    //
}
