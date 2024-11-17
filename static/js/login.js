const formLogin = document.querySelector(".form-login");
const inputEmail = document.querySelector(
  '.form-login input[name="userEmail"]'
);
const inputPass = document.querySelector(
  '.form-login input[name="userPassword"]'
);
const checkboxAdmin = document.querySelector(
  '.form-login input[name="isAdminLogin"]'
); // El checkbox para administrador

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
  const globalMessage = document.querySelector("#globalMessageLogin");

  if (estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword) {
    const formData = new FormData(form);
    const isAdminLogin = checkboxAdmin.checked; // Comprobar si el checkbox está marcado

    // Agregar el valor de isAdminLogin al FormData
    formData.append("isAdminLogin", isAdminLogin);

    // Determinar la URL según si es admin o usuario
    const loginUrl = isAdminLogin ? "/admin/login" : "/login"; // Usamos la URL correspondiente

    fetch(loginUrl, {
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
          form.reset();
          estadoValidacionCampos.userEmail =
            estadoValidacionCampos.userPassword = false;

          // Verificar si 'redirect' está presente y es válido
          if (data.redirect) {
            console.log("Redirigiendo a: " + data.redirect);
            setTimeout(() => {
              window.location.href = data.redirect;
            }, 2000);
          } else {
            console.log(
              "No se recibió una URL de redirección en la respuesta."
            );
          }
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
