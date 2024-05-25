const mysql = require('mysql'); // USar la libreria

// Configuracion de la base de datos
const config = mysql.createConnection({
    host: 'localhost', //127.0.0.1 
    user: 'root',
    password: 'lufy123',
    database: 'proyectos',
    insecureAuth: true,
    port: 3307
});

module.exports = config; // Exportar la configuracion