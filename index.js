const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const RoutesCustomer = require("./routes/routesCustomer");


require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", RoutesCustomer);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor En puerto ${PORT}`);
});

module.exports = app;