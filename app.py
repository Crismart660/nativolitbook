from flask import Flask, request, render_template, jsonify, send_from_directory, abort
import mariadb
import bcrypt
from mariadb import Error
import re
import os

app = Flask(__name__)

# Conexión a la base de datos
def get_db_connection():
    try:
        connection = mariadb.connect(
            host='localhost',
            user='root', 
            password='',  # Cambiar por tu contraseña
            database='usuarios',
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
    return render_template('form.html')

@app.route('/interfaz.html')
def interfaz():
    return render_template('interfaz.html')


@app.route('/register', methods=['POST'])
def register():
    user_name = request.form.get('userName')
    user_email = request.form.get('userEmail')
    user_password = request.form.get('userPassword')

    # Validación de campos
    if not user_name or not user_email or not user_password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    # Validar formato del nombre de usuario
    if not user_name.isalnum() or len(user_name) < 4 or len(user_name) > 16:
        return jsonify({"error": "El nombre de usuario debe ser entre 4 y 16 caracteres y solo puede contener letras y números."}), 400

    # Validar formato del correo electrónico
    if not email_regex(user_email):
        return jsonify({"error": "El correo electrónico no es válido."}), 400

    # Validar formato de la contraseña
    if not password_regex(user_password):
        return jsonify({"error": "La contraseña debe tener entre 4 y 12 caracteres."}), 400

    # Verificar si el correo ya está registrado
    if email_exists(user_email):
        return jsonify({"error": "El correo electrónico ya está registrado."}), 400

    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt())

    # Guardar los datos en la base de datos
    try:
        connection = get_db_connection()
        if connection:
            cursor = connection.cursor()
            cursor.execute("INSERT INTO usuarios (userName, userEmail, userPassword) VALUES (?, ?, ?)", 
                           (user_name, user_email, hashed_password))
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({"success": "Te registraste correctamente. Puedes iniciar sesión ahora."}), 200
        else:
            return jsonify({"error": "Error de conexión a la base de datos."}), 500
    except Error as e:
        return jsonify({"error": f"Error al registrar el usuario: {e}"}), 500

@app.route('/login', methods=['POST'])
def login():
    user_email = request.form.get('userEmail')
    user_password = request.form.get('userPassword')

    # Validación de campos
    if not user_email or not user_password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    # Verificar si el correo existe
    try:
        connection = get_db_connection() 
        if connection:
            cursor = connection.cursor()
            cursor.execute("SELECT userPassword FROM usuarios WHERE userEmail = ?", (user_email,))
            result = cursor.fetchone()
            cursor.close()
            connection.close()

            if result and bcrypt.checkpw(user_password.encode('utf-8'), result[0].encode('utf-8')):
                return jsonify({"success": "Inicio de sesión exitoso."}), 200
            else:
                return jsonify({"error": "Correo electrónico o contraseña incorrectos."}), 400
        else:
            return jsonify({"error": "Error de conexión a la base de datos."}), 500
    except Error as e:
        return jsonify({"error": f"Error al iniciar sesión: {e}"}), 500

# Funciones de validación de regex
def email_regex(email):
    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(email_regex, email)

def password_regex(password):
    # Puedes añadir más validaciones como incluir caracteres especiales
    return len(password) >= 4 and len(password) <= 12

# Verificar si el correo ya está registrado
def email_exists(user_email):
    try:
        connection = get_db_connection()
        if connection:
            cursor = connection.cursor()
            cursor.execute("SELECT userEmail FROM usuarios WHERE userEmail = ?", (user_email,))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            return result is not None
        else:
            return False 
    except Error as e:
        print(f"Error al verificar el correo: {e}")  
        return False

if __name__ == '__main__':
    app.run(debug=True) 
