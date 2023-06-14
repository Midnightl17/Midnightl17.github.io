const LS = window.localStorage;
let clientes = [];
let videojuegos = [];
let datoCliente = [];
let datoVideojuegos = [];
let videojuegoSeleccionado;

// -- Traer registros del Local Storage si existen
if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}

if(LS.getItem('videojuegos')){
    videojuegos = JSON.parse(LS.getItem('videojuegos'))
}

const modClientes = document.querySelector('#clientes');
const modVideojuegos = document.querySelector('#videojuegos');


/**
 * SELECCION DE CLIENTES
 */
imprimirCliente(clientes);

const inputBuscar = document.querySelector('#buscar-clientes');
inputBuscar.addEventListener('keyup', buscarClientes);


const btnSelectCliente = document.querySelector('#select-cliente');
btnSelectCliente.addEventListener('click', () => {

    modClientes.classList.add('d-none');
    modVideojuegos.classList.remove('d-none');

    cargarClienteTicket();
});


function buscarClientes(){
    if (isNaN(inputBuscar.value)){
        busqueda = clientes.filter(function(cliente){
            return (
                cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) || 
                cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
            )
        });

        if(busqueda.length === 1){
            btnSelectCliente.classList.remove('disabled');
        } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
        }
        datoCliente = busqueda;
        imprimirCliente(busqueda);
    } else{
        let busqueda = clientes.filter(function(cliente){
            return cliente.identificacion.includes(inputBuscar.value);
            
        })
        if(busqueda.length === 1){
            btnSelectCliente.classList.remove('disabled');
        }
        else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
        }
        datoCliente = busqueda;
        imprimirCliente(busqueda);
    }
} 

function cargarClienteTicket(){
    const clienteDatos = document.querySelector('#clienteDatos');

    clienteDatos.innerHTML = `
                        <p><b>Documento:</b>${datoCliente[0].identificacion}</p>
                        <p><b>Nombres:</b>${datoCliente[0].nombres} ${datoCliente[0].apellidos}</p>
                        <p><b>Teléfono:</b>${datoCliente[0].telefono}</p>
                        <p><b>Email:</b>${datoCliente[0].email}</p>
                        <p><b>Nacionalidad:</b>${datoCliente[0].nacionalidad}</p>
    `
}


/**
 * SELECCION DE VIDEOJUEGOS
 */

imprimirVideojuegos(videojuegos);

const inputBuscarV = document.querySelector('#buscar-videojuegos');
inputBuscarV.addEventListener('keyup', buscarVideojuegos);

const btnSelectV = document.querySelector('#comprarTicket');
btnSelectV.addEventListener('click', () => {
    cargarVideojuegoTicket();
    
    document.querySelector('#form-tickets').classList.add('d-none');

    clientes.forEach((cliente,idx) => {
        if(cliente.id === datoCliente[0].id){
            clientes[idx].puntos += parseInt(datoVideojuegos[0].puntos)
        }
    })

    LS.setItem('clientes', JSON.stringify(clientes));
});


function buscarVideojuegos(){
    if (inputBuscarV.value) { // Estudiar!!!
        busqueda = videojuegos.filter(function (videojuego) {
            return videojuego.nombre.toLowerCase().includes(inputBuscarV.value.toLowerCase());
        });

        // Validar si es un sólo usuario
        if (busqueda.length === 1) {
            btnSelectV.classList.remove('disabled');
        } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectV.classList.contains('disabled')) {
            btnSelectV.classList.add('disabled');
        }

        datoVideojuegos = busqueda;

        imprimirVideojuegos(busqueda);
    }
} 

function cargarVideojuegoTicket() {
    const videojuegosDatos = document.querySelector('#videojuegosDatos');

    videojuegosDatos.innerHTML = `
        <p><b>Valor Videojuego:</b> ${datoVideojuegos[0].valor}</p>
        <p><b>+IVA:</b> ${datoVideojuegos[0].valor * 0.16}</p>
        <p><b>+Tasa adicional:</b> ${datoVideojuegos[0].valor * 0.04}</p>
        <p><b>Total:</b> ${datoVideojuegos[0].valor * 1.20}</p>
        <hr>
        <p><b>Puntos de Fidelización de Ruta:</b> ${datoVideojuegos[0].puntos}</p>
    `
}


// TablasMostrar

function imprimirCliente(dic){
    const tabla = document.getElementById("tabla-clientes");
    tabla.innerHTML = "";

    dic.forEach(cliente => {
        tabla.innerHTML += `<tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        </tr>`
    });
}

function imprimirVideojuegos(dic){
    const tabla = document.getElementById("tabla-videojuegos");
    tabla.innerHTML = "";
    dic.forEach(cliente => {
        tabla.innerHTML += `<tr>
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.tematica}</td>
        <td>${cliente.valor}</td>
        <td>${cliente.puntos}</td>
        </tr>`
    });
}