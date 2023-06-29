$(document).ready(function(){
    $("#btnhide").click(function(){
        $(document).ready(function(){
        $(".formulario").hide(5000); 
        // 5000 milisegundos = 5 segundos
    });
    })
});

$(document).ready(function(){
    $("#btnview").click(function(){
        $(document).ready(function(){
        $(".formulario").show(5000); 
        // 5000 milisegundos = 5 segundos
    });
    })
});

/* VALIDACION FORMULARIO WEB */

    /* DECLARACION DE VARIABLES */
    const nombres = document.getElementById("nombres");
    const apellido_paterno = document.getElementById("apellido_paterno");
    const apellido_materno = document.getElementById("apellido_materno");
    const rut = document.getElementById("rut");
    const direccion = document.getElementById("direccion");
    const correo = document.getElementById("correo");
    const celular = document.getElementById("celular");
    const formulario = document.getElementById("formulario");
    const listInputs = document.querySelectorAll(".txt_field");

    /* FUNCION PRINCIPAL */
    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); /* EVITA QUE EL FORMULARIO SE ENVIE AUTOMATICAMENTE */
    
        /* FUNCION QUE MUESTRA UN MENSAJE DE ERROR DEBAJO DE UN CAMPO SI NO CUMPLE UNA DE LAS CONDICIONES(IF) */
        function mostrarError(campo, mensaje) {
            const error = campo.parentNode.querySelector(".error-message");
            if (!error) {
            const nuevoError = document.createElement("p");
            nuevoError.className = "error-message";
            nuevoError.innerText = mensaje;
            campo.parentNode.insertBefore(nuevoError, campo.nextSibling);
            } else {
            error.innerText = mensaje;
            }
        }

        /* FUNCION QUE ELIMINA LOS MENSAJES DE ERROR CUANDO YA SE CUMPLEN LAS CONDICIONES */
        function limpiarErrores() {
            const errores = document.querySelectorAll(".error-message");
            errores.forEach(function(error) {
            error.remove();
            });
        }

        /* VALIDACION CAMPO DE NOMBRES //  DEBE TENER DATOS , SOLO PUEDE CONTENER LETRAS , DEBE TENER A LO MENOS 3 CARACTERES */
            if (nombres.value.trim() === "") { 
                mostrarError(nombres, "Por favor, ingresa tu nombre");
                nombres.focus();
                return false;
            } else if (!/^[A-Za-z]+(\s[A-Za-z]+)?$/.test(nombres.value.trim())) { /* ESE SIMBOLO + ENTRE MEDIO DE LA VALIDACION DE LETRAS ES PARA EL ESPACIO DE LOS 2 NOMBRES*/
                mostrarError(nombres, "El nombre solo puede contener letras y un espacio opcional");
                nombres.focus();
                return false;
            } else if (nombres.value.trim().length < 3) { 
                mostrarError(nombres, "El nombre debe tener al menos 3 caracteres");
                nombres.focus();
                return false;
            } else {
                // Si no hay errores, se elimina el mensaje de error
                const error = nombres.parentNode.querySelector(".error-message");
                if (error) {
                error.remove();
                }
            }
      
        /* VALIDACION CAMPO DE APELLIDO PATERNO //  DEBE TENER DATOS , SOLO PUEDE CONTENER LETRAS , DEBE TENER A LO MENOS 3 CARACTERES */
            if (apellido_paterno.value.trim() === "") { 
                mostrarError(apellido_paterno, "Por favor, ingresa tu apellido paterno");
                apellido_paterno.focus();
                return false;
            } else if (!/^[A-Za-z]+$/.test(apellido_paterno.value.trim())) { 
                mostrarError(apellido_paterno, "El apellido paterno solo puede contener letras");
                apellido_paterno.focus();
                return false;
            } else if (apellido_paterno.value.trim().length < 3) { 
                mostrarError(apellido_paterno, "El apellido paterno debe tener al menos 3 caracteres");
                apellido_paterno.focus();
                return false;
            } else {
                // Si no hay errores, se elimina el mensaje de error
                const error = apellido_paterno.parentNode.querySelector(".error-message");
                if (error) {
                error.remove();
                }
            }

        /* VALIDACION CAMPO DE APELLIDO MATERNO //  DEBE TENER DATOS , SOLO PUEDE CONTENER LETRAS , DEBE TENER A LO MENOS 3 CARACTERES */
            if (apellido_materno.value.trim() === "") { 
                mostrarError(apellido_materno, "Por favor, ingresa tu apellido materno");
                apellido_materno.focus();
                return false;
            } else if (!/^[A-Za-z]+$/.test(apellido_materno.value.trim())) { 
                mostrarError(apellido_materno, "El apellido materno solo puede contener letras");
                apellido_materno.focus();
                return false;
            } else if (apellido_materno.value.trim().length < 3) { 
                mostrarError(apellido_materno, "El apellido materno debe tener al menos 3 caracteres");
                apellido_materno.focus();
                return false;
            } else {
                // Si no hay errores, se elimina el mensaje de error
                const error = apellido_materno.parentNode.querySelector(".error-message");
                if (error) {
                error.remove();
                }
            }

        /* VALIDACION CAMPO DE RUT // DEBE TENER DATOS, DEBE TENER 8 O 9 CARACTERERES, EL ULTIMO CARACTER PUEDE SER LA LETRA "K" O UN NUMERO DEL "0" AL "9"*/
            if (rut.value.trim() === "") {
                mostrarError(rut, "Por favor, ingresa tu RUT");
                rut.focus();
                return false;
            } else if (!/^(\d{8}|\d{8}K|\d{9})$/.test(rut.value.trim())) {
                mostrarError(rut, "El RUT debe tener 8 o 9 caracteres y el ultimo digito tiene que ser la letra 'K' o un numero del 0 al 9");
                rut.focus();
                return false;
            } else {
                // Si no hay errores, se elimina el mensaje de error
                const error = rut.parentNode.querySelector(".error-message");
                if (error) {
                error.remove();
                }
            }
        
        /* VALIDACION CAMPO DE CORREO // DEBE TENER DATOS */
            if (correo.value.trim() === "") {
            alert("Por favor, ingresa tu correo electrónico");
            correo.focus();
            return false;
            }
      
        /* VALIDACION CAMPO DE CELULAR // DEBE TENER DATOS, DEBE TENER 9 CARACTERES NUMERICOS OBLIGATORIAMENTE*/
            if (celular.value.trim() === "") {
                mostrarError(celular, "Por favor, ingresa tu número de celular");
                celular.focus();
                return false;
            } else if (!/^\d{9}$/.test(celular.value.trim())) {
                mostrarError(celular, "El número de celular debe estar en el formato de 9 números");
                celular.focus();
                return false;
            } else {
                // Si no hay errores, se elimina el mensaje de error
                const error = celular.parentNode.querySelector(".error-message");
                if (error) {
                error.remove();
                }
            }
      
        
        /* AVISA MEDIANTE UNA ALERTA QUE EL FORMULARIO SE ENVIO EXITOSAMENTE */
        alert("¡Formulario enviado con éxito!");

        /* SE ENVIA EL FORMULARIO CON EL METODO GET ACTUALIZANDO LA URL :) */
        formulario.submit();
       

    });