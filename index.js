const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
require("dotenv").config();

const RoutesCustomer = require("./routes/routesCustomer");
const RoutesProduct = require("./routes/routesProduct");
const RoutesEmail = require("./routes/routesEmail");
const RoutesSale = require("./routes/routesSale");
const RoutesUser = require("./routes/routesUser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use("/api", RoutesCustomer);
app.use("/api", RoutesProduct);
app.use("/api", RoutesEmail);
app.use("/api", RoutesSale);
app.use("/api", RoutesUser);

// Cargar los certificados SSL
const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/tu-dominio.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/tu-dominio.com/fullchain.pem')
};

// Crear el servidor HTTPS
const PORT = process.env.PORT || 5000;
const httpsServer = https.createServer(sslOptions, app);

// Iniciar el servidor
httpsServer.listen(PORT, () => {
    console.log(`Servidor HTTPS en puerto ${PORT}`);
});

// Redirigir el tráfico HTTP a HTTPS
const http = require('http');
http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(80);
