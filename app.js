let numeroSecreto;
let intentos;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > 10) {
        mostrarMensajeError('Por favor, ingresa un número válido entre 1 y 10.');
        return;
    }
    ocultarMensajeError();
    console.log(numeroDeUsuario);
    console.log(typeof(numeroDeUsuario));
    console.log(numeroDeUsuario === numeroSecreto);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('reiniciar').focus(); // Seleccionar el botón "Nuevo juego"
        listaNumerosSorteados.push(numeroDeUsuario); // Agregar el número acertado a la lista
        actualizarNumerosSorteados(); // Actualizar la lista de números sorteados
        if (listaNumerosSorteados.length == numeroMaximo) {
            document.getElementById('valorUsuario').setAttribute('disabled', true); // Deshabilitar el input
            document.getElementById('botonIntentar').setAttribute('disabled', true); // Deshabilitar el botón "Intentar"
        }
    } else if (numeroDeUsuario > numeroSecreto) {
        asignarTextoElemento('p', 'El número secreto es menor');
    } else {
        asignarTextoElemento('p', 'El número secreto es mayor');
    }
    intentos++;
    limpiarCaja();
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()* numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles, actualice página para volver a jugar');
        document.getElementById("botonIntentar").setAttribute("disabled", true);
        return;
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            return numeroGenerado;
        }
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        verificarIntento();
    }
}

function condicionesIniciales () {
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Elige un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    console.log(`El número secreto es: ${numeroSecreto}`);
    console.log(typeof numeroSecreto);
    intentos = 1;
    actualizarNumerosSorteados(); // Inicializar la lista de números sorteados
    document.getElementById('valorUsuario').focus(); // Posicionar el cursor en el input al cargar la página
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('valorUsuario').removeAttribute('disabled'); // Habilitar el input
    document.getElementById('botonIntentar').removeAttribute('disabled'); // Habilitar el botón "Intentar"
    document.getElementById('valorUsuario').focus(); // Posicionar el cursor en el input
    return;
}

function actualizarNumerosSorteados() {
    asignarTextoElemento('.numeros-sorteados', `Números acertados: ${listaNumerosSorteados.join(', ')}`);
}

function mostrarMensajeError(mensaje) {
    let mensajeError = document.querySelector('.mensaje-error');
    mensajeError.innerHTML = mensaje;
    mensajeError.style.display = 'block';
}

function ocultarMensajeError() {
    let mensajeError = document.querySelector('.mensaje-error');
    mensajeError.style.display = 'none';
}

condicionesIniciales();