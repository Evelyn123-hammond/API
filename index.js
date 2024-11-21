// Configurar las importaciones

const express = require('express');

//Creación de una instancia

const app = express();

//Importar el modulo de PATH

const path = require('path');

//Puerto configuración

const port = 3000;

app.use(express.json());



//Simular base de datos
const carrera = [
    {noControl:1234, nombre:'Gutiérrez', materia:'Programación de Redes'},
    {noControl:5678, nombre:'Velasco', materia:'Web'},
    {noControl:9101, nombre:'Macias', materia:'EIGRP'},
    
]


//Creación de una Ruta
//obeto.particion('Ruta')

app.get('/rutacarrera',(req, res)=>{
    res.json(carrera)
})



app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))
})


//Buscar Alumno
app.get('/carrera/:noControl', (req, res) => {
    const noControl = req.params.noControl;
    
    const resultado = carrera.find((nombre) => String(nombre.noControl) === noControl);

    if (resultado) {
        res.json(resultado);
    } else {
        res.status(404).json({ mensaje: 'Número de control no encontrado' });
    }
});


//Actualizar Alumno
app.put('/carrera/:noControl', (req, res) => {
    const noControl = req.params.noControl;
    const { nombre, materia } = req.body;

    const alumno = carrera.find((nombre) => String(nombre.noControl) === noControl);

    if (alumno) {
        if (nombre) alumno.nombre = nombre;
        if (materia) alumno.materia = materia;

        res.json({ mensaje: 'alumno actualizado', alumno });
    } else {
        res.status(404).json({ mensaje: 'alumno no encontrado' });
    }
});


//Eliminar alumno
app.delete('/carrera/:noControl', (req, res) => {
    const noControl = req.params.noControl;
    const borrar = carrera.findIndex((nombre) => String(nombre.noControl) === noControl);

    if (borrar !== -1) {
        const alumnoborrado = carrera.splice(borrar, 1);
        res.json({ mensaje: 'alumno eliminado', nombre: alumnoborrado[0] });
    } else {
        res.status(404).json({ mensaje: 'alumno no encontrado' });
    }
});




//Creación de una ruta POST (enviar)
app.post('/carrera', (req, res) => {
    //Variables : componentes de la bd
    const {noControl, nombre, materia} = req.body;
    //Agregar al Arreglo
    carrera.push({noControl, nombre, materia});

    //Repsonder al cliente
    res.status(201).json({mensaje:'Usuario creado con exito', usuario:{noControl, nombre, materia}})
})



//Iniciar el Servidor
app.listen(port, ()=>{
    console.log('Servidor iniciado en el http:localhost en el puerto ${port}')
})