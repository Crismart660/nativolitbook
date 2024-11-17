from flask import Blueprint, render_template

interfaz_bp = Blueprint('interfaz_bp', __name__)

@interfaz_bp.route('/interfaz')
def interfaz():
    return render_template('interfaz.html')

@interfaz_bp.route('/courses')
def courses():
    return render_template('courses.html')

@interfaz_bp.route('/libros/playlist')
def playlist():
    return render_template ('libros/playlist.html')

@interfaz_bp.route('/libros/hanselygretel')
def hanselygretel():
    return render_template('libros/hanselygretel.html')

@interfaz_bp.route('/libros/caperucita')
def caperucita():
    return render_template('libros/caperucita.html')

@interfaz_bp.route('/libros/principemendigo')
def principemendigo():
    return render_template('libros/principemendigo.html')

@interfaz_bp.route('/libros/gatoconbotas')
def gatoconbotas():
    return render_template('libros/gatoconbotas.html')

@interfaz_bp.route('/libros/patitofeo')
def patitofeo():
    return render_template('libros/patitofeo.html')


@interfaz_bp.route('/libros/lostrescerditos')
def lostrescerditos():
    return render_template('libros/lostrescerditos.html')


@interfaz_bp.route('/libros/blancanieves')
def blancanieves():
    return render_template('libros/blancanieves.html')


@interfaz_bp.route('/gamepad')
def gamepad():
    return render_template('ADIVINA LA BANDERA.html')

@interfaz_bp.route('/libros')
def libros():
    return render_template('libroscrud.html') 
