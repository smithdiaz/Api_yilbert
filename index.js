// Crear un servidor con express
const express = require('express');

// Incluir el middleware CORS
const cors = require('cors');

// Incluir el middleware Body Parser (para procesar peticiones POST)
const bodyParser = require('body-parser');

// Incluir la configuración de conexión a MySQL
const config = require('./config');

// Crear una instancia de Express
const app = express();

// Usar el middleware CORS y el middleware Body Parser
app.use(cors());
app.use(bodyParser.json());

// Usar el puerto 3000
const port = 3000;

// Crear una ruta por defecto
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Crear una ruta para obtener todos los proyectos
app.get('/proyectos', (req, res) => {
    // Realizar la consulta a la base de datos
    config.query('SELECT * FROM proyectos', (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener los proyectos');
        } else {
            res.json(filas);
        }
    });
});

// Crear una ruta para obtener todos los miembros
app.get('/miembros', (req, res) => {
    // Realizar la consulta a la base de datos
    config.query('SELECT * FROM miembros', (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener los miembros');
        } else {
            res.json(filas);
        }
    });
});

// Cargar las actividades de un proyecto pasando el id en la URL y luego en la query
// Cargar en esta misma ruta los miembros de un proyecto
app.get('/proyecto/:id/actividades', (req, res) => {
    // Realizar la consulta a la base de datos
    config.query('SELECT * FROM actividades WHERE proyecto_id = ?', req.params.id, (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener las actividades');
        } else {
            // Retornar la respuesta
            res.json(filas);
        }
    });
});

// Crear una ruta para agregar un nuevo proyecto
app.post('/proyectos', (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin, presupuesto } = req.body;
    const query = 'INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, presupuesto) VALUES (?, ?, ?, ?, ?)';

    config.query(query, [nombre, descripcion, fecha_inicio, fecha_fin, presupuesto], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al agregar el proyecto');
        } else {
            res.status(201).send('Proyecto agregado exitosamente');
        }
    });
});
// Cargar las actividades de un proyecto pasando el id en la URL 
// luego en la query
// Cargar en esta misma ruta los miembros de un proyecto
app.get('/proyecto/:id', (req, res) => {
    //Realizar la consulta a la base de datos
    config.query('SELECT * FROM proyectos WHERE id = ?', req.params.id, (err, proyecto) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener las actividades');
        } else {
            // Return the response

            res.json(proyecto[0]);
            console.log(proyecto);
        }
    });
});

app.put('/proyecto/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, fecha_inicio, fecha_fin, presupuesto } = req.body;

    const query = 'UPDATE proyectos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, presupuesto = ? WHERE id = ?';

    config.query(query, [nombre, descripcion, fecha_inicio, fecha_fin, presupuesto, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al actualizar el proyecto');
        } else {
            res.status(200).json({ message: 'Proyecto actualizado exitosamente' });
        }
    });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
