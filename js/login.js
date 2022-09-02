function comprobar()
{
    document.getElementById('error').classList.add("d-none");
    if(document.getElementById('access').value!="") 
    {
        document.getElementById('access').classList.add("border-warning");
        document.getElementById('access').classList.add("text-warning");
        document.getElementById('access').classList.remove("border-muted");
        document.getElementById('access').classList.remove("text-danger");
        document.getElementById('access').classList.remove("border-danger");
    }else{
        document.getElementById('access').classList.remove("border-warning");
        document.getElementById('access').classList.add("border-muted");
    }
    if(document.getElementById('pwd').value!="")
    {
        document.getElementById('pwd').classList.add("border-warning");
        document.getElementById('pwd').classList.add("text-warning");
        document.getElementById('pwd').classList.remove("border-muted");
        document.getElementById('pwd').classList.remove("text-danger");
        document.getElementById('pwd').classList.remove("border-danger");
    }else{
        document.getElementById('pwd').classList.remove("border-warning");
        document.getElementById('pwd').classList.add("border-muted");
    }
    //encender boton
    if(document.getElementById('pwd').value.length==4&&document.getElementById('access').value!=""){
        document.getElementById('btn_login').classList.remove('disabled');
        document.getElementById('btn_login').style="";
    }else{
        document.getElementById('btn_login').classList.add('disabled');
        document.getElementById('btn_login').style="cursor: default";
    }
}
function inicio()
{
    var umail = document.getElementById('access').value;
    var upwd = document.getElementById('pwd').value;
    if((umail==""||upwd=="")||upwd.length<4){console.log('error no controlado'); return;}
    

    document.getElementById('access').value="";
    document.getElementById('pwd').value="";
    document.getElementById('btn_login').children[1].classList.add('d-none');
    htmlPromise("select (correo,usuario,pin) from usuarios where keymail="+umail+upwd)
    .then( data => {
        if(data[0]=="200"){
        pk=data[1].toString().split(",")[0];
        iniciarsesion(pk);
        return;
    }else{
        htmlPromise("select (correo,usuario,pin) from usuarios where keyuser="+umail+upwd)
          .then( data => {
                consultauser=data;
                if(data[0]=="200"){
                pk=data[1].toString().split(",")[0];
                iniciarsesion(pk);
                return;
            }else{
                document.getElementById('access').classList.remove("border-warning");
                document.getElementById('access').classList.remove("text-warning");
                document.getElementById('access').classList.add("border-danger");
                document.getElementById('access').classList.add("text-danger");
                document.getElementById('pwd').classList.remove("border-warning");
                document.getElementById('pwd').classList.remove("text-warning");
                document.getElementById('pwd').classList.add("border-danger");
                document.getElementById('pwd').classList.add("text-danger");
                document.getElementById('error').classList.remove("d-none");
            }
        });
    }
  });
  
}
function iniciarsesion(pk)
{
    var localStorade = window.localStorage;
    document.getElementById('access').classList.add('d-none');
    document.getElementById('pwd').classList.add('d-none');
    htmlPromise("select (nombres,apellidos) from duenos where usuario_correo="+pk)
          .then( data => {
            if(data[0]=="200"){
                var userinfo = data[1];
                localStorage.clear();
                localStorage.setItem('u_correo', pk);
                localStorage.setItem('nombre', userinfo[0][0].split(" ")[0]+" "+userinfo[0][1].split(" ")[0]);
                localStorage.setItem('virgen',false);
                window.location.replace("../index.html");
            }
            else{
                //no hay info del usuario - primer acceso
                localStorage.clear();
                localStorage.setItem('u_correo', pk);
                localStorage.setItem('virgen',true);
                window.location.replace("../index.html");
            }
          });    
}
function recuperarPin() {
    $('#modal').modal();
}
function recuperarPin_buscarmail(mail)
{
    if(mail==""){document.getElementById('modal-mail').classList.add('border-danger');return;}
    if (ValidarMail(mail)){
        document.getElementById('modal-mail').classList.add('border-success');
        document.getElementById('modal-mail').classList.remove('border-danger');
        //buscar mail
        htmlPromise("select * from usuarios where correo="+mail)
        .then( data => {
            if(data[0]=="200"){
                //reemplazar pin
                htmlPromiseProcces("pinrecover="+document.getElementById('modal-mail').value)
                document.getElementById('modal-mail').value="";
                document.getElementById('modal-mail').classList.add('d-none')
                document.getElementById('modal-content').innerHTML = "¡Listo! Hemos enviado tu nuevo pin a tu correo electrónico";
            }else{
                document.getElementById('modal-content').innerHTML = "No encontramos este correo, inténtalo con otro";
                document.getElementById('modal-mail').classList.remove('border-success');
                document.getElementById('modal-mail').classList.add('border-danger');
            }
        });
    }
}