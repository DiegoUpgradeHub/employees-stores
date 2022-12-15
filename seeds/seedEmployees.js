//Requerir paquetes y librerias
const mongoose = require(`mongoose`);
const { DB_URL } = require('../utils/db');

//Requerir los modelos
const Employee = require(`../models/Employee`);
const Store = require(`../models/Store`);

//Creación del listado semilla
const employees = [
    {
        name: `Lucas`,
        lastName: `Hernandez`,
        seniority: 3,
        role: `Dependiente`,
    },
    {
        name: `Eva`,
        lastName: `Garcia`,
        seniority: 4,
        role: `Dependiente`,
    },
    {
        name: `Isabel`,
        lastName: `Rodriguez`,
        seniority: 7,
        role: `Manager`,
    },
    {
        name: `Antonio`,
        lastName: `Gutierrez`,
        seniority: 11,
        role: `Manager`,
    },
    {
        name: `Laura`,
        lastName: `Gonzalez`,
        seniority: 1,
        role: `Dependiente`,
    },
    {
        name: `Daniel`,
        lastName: `Herrera`,
        seniority: 2,
        role: `Dependiente`,
    },
];
const employeeDocuments = employees.map(employee => new Employee(employee));
mongoose.set('strictQuery', true);
mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allEmployees = await Employee.find();
        if (allEmployees.length) {
        await Employee.collection.drop();
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
            await Employee.insertMany(employeeDocuments);
        console.log('Database Created')
        })
    .catch((err) => console.log(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());