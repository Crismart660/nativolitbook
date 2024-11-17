const checkboxAdmin = document.querySelector("#isAdmin"); // Checkbox de administrador
const formRegister = document.querySelector(".form-register");
const inputUser = document.querySelector(
  '.form-register input[name="userName"]'
);
const inputEmail = document.querySelector(
  '.form-register input[name="userEmail"]'
);
const inputPass = document.querySelector(
  '.form-register input[name="userPassword"]'
);

const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex = /^.{4,12}$/;

const estadoValidacionCampos = {
  userName: false,
  userEmail: false,
  userPassword: false,
};

document.addEventListener("DOMContentLoaded", () => {
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarFormulario(formRegister);
  });

  inputUser.addEventListener("input", () => {
    validarCampo(
      userNameRegex,
      inputUser,
      "El nombre de usuario debe tener entre 4 y 16 caracteres."
    );
  });

  inputEmail.addEventListener("input", () => {
    validarCorreoAdmin(inputEmail); // Usamos la nueva función para validar el correo
  });

  inputPass.addEventListener("input", () => {
    validarCampo(
      passwordRegex,
      inputPass,
      "La contraseña debe tener entre 4 y 12 caracteres."
    );
  });
});

// Función para validar el campo de correo electrónico
function validarCorreoAdmin(inputEmail) {
  const emailValue = inputEmail.value;
  const esAdmin = checkboxAdmin.checked;
  const errorDiv = document.querySelector("#userEmailError");

  // Si el checkbox está marcado como "Administrador"
  if (esAdmin) {
    // Verificar que el correo tiene el dominio adecuado
    const adminEmailRegex = /^[a-zA-Z0-9_.+-]+@nativolitbook\.com$/;

    if (emailValue !== "" && adminEmailRegex.test(emailValue)) {
      errorDiv.style.display = "none"; // Ocultar el mensaje de error
      estadoValidacionCampos.userEmail = true;
      inputEmail.parentElement.classList.remove("error");
    } else {
      errorDiv.textContent = "Registrate como se te fue indicado."; // Mostrar mensaje para correo administrador
      errorDiv.style.display = "block";
      estadoValidacionCampos.userEmail = false;
      inputEmail.parentElement.classList.add("error");
    }
  } else {
    // Validar el correo electrónico estándar si no es administrador
    if (emailRegex.test(emailValue)) {
      errorDiv.style.display = "none"; // Ocultar el mensaje de error
      estadoValidacionCampos.userEmail = true;
      inputEmail.parentElement.classList.remove("error");
    } else {
      errorDiv.textContent =
        "El correo electrónico debe tener un formato válido."; // Mensaje de error para usuarios
      errorDiv.style.display = "block";
      estadoValidacionCampos.userEmail = false;
      inputEmail.parentElement.classList.add("error");
    }
  }
}

function validarCampo(regularExpresion, campo, mensaje) {
  const esValido = regularExpresion.test(campo.value);
  const errorDiv = document.querySelector(`#${campo.name}Error`);

  if (esValido) {
    errorDiv.style.display = "none";
    estadoValidacionCampos[campo.name] = true;
    campo.parentElement.classList.remove("error");
  } else {
    estadoValidacionCampos[campo.name] = false;
    campo.parentElement.classList.add("error");
    errorDiv.textContent = mensaje;
    errorDiv.style.display = "block";
  }
}

function enviarFormulario(form) {
  const globalMessage = document.querySelector("#globalMessageRegister");

  if (
    estadoValidacionCampos.userName &&
    estadoValidacionCampos.userEmail &&
    estadoValidacionCampos.userPassword
  ) {
    const formData = new FormData(form);

    fetch("/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la solicitud");
        return response.json();
      })
      .then((data) => {
        globalMessage.textContent = data.success
          ? "Te registraste correctamente"
          : data.error || "Hubo un error al procesar tu registro.";
        globalMessage.style.display = "block";

        if (data.success) {
          globalMessage.className = "alerta alerta-exito show";
          form.reset();
          estadoValidacionCampos.userName =
            estadoValidacionCampos.userEmail =
            estadoValidacionCampos.userPassword =
              false;
        } else {
          globalMessage.className = "alerta alerta-error show";
        }

        setTimeout(() => {
          globalMessage.style.display = "none";
          globalMessage.classList.remove("show");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        globalMessage.textContent = "Hubo un error al procesar tu registro.";
        globalMessage.style.display = "block";
        globalMessage.className = "alerta alerta-error show";

        setTimeout(() => {
          globalMessage.style.display = "none";
          globalMessage.classList.remove("show");
        }, 3000);
      });
  } else {
    globalMessage.textContent = "Todos los campos son obligatorios";
    globalMessage.style.display = "block";
    globalMessage.className = "alerta alerta-error show";

    setTimeout(() => {
      globalMessage.style.display = "none";
      globalMessage.classList.remove("show");
    }, 3000);
  }
}
