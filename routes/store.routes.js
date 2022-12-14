//Requerir paquetes o librerias
const express = require('express');
const router = express.Router();
const mongoose = require(`mongoose`);

//Requerir modelos
const Store = require('../models/Store');
// const Employee =` require('../models/Employee');
const { isValidObjectId } = require('mongoose');

//Obtener todas las tiendas
router.get('/', async (req, res, next) => {
	try {
		// const stores = await Store.find().populate('stores');
		const stores = await Store.find();
		return res.status(200).json(stores)
	} catch (error) {
		return next(error)
	}
});

//Obtener todos los empleados de una tienda
router.get('/storeEmployees/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const storeToCheck = await Store.findOne({_id: id}, {"employees": 1, "name": 1, "_id": 0})
        return res.status(200).json(storeToCheck);
    } catch (error) {
        return next(error);
    }
});

//Crear una tienda
router.post('/', async (req, res, next) => {
    try{
        const newStore = new Store({
            name: req.body.name,
            location: req.body.location,
            employees: []
        });

        const createdStore = await newStore.save();
        return res.status(201).json(createdStore);
    }catch(error){
        return next(error)
    }
});

//Eliminar una tienda
router.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const storeDeleted = await Store.findByIdAndDelete(id);
        return res.status(200).json(storeDeleted);
    }catch(error){
        return next(error)
    }
});

//Editar una tienda
router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const storeModify = new Store(req.body)
        storeModify._id = id
        const storeUpdated = await Store.findByIdAndUpdate(id , storeModify)
        return res.status(200).json(storeUpdated);
        // const { storeId } = req.body;
        // const { employeeId } = req.body;
        // const updatedStore = await Store.findByIdAndUpdate(
        //     storeId,
        //     { $push: { employees: employeeId } },
        //     { new: true }
        // );
        // return res.status(200).json(updatedStore);
    } catch (error) {
        return next(error);
    }
});

//Editar la tienda para añadir empleado
router.put('/add-employe-store', async (req, res, next) => {
    try {
        const { storeId} = req.body;
        const { employeeId} = req.body;
        const updatedStore = await Store.findByIdAndUpdate(
            storeId,
            { $push: { employees: employeeId } },
            { new: true }
        );
        return res.status(200).json(updatedStore);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;