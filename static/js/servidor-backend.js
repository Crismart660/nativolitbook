const express = require('express'); //Llamamos a las siguientes librerias que nos van a ayudar//
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs');





const app = express(); //app se refiere generalmente a nuestra aplicacion en el servidor//
const port = 3000; //puerto donde se escucharan las solicitudes, el 3000 es un numero tipico para esto//

app.use(cors({
    origin: '*', // Cambia esto a la URL de tu cliente
}));
const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Crea la carpeta si no existe
    console.log(`Carpeta '${uploadDir}' creada.`);
}



const storage = multer.diskStorage({ //llamar a la configuracion para guardar la foto en el disco y no en memoria//
    destination: (req, file, cb) => { 
        
        //destination: configurar donde vamos a guardar la foto// 
        
        // (req): definimos los parametros: req: Se refiere a la solicitud que hace el cliente al servidor, cuando subimos datos en formularios por ejemplo en este caso subir la foto//

        // (file): El tipo de archivo de foto que el usuario subio//

        // (cb) le dice a Multer donde guardar el archivo

        cb(null, './uploads'); //uploads carpeta donde se guardara la imagen si no existe, Multer la creara de inmediato//
    },
    filename: (req, file, cb) => { //definir como se nombraran los archivos una vez se carguen>//
        
        cb(null, Date.now() + path.extname(file.originalname));
        
        //Date.now: El nombre es la hora en la que se cargo totalmente el archivo, totalmente util si no quieres nombre repetidos y tener que sobrescribirlos//

        //path.extname(file.originalName) : llama a la libreria path para obtener la extension del archivo que puede ser jpg, png, etc.

        //cb: bueno y aqui con cb ya sabemos que configuramos el nombre//


        //RESUMEN//

        //SE CONFIGURAN LOS NOMBRES DE LOS ARCHIVOS SUBIDOS Y SU UBICACION//

    }
});


const upload = multer({ storage }); //configurar a Muler para usar storage que antes definimos//


app.use('/uploads', express.static('uploads')); 

//app.use ("/uploads"): Ejecuta las siguientes instrucciones siempre y cuando se le pida al servidor usar la carptea /uploads//

//express.static/"uploads": Le dice a express que use la URL que le da el usuario de los archivos de la carpte uploads para luego enviarla al navegador//


app.post('/upload', upload.single('profilePic'), (req, res) => {

    //app.post("/upload"): inicia una ruta POST que se usan generalmente para enviar datos al servidor que en este caso es la imagen en la ruta /upload"//
    
    // recordar que req es lo que pidio el cliente y res es lo que se le va a devolver//

    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ninguna imagen' }); //si no hay hecho una solicitud el cliente devolver mensaje//
    }
    
  
    const profilePicUrl = `/uploads/${req.file.filename}`; //crear ruta para acceder al archivo que esta en uploads por ejemplo: /uploads/1631821925.jpg//

    res.json({ message: 'Imagen subida con éxito', profilePicUrl });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`); //El puerto del usuario es escuchar las solicitudes que el usuario hace a travez del puerto de su computador//
});

