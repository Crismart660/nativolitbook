from flask import Flask, request, render_template, jsonify, send_from_directory, abort, url_for, session, redirect
import mariadb
import bcrypt
from mariadb import Error
import re
import os
from rutas_interfaz import interfaz_bp  # Importa el Blueprint para la interfaz usuario
from admin_routes import admin_bp  # Importa el Blueprint para administradores

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Cambia esto por una clave secreta segura

# Registro de Blueprints
app.register_blueprint(interfaz_bp, url_prefix='/interfaz')  # Blueprint para la interfaz general
app.register_blueprint(admin_bp)  # Blueprint para la lógica de administradores


# Conexión a la base de datos
def get_db_connection(db_name='usuarios'):
    try:
        connection = mariadb.connect(
            host='localhost',
            user='root',  # Cambia esto por tu usuario de base de datos
            password='',  # Cambia esto por tu contraseña
            database=db_name,
            port=3306
        )
        return connection
    except Error as e:
        print(f"Error de conexión: {e}")
        return None


# Ruta para servir archivos JS con el tipo MIME adecuado
@app.route('/static/js/<path:filename>')
def serve_js(filename): 
    return send_from_directory(os.path.join(app.root_path, 'static', 'js'), filename, mimetype='application/javascript')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/form')
def form():
    return render_template('form.html')


# Ruta de registro de usuarios
@app.route('/register', methods=['POST'])
def register():
    user_name = request.form.get('userName')
    user_email = request.form.get('userEmail')
    user_password = request.form.get('userPassword')
    is_admin = request.form.get('isAdmin')  # 'on' si el checkbox está marcado

    # Validación de campos
    if not user_name or not user_email or not user_password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    # Validar formato del nombre de usuario
    if not user_name.isalnum() or len(user_name) < 4 or len(user_name) > 16:
        return jsonify({"error": "El nombre de usuario debe ser entre 4 y 16 caracteres."}), 400

    # Validar formato del correo electrónico
    if not email_regex(user_email):
        return jsonify({"error": "El correo electrónico debe contener un formato válido."}), 400

    # Validar formato de la contraseña
    if not password_regex(user_password):
        return jsonify({"error": "La contraseña debe tener entre 4 y 12 caracteres."}), 400

    # Seleccionar base de datos y tabla
    db_name = 'administradores' if is_admin else 'usuarios'
    table_name = 'administradores' if is_admin else 'usuarios'

    # Verificar si el correo ya está registrado
    if email_exists(user_email, db_name, table_name):
        return jsonify({"error": "El correo electrónico ya está registrado."}), 400

    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt())

    # Guardar los datos en la base de datos
    try:
        connection = get_db_connection(db_name)
        if connection:
            cursor = connection.cursor()
            cursor.execute(
                f"INSERT INTO {table_name} (userName, userEmail, userPassword) VALUES (?, ?, ?)",
                (user_name, user_email, hashed_password)
            )
            connection.commit()
            cursor.close()
            connection.close()
            success_message = "Te registraste correctamente como administrador." if is_admin else "Te registraste correctamente. Puedes iniciar sesión ahora."
            return jsonify({"success": success_message}), 200
        else:
            return jsonify({"error": "Error de conexión a la base de datos."}), 500
    except Error as e:
        return jsonify({"error": f"Error al registrar: {e}"}), 500


# Verificar si el correo ya está registrado
def email_exists(user_email, db_name, table_name):
    try:
        connection = get_db_connection(db_name)
        if connection:
            cursor = connection.cursor()
            cursor.execute(f"SELECT userEmail FROM {table_name} WHERE userEmail = ?", (user_email,))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            return result is not None
        else:
            return False
    except Error as e:
        print(f"Error al verificar el correo: {e}")
        return False


# Funciones de validación de regex
def email_regex(email):
    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(email_regex, email)


def password_regex(password):
    # Puedes añadir más validaciones como incluir caracteres especiales
    return len(password) >= 4 and len(password) <= 12


# Ruta de inicio de sesión de usuarios
@app.route('/login', methods=['POST'])
def login():
    user_email = request.form.get('userEmail')
    user_password = request.form.get('userPassword')

    if not user_email or not user_password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    try:
        connection = get_db_connection('usuarios')  # Conexión a la base de datos de usuarios
        cursor = connection.cursor()
        cursor.execute("SELECT id, userName, userPassword FROM usuarios WHERE userEmail = ?", (user_email,))
        result = cursor.fetchone()

        if result and bcrypt.checkpw(user_password.encode('utf-8'), result[2].encode('utf-8')):
            user_id = result[0]
            user_name = result[1]

            # Registrar el inicio de sesión en la tabla login_logs
            cursor.execute("INSERT INTO login_logs (user_id, userName) VALUES (?, ?)", (user_id, user_name))
            connection.commit()

            # Guardamos el ID del usuario en la sesión
            session['user_id'] = user_id
            connection.close()

            return jsonify({
                "success": "Inicio de sesión exitoso.",
                "redirect": url_for('interfaz_bp.interfaz')  # Redirige a la interfaz de usuario
            }), 200
        else:
            connection.close()
            return jsonify({"error": "Correo electrónico o contraseña incorrectos."}), 400

    except Error as e:
        return jsonify({"error": f"Error al iniciar sesión: {e}"}), 500


# Imprime todas las rutas registradas
for rule in app.url_map.iter_rules():
    print(rule.endpoint)


if __name__ == '__main__':
    app.run(debug=True)
