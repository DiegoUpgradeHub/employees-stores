//Requerir paquetes o librerias
const express = require(`express`);
const router = express.Router();
const { connect } = require(`./utils/db`);
require('dotenv').config();

//Autentificación
// const jwt = require("jsonwebtoken");

//Requerir las rutas y crear variables con ellas
const employeesRouter = require(`./routes/employee.routes`);
const storesRouter = require(`./routes/store.routes`);
const userRouter = require(`./routes/user.routes`);

connect();

const PORT = process.env.PORT || 3000;
const server = express();

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
server.set("secretKey", "nodeRestApi");



//Ruta al HTML. Útil para desplegar en Vercel
// server.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

//Routes
server.use(`/employees`, employeesRouter);
server.use(`/stores`, storesRouter);
server.use(`/users`, userRouter);

server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

//Listener del servidor
server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});