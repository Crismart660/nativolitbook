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
      "El nombre de usuario debe tener entre 4 y 16 caracteres, y solo puede contener letras, números, guiones bajos y guiones."
    );
  });

  inputEmail.addEventListener("input", () => {
    validarCampo(emailRegex, inputEmail, "El correo electrónico no es válido.");
  });

  inputPass.addEventListener("input", () => {
    validarCampo(
      passwordRegex,
      inputPass,
      "La contraseña debe tener entre 4 y 12 caracteres."
    );
  });
});

function validarCampo(regularExpresion, campo, mensaje) {
  const esValido = regularExpresion.test(campo.value);
  const errorDiv = document.querySelector(`#${campo.name}Error`);

  if (esValido) {
    errorDiv.style.display = "none"; // Ocultar mensaje de error
    estadoValidacionCampos[campo.name] = true;
    campo.parentElement.classList.remove("error");
  } else {
    estadoValidacionCampos[campo.name] = false;
    campo.parentElement.classList.add("error");
    errorDiv.textContent = mensaje; // Mostrar el mensaje de error
    errorDiv.style.display = "block"; // Hacer visible el mensaje de error
  }
}

function enviarFormulario(form) {
  const globalMessage = document.querySelector("#globalMessage");

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
      .then((response) => response.json())
      .then((data) => {
        globalMessage.textContent = data.success
          ? "Te registraste correctamente"
          : data.error || "Hubo un error al procesar tu registro.";
        globalMessage.style.display = "block";

        if (data.success) {
          globalMessage.className = "alerta alerta-exito show";
        } else {
          globalMessage.className = "alerta alerta-error show";
        }

        setTimeout(() => {
          globalMessage.style.display = "none"; // Ocultar el mensaje después de 3 segundos
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
