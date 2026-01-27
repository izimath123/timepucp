const horaInicioInput = document.getElementById("horaInicio");
const horaFinInput = document.getElementById("horaFin");

let intervaloCuenta;
let tiempoTotal = 0;


const horaActualEl = document.getElementById("horaActual");
const contadorEl = document.getElementById("contador");
const barraEl = document.getElementById("barraProgreso");

function iniciarCuentaRegresiva() {
    clearInterval(intervaloCuenta);

    const ahora = new Date();
    const hoy = ahora.toISOString().split("T")[0];

    const inicio = new Date(`${hoy}T${horaInicioInput.value}`);
    const fin = new Date(`${hoy}T${horaFinInput.value}`);

    if (fin <= inicio) {
        contadorEl.textContent = "00:00:00";
        barraEl.style.width = "0%";
        return;
    }

    tiempoTotal = fin - inicio;

    intervaloCuenta = setInterval(() => {
        const ahora = new Date();
        const restante = fin - ahora;

        if (restante <= 0) {
            contadorEl.textContent = "00:00:00";
            barraEl.style.width = "100%";
            clearInterval(intervaloCuenta);
            return;
        }

        const horas = String(Math.floor(restante / 3600000)).padStart(2, "0");
        const minutos = String(Math.floor((restante % 3600000) / 60000)).padStart(2, "0");
        const segundos = String(Math.floor((restante % 60000) / 1000)).padStart(2, "0");

        contadorEl.textContent = `${horas}:${minutos}:${segundos}`;

        const progreso = ((tiempoTotal - restante) / tiempoTotal) * 100;
        barraEl.style.width = `${progreso}%`;
    }, 1000);
}


let intervaloHora;
let intervaloTimer;

function actualizarHoraActual() {
    const ahora = new Date();
    horaActualEl.textContent = ahora.toLocaleTimeString();
}

intervaloHora = setInterval(actualizarHoraActual, 1000);
actualizarHoraActual();

horaInicioInput.addEventListener("change", iniciarCuentaRegresiva);
horaFinInput.addEventListener("change", iniciarCuentaRegresiva);

const fechaInput = document.getElementById("fecha");
const fechaTexto = document.getElementById("fechaTexto");

/* Al hacer clic en el campo visible → abre calendario */
fechaTexto.addEventListener("click", () => {
    fechaInput.showPicker();
});

/* Al elegir fecha en el calendario */
fechaInput.addEventListener("change", () => {
    const valor = fechaInput.value; // yyyy-mm-dd
    if (!valor) return;

    const [anio, mes, dia] = valor.split("-");
    fechaTexto.value = `${dia}/${mes}/${anio}`;
});

const btnFullscreen = document.getElementById("btnFullscreen");

btnFullscreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        btnFullscreen.textContent = "⤫ Salir pantalla completa";
    } else {
        document.exitFullscreen();
        btnFullscreen.textContent = "⛶ Pantalla completa";
    }
});

/* Detectar salida por ESC */
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        btnFullscreen.textContent = "⛶ Pantalla completa";
    }
});

const btnDarkMode = document.getElementById("btnDarkMode");

// Cargar preferencia guardada
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    btnDarkMode.textContent = "☀️ Modo claro";
}

btnDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);

    btnDarkMode.textContent = isDark
        ? "☀️ Modo claro"
        : "🌙 Modo oscuro";
});
