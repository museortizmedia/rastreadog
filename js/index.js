const qr_image = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=";
let images_portada = ["image/portada_1.png","image/portada_2.png","image/portada_3.png","image/portada_4.png","image/portada_5.png"], current_portada=0;
var presentation_slider = setInterval(myTimer, 5000);

function myTimer() {
    presentation_btn(true);
}
function presentation_btn(r)
{
    clearInterval(presentation_slider);
    presentation_slider = setInterval(myTimer, 7000);
    if(r){current_portada++;if(current_portada==images_portada.length){current_portada=0}}else{current_portada--;if(current_portada<0){current_portada=images_portada.length-1}}
    //console.log(current_portada + " "+images_portada.length);
    document.getElementById('portada_img').src = images_portada[current_portada];
}

function iniciar()
{
    //iniciar consola
    console.log("%cALERTA", "font-size:40px;color:yellow;");
    console.log("%cTenga cuidado al usar esta consola, podría ser víctima de suplantación de identidad y robo de información. No escriba un código que no entienda.", "font-size:25px;color:black;background-color:#CC4;");

    //intento de recoger sesión iniciada
    var localStorade = window.localStorage;
    var name = localStorage.getItem('nombre');
    var u_correo = localStorade.getItem('u_correo');
    var u_id = localStorade.getItem('u_id');
    var virgen = localStorage.getItem('virgen');

    //mientras si exista sesión iniciada cambiar menu
    if(name!=null)
    {
        //console.log('usuario antiguo')
         document.getElementById('NavUsername').innerHTML = name;
         document.getElementById('NavUsername').classList.add("text-uppercase");
         document.getElementsByClassName('LogReg_navBar')[0].classList.add("d-none");
         document.getElementsByClassName('LogReg_navBar')[1].classList.add("d-none");
         document.getElementsByClassName('LogReg_navBar')[2].classList.remove("d-none");
         document.getElementsByClassName('LogReg_navBar')[3].classList.remove("d-none");
         document.getElementsByClassName('LogReg_navBar')[4].classList.remove("d-none");
        //confirmar el dueno id
        if(u_id==null)
        {
            var u_id = httpGet("https://script.google.com/macros/s/AKfycbxJr7WjDsNpRdAEAQqBoMlXeiAj6mV6Zhozr0LU34XURDEb9GF3bVhUbJ94CeeqvS2p/exec?u=root&p=menealacola&func="+("select (id) from duenos where usuario_correo="+window.localStorage.getItem('u_correo')).replaceAll(" ","%20"));
            if(u_id[0]=="200"){u_id=u_id[1]; localStorage.setItem('u_id', u_id);}
        }
        
        //traer info de mascotas
        if(localStorade.getItem('mascotas')==null)
        {
            let consultamascotas = "https://script.google.com/macros/s/AKfycbxJr7WjDsNpRdAEAQqBoMlXeiAj6mV6Zhozr0LU34XURDEb9GF3bVhUbJ94CeeqvS2p/exec?u=root&p=menealacola&func="+("select (nombre,placa) from mascotas where id_dueño="+u_id).replaceAll(" ","%20");
            var request = httpGet(consultamascotas);
            if(request[0]=="200")
            {
                localStorade.setItem('mascotas',JSON.stringify(request[1]));
                for (var i = 0; i <= request[1].length-1; i++) {
                //<a class="dropdown-item text-muted" href="page/register_pet.html">añadir una mascota</a>
                var element = document.createElement("a");
                element.classList.add('dropdown-item');
                element.setAttribute('onclick','mascota_click("'+request[1][i][1]+'")');
                element.setAttribute('style','cursor:pointer;')
                var text = document.createTextNode(request[1][i][0]);
                element.appendChild(text);
                document.getElementById('dpmenu_mascotas').appendChild(element);}

            }else{
                //console.log('El usuario no tiene mascotas');
                //document.getElementsByClassName('LogReg_navBar')[2].classList.add("d-none");
            }
        }else{
            const request = JSON.parse(localStorade.getItem('mascotas'));
            //console.log('Cargando mascotas antiguas');
            for (var i = 0; i <= request.length-1; i++) {
                
                var element = document.createElement("a");
                element.classList.add('dropdown-item');
                element.setAttribute('onclick','mascota_click("'+request[i][1]+'")');
                element.setAttribute('style','cursor:pointer;')
                var text = document.createTextNode(request[i][0]);
                element.appendChild(text);
                document.getElementById('dpmenu_mascotas').appendChild(element);
                }
        }

    }
    //primera vez de un usuario
    if(virgen=='true')
    {
        //console.log('Usuario sin perfil');
        document.getElementsByClassName('LogReg_navBar')[0].classList.add("d-none");
        document.getElementsByClassName('LogReg_navBar')[1].classList.add("d-none");
        document.getElementsByClassName('LogReg_navBar')[3].classList.remove("d-none");
        document.getElementsByClassName('LogReg_navBar')[4].classList.remove("d-none");
        document.getElementById('slide_button').classList.add('d-none');
        document.getElementById('alert').classList.remove('d-none');
    }

    //setfavicon
    var today = new Date();
    var ddmm = String(today.getDate()).padStart(2, '0')+String(today.getMonth() + 1).padStart(2, '0');
    //fines de semanas
    if(today.getDay()==6 || today.getDay()==0){changeFavicon('https://museortizmedia.github.io/registradog/https://museortizmedia.github.io/registradog/image/icon/Ronnie_sport.png');}    
    if(ddmm=='2412'||ddmm=='2512'){ changeFavicon('https://museortizmedia.github.io/registradog/image/icon/Ronnie_navidad.png');}else
    if(ddmm=='3110'){changeFavicon('https://museortizmedia.github.io/registradog/image/icon/Ronnie_helloween.png');}else
    if(ddmm=='1709'||ddmm=='1402'){ changeFavicon('https://museortizmedia.github.io/registradog/image/icon/Ronnie_inlove.png');}else
    {
        //festividades
    }
}
function BTN_cerrar_sesion()
{
    var localStorade = window.localStorage;
    localStorage.clear();
    location.reload();
}
function mascota_click(placa) {
    //console.log(placa)
    //let url_qr = qr_image+"url="+placa;
    //traer info a usar mascota
    var mascotaescogida = httpGet("https://script.google.com/macros/s/AKfycbxJr7WjDsNpRdAEAQqBoMlXeiAj6mV6Zhozr0LU34XURDEb9GF3bVhUbJ94CeeqvS2p/exec?u=root&p=menealacola&func="+("select * from mascotas where placa="+placa).replaceAll(" ","%20"));
    if(mascotaescogida[0]=="200"){mascotaescogida=mascotaescogida[1].toString().split(",");}else{alert("error "+mascotaescogida[0]);}
    //cambiar favicon        
    if(mascotaescogida[6]=='macho')
    {
        changeFavicon('https://museortizmedia.github.io/registradog/image/icon/'+mascotaescogida[9]+'.png');
    }else{
        changeFavicon('https://museortizmedia.github.io/registradog/image/icon/'+mascotaescogida[9]+'_girl.png');
    }
    //mostrar QR
    document.getElementById('slide_qr').classList.remove('d-none');
    document.getElementById('slide_button').classList.add('d-none');
    document.getElementById('slide_qr').src = "https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl="+window.location.href.substring(0, window.location.href.lastIndexOf('/'))+"/"+"page/scan.html"+"?placa="+mascotaescogida[8];
    document.getElementById('slide_qr_text').innerHTML = "Este es el QR de <span style='font-size: 24px' class='text-muted'> tu mascota "+mascotaescogida[1]+"</span>";
}