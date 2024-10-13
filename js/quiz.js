// Inicializar EmailJS con tu Public Key
(function () {
    emailjs.init("8sY4aDZcbqZ3TZ57z"); // Reemplaza con tu Public Key
})();

const preguntas = [
    {
        pregunta: "¿Cuál es el nombre completo del amor de tu vida?",
        opciones: [
            "Jesús Alejandro Fuentes Virgen",
            "Jesús Alejandro Virgen Fuentes"
        ],
        correcta: "Jesús Alejandro Fuentes Virgen"
    },
    {
        pregunta: "¿Qué día cumplo años?",
        opciones: [
            "6 de agosto",
            "6 de noviembre",
            "6 de septiembre",
            "16 de noviembre"
        ],
        correcta: "6 de noviembre"
    },
    {
        pregunta: "¿En qué año nací?",
        opciones: [
            "2004",
            "2002",
            "2023",
            "2003"
        ],
        correcta: "2003"
    },
    {
        pregunta: "¿Me gusta Satoru Gojo?",
        opciones: [
            "Sí",
            "No"
        ],
        correcta: "Sí"
    },
    {
        pregunta: "¿Qué comida me gusta más?",
        opciones: [
            "Pizza",
            "Sushi",
            "Hamburguesa",
            "Tacos",
            "Todas son correctas"
        ],
        correcta: "Todas son correctas"
    },
    {
        pregunta: "¿Qué anime me gusta más?",
        opciones: [
            "Dragon Ball",
            "Jujutsu Kaisen",
            "Naruto",
            "One Piece"
        ],
        correcta: "Dragon Ball"
    },
    {
        pregunta: "¿Qué es lo que más me gusta de ti?",
        opciones: [
            "Tus ojos",
            "Tus chichis",
            "Tu cabello",
            "Todo de ti",
            "Todo es correcto"
        ],
        correcta: "Todo es correcto"
    },
    {
        pregunta: "¿Me juntaría con alguien de color café?",
        opciones: [
            "Sí",
            "No"
        ],
        correcta: "No"
    },
    {
        pregunta: "¿Qué me gusta más?",
        opciones: [
            "KFC",
            "McDonald's"
        ],
        correcta: "McDonald's"
    },
    {
        pregunta: "Si tuviera 10,000,000 millones de dólares, ¿qué haría?",
        opciones: [
            "Comprar un dulce",
            "Comprar una hamburguesa",
            "Comprarme una PC y después consentirte en todos tus caprichos",
            "Ir a Japón"
        ],
        correcta: "Comprarme una PC y después consentirte en todos tus caprichos"
    },
    {
        pregunta: "Te amo porque eres mi...",
        opciones: [
            "Chiniwini",
            "Amor de mi vida",
            "Cosa hermosa y preciosa",
            "Cosa enojona",
            "Todas son correctas"
        ],
        correcta: "Todas son correctas"
    }
];

let preguntaActual = 0;
let tiempoTotal = 15; // Tiempo total en segundos
let tiempoRestante = tiempoTotal;
let intervalo = 100; // Intervalo de actualización de 100 milisegundos
let progreso = 100; // Progreso inicial de la barra
let decrecimiento = (100 / (tiempoTotal * 1000 / intervalo)); // Cantidad que baja por intervalo
let intervaloID; // ID del intervalo para poder detenerlo cuando sea necesario
let aciertos = 0;
let respuestasUsuario = []; // Guardar las respuestas del usuario

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    document.getElementById("question").innerText = pregunta.pregunta;

    const opcionesContainer = document.getElementById("options");
    opcionesContainer.innerHTML = ''; // Limpiar las opciones anteriores

    pregunta.opciones.forEach((opcion, index) => {
        const radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = "respuesta";
        radioBtn.value = opcion;
        radioBtn.id = "opcion" + index;

        const label = document.createElement("label");
        label.htmlFor = radioBtn.id;
        label.innerText = opcion;

        opcionesContainer.appendChild(radioBtn);
        opcionesContainer.appendChild(label);
        opcionesContainer.appendChild(document.createElement("br"));
    });

    // Restablecer el temporizador y la barra de progreso
    tiempoRestante = tiempoTotal;
    progreso = 100;
    actualizarBarra();

    // Iniciar el temporizador
    clearInterval(intervaloID);
    intervaloID = setInterval(actualizarTemporizador, intervalo);
}

function actualizarBarra() {
    const progressBar = document.getElementById("progress");
    progressBar.style.width = progreso + "%"; // Actualizar el ancho de la barra
}

function actualizarTemporizador() {
    progreso -= decrecimiento; // Reducir el progreso en cada intervalo
    actualizarBarra();

    tiempoRestante -= intervalo / 1000; // Convertir milisegundos a segundos

    if (tiempoRestante <= 0) {
        clearInterval(intervaloID); // Detener el temporizador
        validarRespuesta();
    }
}

function validarRespuesta() {
    const seleccionada = document.querySelector('input[name="respuesta"]:checked');
    if (seleccionada) {
        respuestasUsuario.push({
            pregunta: preguntas[preguntaActual].pregunta,
            respuestaUsuario: seleccionada.value,
            respuestaCorrecta: preguntas[preguntaActual].correcta
        });

        if (seleccionada.value === preguntas[preguntaActual].correcta) {
            aciertos++;
            mostrarAlerta("¡Correcto!", "success"); // Mostrar alerta de éxito
        } else {
            mostrarAlerta("Te equivocaste :(", "error"); // Mostrar alerta de error
        }
    } else {
        mostrarAlerta("No seleccionaste ninguna respuesta", "error");
    }
}

function mostrarAlerta(mensaje, tipo) {
    const alerta = document.getElementById("alerta");
    alerta.innerText = mensaje;
    alerta.className = tipo + " mostrar"; // Asignar clase de éxito o error

    // Mostrar la alerta durante 2 segundos
    setTimeout(() => {
        alerta.className = alerta.className.replace("mostrar", "");
        pasarSiguientePregunta(); // Pasar a la siguiente pregunta después de la alerta
    }, 2000);
}

function pasarSiguientePregunta() {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultadosFinales();
    }
}

function mostrarResultadosFinales() {
    // Redirigir a la página de resultados con los aciertos y el total de preguntas
    window.location.href = `resultados.html?aciertos=${aciertos}&total=${preguntas.length}`;
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarPregunta();
});
