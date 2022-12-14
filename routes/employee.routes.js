//Requerir paquetes o librerias
const express = require(`express`);
const router = express.Router();

//Requerir modelos
const Employee = require(`../models/Employee`);

//Obtener todos los empleados
router.get('/', async (req, res, next) => {
	try {
		const employees = await Employee.find();
		//NO ME FUNCIONA EL POPULATE. Pide algo de strict.
		// const employees = await Employee.find().populate( `Employee` );
		return res.status(200).json(employees)
	} catch (err) {
		return next(err);
	}
});

//Obtener empleados por id
router.get('/id/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const employee = await Employee.findById(id);
		if (employee) {
			return res.status(200).json(employee);
		} else {
			return res.status(404).json('No employee found by this id');
		}
	} catch (err) {
		return next(err);
	}
});

//Obtener empleados por nombre
router.get('/name/:name', async (req, res, next) => {
	const { name } = req.params;

	try {
		const employeeByName = await Employee.find({ name });
		return res.status(200).json(employeeByName);
	} catch (err) {
		return next(err);
	}
});

//Obtener empleados por cargo
router.get('/role/:role', async (req, res, next) => {
	const { role } = req.params;

	try {
		const employeeByRole = await Employee.find({ role });
		return res.status(200).json(employeeByRole);
	} catch (err) {
		return next(err);
	}
});

//Obtener empleados por antigüedad
router.get('/seniority/:seniority', async (req, res, next) => {
	const { seniority } = req.params;

	try {
		const employeeBySeniority = await Employee.find({ seniority: {$gt:seniority} });
		return res.status(200).json(employeeBySeniority);
	} catch (err) {
		return next(err);
	}
});

//Crear nuevo empleado
router.post('/create', async (req, res, next) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            lastName: req.body.lastName,
            seniority: req.body.seniority,
            role: req.body.role
        });

        const createdEmployee = await newEmployee.save();
        return res.status(201).json(createdEmployee);
    } catch (err) {
        return next(err);
    }
});

//Eliminar empleado por id
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const employeeDeleted = await Employee.findByIdAndDelete(id);
        return res.status(200).json(employeeDeleted);
    } catch (err) {
        return next(err);
    }
});

//Editar empleado por id
router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params 
        const employeeModify = new Employee(req.body) 
        employeeModify._id = id 
        const employeeUpdated = await Employee.findByIdAndUpdate(id , employeeModify)
        return res.status(200).json(employeeUpdated)
    } catch (err) {
        return next(err)
    }
});


module.exports = router;