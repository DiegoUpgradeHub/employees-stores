//Requerir paquetes o librerias
const mongoose = require(`mongoose`);
const Employee = require('./Employee');

//Creación del esquema
const Schema = mongoose.Schema;
const storeSchema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        // Me ha funcionado añadiendo Schema antes de Types
        employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employee' }]
    },
    {
        timestamps: true,
    }
);

const Store = mongoose.model(`Store`, storeSchema);
module.exports = Store;