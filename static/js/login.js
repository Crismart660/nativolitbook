const formLogin = document.querySelector(".form-login");
const inputEmail = document.querySelector(
  '.form-login input[name="userEmail"]'
);
const inputPass = document.querySelector(
  '.form-login input[name="userPassword"]'
);

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex = /^.{4,12}$/;

const estadoValidacionCampos = {
  userEmail: false,
  userPassword: false,
};

document.addEventListener("DOMContentLoaded", () => {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarFormulario(formLogin);
  });

  inputEmail.addEventListener("input", () => {
    validarCampo(
      emailRegex,
      inputEmail,
      "Por favor, ingresa un correo electrónico válido para iniciar sesión.",
      "userEmailError"
    );
  });

  inputPass.addEventListener("input", () => {
    validarCampo(
      passwordRegex,
      inputPass,
      "La contraseña debe tener entre 4 y 12 caracteres para continuar.",
      "userPasswordError"
    );
  });
});

function validarCampo(regularExpresion, campo, mensaje, errorId) {
  const esValido = regularExpresion.test(campo.value);
  const errorDiv = document.querySelector(`#${errorId}`);

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
  const globalMessage = document.querySelector("#globalMessageLogin");

  if (estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword) {
    const formData = new FormData(form);

    fetch("/login", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la solicitud");
        return response.json();
      })
      .then((data) => {
        globalMessage.textContent = data.success
          ? "Iniciaste sesión correctamente"
          : data.error || "Hubo un error al procesar tu inicio de sesión.";
        globalMessage.style.display = "block";

        if (data.success) {
          globalMessage.className = "alerta alerta-exito show";
          form.reset(); // Limpiar campos del formulario tras inicio de sesión exitoso
          estadoValidacionCampos.userEmail =
            estadoValidacionCampos.userPassword = false;

          // Redirigir a la nueva página de interfaz
          setTimeout(() => {
            window.location.href = "/interfaz.html"; // Aquí se realiza la redirección
          }, 2000); // Redirige después de 2 segundos para que el usuario vea el mensaje
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
        globalMessage.textContent =
          "Hubo un error al procesar tu inicio de sesión.";
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
