const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const RoutesCustomer = require("./routes/routesCustomer");
const RoutesProduct = require("./routes/routesProduct");
const RoutesEmail = require("./routes/routesEmail");
const RoutesSale = require("./routes/routesSale");


require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", RoutesCustomer);
app.use("/api", RoutesProduct);
app.use("/api", RoutesEmail);
app.use("/api", RoutesSale);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor En puerto ${PORT}`);
});

module.exports = app;