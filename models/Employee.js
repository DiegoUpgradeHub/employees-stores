//Requerir paquetes o librerias
const mongoose = require(`mongoose`);

//Creación del esquema
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        seniority: { type: Number },
        role: { type: String, enum: ["Manager", "Dependiente"], required: true },
    },
    {
        timestamps: true,
    } 
);

const Employee = mongoose.model(`Employee`, employeeSchema);
module.exports = Employee;



