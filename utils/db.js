const mongoose = require(`mongoose`);
require('dotenv').config(); 

const DB_URL = process.env.DB_URL || `mongodb://localhost:27017/employees-stores`;
mongoose.set('strictQuery', true);
const connect = async () => {
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`Conected with db succesfully`);
    }catch(err) {
        console.log('Error to connect with db')
    };
}

module.exports = { 
    DB_URL,
    connect
};