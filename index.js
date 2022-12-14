//Requerir paquetes o librerias
const express = require(`express`);
const router = express.Router();
const {connect} = require(`./utils/db`);

//Requerir las rutas y crear variables con ellas
const employeesRouter = require(`./routes/employee.routes`);
const storesRouter = require(`./routes/store.routes`);

connect();

const PORT = 3000;
const server = express();

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(`/employees`, employeesRouter);
server.use(`/stores`, storesRouter);

server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

//Listener del servidor
server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});