//Requerir paquetes y libreriras
const mongoose = require(`mongoose`);
const { urlDb } = require('../utils/db');

//Requerir los modelos
const Employee = require('../models/Employee');
const Store = require(`../models/Store`);

//Creación del listado semilla
const stores = [
    {
        name: `Ropa guapa`,
        location: `Calle Principal nº3`,
        // employees: ["6399e05f829fabd61afcfcdb"]
    },
    {
        name: `Ropa molona`,
        location: `Calle Principal nº12`
    },
    {
        name: `Ropa fea`,
        location: `Calle Secundaria nº7`
    }
];
const storeDocuments = stores.map(store => new Store(store));
mongoose.set('strictQuery', true);
mongoose
    .connect(`mongodb://localhost:27017/employees-stores`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allStores = await Store.find();
        if (allStores.length) {
        await Store.collection.drop();
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
            await Store.insertMany(storeDocuments);
        console.log('Database Created')
        })
    .catch((err) => console.log(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());