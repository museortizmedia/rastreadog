  //Solicitudes
  //sincronas
  function httpGet(theUrl)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    var respuesta=xmlHttp.response;
    const res = JSON.parse(respuesta.toString());
    return res;
  }

  //asíncronas
  //requiered <script src="./js/bd_config.js"></script>
  const htmlPromise = (func) => {
    return new Promise(async  (resolve, reject) => {
      const api = await fetch(db_url+'?u='+db_u+'&p='+db_c+'&func='+func.replaceAll(" ","%20"));
      const data = await(api.json() );
      resolve(data);
      reject(error);
    })
  };
  //uso
  /*htmlPromise('function')
  .then( data => {
    console.log(data);
  });*/
  const htmlPromiseProcces = (info) => {
    return new Promise(async  (resolve, reject) => {
      const api = await fetch(db_url+'?u='+db_u+'&p='+db_c+'&'+info.replaceAll(" ","%20"));
      const data = await(api.json() );
      resolve(data);
      reject(error);
    })
  };
  
  //contacto
  const pqrs = () =>
  {    
    if(document.getElementById('pqrs_email').value!="" && document.getElementById('pqrs_nombre').value!="" && document.getElementById('pqrs_body').value!="")
    {
      if(document.getElementById('pqrsTyC').checked!=false)
      {
        //extrae valores del formulario
        var umail = document.getElementById('pqrs_email').value;
        document.getElementById('pqrs_email').value = "";
        var ucontent = "De: "+document.getElementById('pqrs_nombre').value+" Mensaje: "+document.getElementById('pqrs_body').value;
        document.getElementById('pqrs_nombre').value = "";
        document.getElementById('pqrs_body').value = "";
        document.getElementById('pqrsTyC').checked=false;

        var mc = MailContact("museortiz@gmail.com", umail, ucontent);
        if(mc="100"){alert('mail enviado con éxito')}else{alert('hubo un problema al comunicarse')}

        }else{
          alert('Debes aceptar el tratamiento de datos antes');
        }
      }else{
        alert('completa todos los campos');
    }
  }

  //Utilites
function changeFavicon(src)
{
     var link = document.createElement('link'),
     oldLink = document.getElementById('dynamic-favicon');
     link.id = 'dynamic-favicon';
     link.rel = 'shortcut icon';
     link.href = src;
     if (oldLink) {document.head.removeChild(oldLink);}
    document.head.appendChild(link);
}
function ValidarMail(email)
{
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {return true;} else { return false;}
}