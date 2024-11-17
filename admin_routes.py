from flask import Blueprint, request, jsonify, session, url_for, redirect, render_template
import mariadb
import bcrypt
from mariadb import Error
from datetime import datetime

# Crear el Blueprint
admin_bp = Blueprint('admin_bp', __name__, url_prefix='/admin')

# Conexión a la base de datos
def get_db_connection():
    try:
        connection = mariadb.connect(
            host='localhost',
            user='root',  # Cambiar según tu configuración
            password='',  # Cambiar según tu configuración
            database='administradores',
            port=3306
        )
        return connection
    except Error as e:
        print(f"Error de conexión a la base de datos: {e}")
        return None

# Ruta para el inicio de sesión de administradores
@admin_bp.route('/login', methods=['POST'])
def admin_login():
    admin_email = request.form.get('userEmail')
    admin_password = request.form.get('userPassword')

    if not admin_email or not admin_password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    try:
        connection = get_db_connection()
        if connection:
            cursor = connection.cursor()
            cursor.execute("SELECT id, userName, userPassword FROM administradores WHERE userEmail = ?", (admin_email,))
            admin = cursor.fetchone()

            if admin and bcrypt.checkpw(admin_password.encode('utf-8'), admin[2].encode('utf-8')):
                admin_id = admin[0]
                admin_name = admin[1]

                # Registrar el inicio de sesión
                cursor.execute(
                    "INSERT INTO admin_login_logs (admin_id, userName, login_time) VALUES (?, ?, ?)",
                    (admin_id, admin_name, datetime.now())
                )
                connection.commit()

                # Guardar en sesión
                session['admin_id'] = admin_id
                cursor.close()
                connection.close()

                return jsonify({
                    "success": "Inicio de sesión como administrador exitoso.",
                    "redirect": url_for('admin_bp.admin_interface')  # Redirige a la interfaz de administrador
                }), 200
            else:
                cursor.close()
                connection.close()
                return jsonify({"error": "Correo electrónico o contraseña incorrectos."}), 400
    except Error as e:
        if connection:
            connection.close()
        return jsonify({"error": f"Error al iniciar sesión: {e}"}), 500

# Ruta para la interfaz de administrador
@admin_bp.route('/interface')
def admin_interface():
    if 'admin_id' in session:
        return render_template('adminterfaz.html')  # Renderiza la plantilla desde templates
    else:
        return redirect(url_for('index'))  # Redirige al inicio si no está autenticado

