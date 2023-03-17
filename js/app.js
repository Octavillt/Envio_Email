// DOMContentLoaded Se Ejecuta Cuando el Codigo HTML ha Sido Descargado por Completo 
document.addEventListener("DOMContentLoaded", function () {

    const email = { // Declara un Objeto con los Inputs del Formulario 
        email: '',
        asunto: '',
        mensaje: ''
    } // console.log(email);

    // Seleccionar los Elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    // console.log(inputEmail);
    const inputAsunto = document.querySelector("#asunto");
    // console.log(inputAsunto);
    const inputMensaje = document.querySelector("#mensaje");
    // console.log(inputMensaje);
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector('#formulario button[type="submit"]'); // Selecciona el Boton de tipo submit del id del formulario
    const btnReset = document.querySelector('#formulario button[type="reset"]'); // Selecciona el Boton de tipo reset del id del formulario
    const sppiner = document.querySelector('#spinner'); // Loading...



    // Asignacion de Eventos
    /*
    inputEmail.addEventListener("blur", function(e) {
        // console.log("Salí del Input");
        // console.log(e.target.value); // Imprime el valor de que se escribe en el Input
    });
    */

    // Manera más Reducida de Asiganar Eventos
    /*
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);
    */


    /*== addEventListener Asigna un Evento ala Variable del Componente ==*/
    // Con Input da una esperiencia más "En Timepo Real"
    inputEmail.addEventListener("input", validar); // Solo poner el Nombre de la Función NO mandarla a llamar, como esta manera validar() 
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);

    formulario.addEventListener('submit', enviarEmail);

    // Función para que al Momento de dar click resetea el Formulario
    btnReset.addEventListener('click', function (e) {
        e.preventDefault(); // Previene que se Reinicia el Formulario Por el HTML
        resetFormulario(); // Reincia el Objeto y Resetea el Formulario
    });
    // END Asignacion de Eventos

    function enviarEmail(e) {
        e.preventDefault();
        // console.log("Enviando...")
        sppiner.classList.add('flex'); // Agrega la Clase que Muestra el Spinner
        sppiner.classList.remove('hidden'); // Remueve la Clase que Oculta el Spinner
        setTimeout(() => { // Tiempo que Permanecerá el Sppiner y Resetear el Formulario
            sppiner.classList.remove('flex'); // Remueve la Clase que Muestra el Spinner
            sppiner.classList.add('hidden'); // Agrega la Clase que Oculta el Spinner
            resetFormulario(); // Reincia el Objeto y Resetea el Formulario

            // Crear una Alerta Mensaje Enviado
            // Crear una Etiqueta HTML con Javascript
            const alertaExito = document.createElement('P'); // Es recomendable que la Etiqueta HTML sea Mayuscula
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase'); // Agrega Clases de Estilo al Elemento alertaExito
            alertaExito.textContent = "Mensaje Enviado Correctamente!!"; // Contenido de la Etiqeta en este Caso P
            formulario.appendChild(alertaExito);// Agrega un Elemento al Formulario   
            setTimeout(() => { // Tiempo que Permanecerá la Alerta
                alertaExito.remove(); // Remove la Alerta Despues del Tiempo Asignado
            }, 2000);//-> 2s
        }, 3000); //-> 3s
    }

    function validar(e) {
        /*
        console.log(e.target.value); // Imprime el valor de que se escribe en cada Input
        console.log(e.target.id); // Imprime el Nombre del id
        console.log(e.target.parentElement.NextElementSibling); // Imprime el recorrido del DOM en profunidad
        */
        // Valida que el input No este Vacio
        if (e.target.value.trim() === '') { // trim Quitará Espacios en Blanco
            mostrarAlerta(`El Campo ${e.target.id} es Obligatorio.`, e.target.parentElement); // Manda los Paramentros ala Funcion con los Argumento del Mensaje y Argumento de la Referencia
            email[e.target.name] = ''; // Reinicia el Objeto Pricipal en caso de que se Borre lo que se encuentra escrito en el Input
            comprobarEmail(); // Comprueba que los Inputs NO estén Vacios
            return; // Solo Mostrará la Alerta y Detiene la Ejecución del Codigo
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) { // Valida que solo afecte al input con id -> email y que sea diferente de true
            mostrarAlerta(`El Email No es Valido.`, e.target.parentElement); // Manda los Paramentros ala Funcion con los Argumento del Mensaje y Argumento de la Referencia
            email[e.target.name] = ''; // Reinicia el Objeto Pricipal en caso de que se Borre lo que se Encuentra Escrito en el Input
            comprobarEmail(); // Comprueba que los Inputs NO estén Vacios
            return; // Solo Mostrará la Alerta y Detiene la Ejecución del Codigo
        }
        limpiarAlerta(e.target.parentElement);//Remueve la Alerta Dependiendo del Parametro de referencia que se le pase y/o en caso de que el Input ya no esté Vacio
        //console.log("Despues del IF");

        // Asignar Valores al Objeto email
        email[e.target.name] = e.target.value.trim().toLowerCase(); // Va Asignar el Valor de lo que se Escriba en el Input de cada name del formulario en cada Elemento del Objeto y Quita los Espacios en Blaco y Vuelve Todo el String a Minusculas
        // console.log(email);

        comprobarEmail();// Comprueba que los Inputs NO estén Vacios


    }
    // Alerta de Validaciones
    function mostrarAlerta(mensaje, referencia) { // Argumentos del Mensaje de cada Input y la Posicion de su Elemento segun el Traversing
        limpiarAlerta(referencia); // Remueve la Alerta Dependiendo del Parametro de referencia que se le pase y/o en caso de que el Input ya no esté Vacio

        // console.log("Hubo un Error...");
        // Crear una Etiqueta HTML con Javascript
        const error = document.createElement('P'); // Es recomendable que la Etiqueta HTML sea Mayuscula
        error.textContent = mensaje; // Muestra el Argumento del Mensaje en Especifico
        // console.log(error);
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center'); // Agrega Clases de Estilo al Elemento error
        // Inyectar el Error al Formulario
        // formulario.innerHTML = error.textContent; // Remplaza todo el Contenido
        referencia.appendChild(error); // Agrega un Elemento al Formulario   
    }
    // END Alerta de Validaciones

    // Cumprueba si ya Existe una Alerta
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600'); // Busca la Clase de la Referencia y la Asigna ala Variable alerta 
        // console.log(alerta);
        if (alerta) { // Si la Alerta ya Existe una Vez, Removera la Alerta que ya se ha llenado para No Generar Multiples de una misma Alerta
            alerta.remove();
        }
    }
    // END Cumprueba si ya Existe una Alerta

    // Cumprueba que el email sea un email Valido
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // Expresión Regular para Validar un Email
        const resultado = regex.test(email); // Devuelve true o false Dependiendo si cumple o no
        //console.log(resultado);
        return resultado; // La araible resultado retornará true o false
    }
    // END Cumprueba que el email sea un email Valido

    // Comprueba que los Inputs NO estén Vacios
    function comprobarEmail() {
        // console.log(Object.values(email).includes('')); // Toma todos los valores del Objeto y lo tranforma en Arreglo y con includes retorna true o false
        /*
        Object.keys -> retorna los Valores en Arreglo del Lado Izquierdo
        Object.values -> retorna los Valores en Arreglo del Lado Derecho
        includes('') -> Como ya es Arreglo, Validará si uno de los String del Arreglo esta Vacio o No y retorna True o False
        */

        // console.log(email);
        // Habilita la Clase opacity-50 en caso de que Uno de los Elementos del Arreglo este Vacio
        if (Object.values(email).includes('')) { 
            btnSubmit.classList.add('opacity-50'); // Agrega la Clase opacity-50
            btnSubmit.disabled = true; // Bloquea el Boton "Enviar"
            return;
        }
        //Dabilita la Clase opacity-50, Para que Vuelva "Visible"
        btnSubmit.classList.remove('opacity-50'); // Remueve la Clase opacity-50
        btnSubmit.disabled = false; // Desbloquea el Boton "Enviar"
    }
    // END Comprueba que los Inputs NO estén Vacios

    // Reincia el Objeto y Resetea el Formulario
    function resetFormulario() {
        // Reinicia Todos los Elementos del Objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset(); // Funcion para resetar los Inputs del Formulario
        comprobarEmail(); // Comprueba que los Inputs NO estén Vacios
    }
    // END Reincia el Objeto y Resetea el Formulario
});
// DOMContentLoaded END Se Ejecuta Cuando el Codigo HTML ha Sido Descargado por Completo
