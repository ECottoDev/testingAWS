// routes.js
const express = require('express');
const router = express.Router();
const resumeDB = require('./resumeDatabase');
const budgetDB = require('./budgetDatabase');
const loginDB = require('./loginDatabase');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

//Resume Database Routes
//Education database connections
router.post('/resume/addEducationData', async (req, res) => {
    const { schoolName, schoolYear, concentration, graduated } = req.body;
    try {
        const result = await resumeDB.addEducationData(schoolName, schoolYear, concentration, graduated);
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/resume/getEducationData', async (req, res) => {
    try {
        const result = await resumeDB.getEducationData();
        res.json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.patch('/resume/updateEducationData', (request, response) => {
    const { id, schoolName, schoolYear, concentration, graduated } = request.body;
    const result = resumeDB.updateEducationData(id, schoolName, schoolYear, concentration, graduated);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
router.delete('/resume/deleteEducationData', (req, res) => {
    const { id } = req.body;
    const result = resumeDB.deleteEducationData(id);
    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err));
});

//Experience database connections
router.post('/resume/addExperienceData', (req, res) => {
    const { company, position, duties, timeWorked } = req.body;
    const result = resumeDB.addExperienceData(company, position, duties, timeWorked);
    result
        .then(data => res.json({ success: true }))
        .catch(err => console.log(err));
});
router.get('/resume/getExperienceData', (req, res) => {
    const result = resumeDB.getExperienceData();
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
}
);
router.patch('/resume/updateExperienceData', (request, response) => {
    const { id, company, position, duties, timeWorked } = request.body;
    const result = resumeDB.updateExperienceData(id, company, position, duties, timeWorked);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
router.delete('/resume/deleteExperienceData', (req, res) => {
    const { id } = req.body;
    const result = resumeDB.deleteExperienceData(id);
    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err));
});

//Skills database connections
router.post('/resume/addSkillsData', (req, res) => {
    const { name, skillLevel } = req.body;
    const result = resumeDB.addSkillsData(name, skillLevel);
    result
        .then(data => res.json({ success: true }))
        .catch(err => console.log(err));
});
router.get('/resume/getSkillsData', (req, res) => {
    const result = resumeDB.getSkillsData();
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});
router.patch('/resume/updateSkillsData', (request, response) => {
    const { id, name, skillLevel } = request.body;
    const result = resumeDB.updateSkillsData(id, name, skillLevel);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
router.delete('/resume/deleteSkillsData', (req, res) => {
    const { id } = req.body;
    const result = resumeDB.deleteSkillsData(id);
    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err));
});

/************************* 
* Budget Database Routes
**************************/

router.get('/budget/getAllCardData', (req, res) => {
    const result = budgetDB.getAllCardData();
    result
        //console log result
        .then(data => console.log(res.json({ data: data })))
        .catch(err => console.log(err));
}
);

router.post('/budget/insert', (req, res) => {
    const { name, amountDue, amountMinDue } = req.body;
    const result = budgetDB.insertNewName(name, amountDue, amountMinDue);
    result
        .then(data => res.json({ success: true }))
        .catch(err => console.log(err));
});

//read


router.get('/budget/getBudget', (req, res) => {
    const result = budgetDB.getBudget();

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
}
);

router.get('/budget/getBank', (req, res) => {
    const result = budgetDB.getBank();

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
}
);

//update
router.patch('/budget/updateCard', (request, response) => {
    const { CardID, amountDue } = request.body;
    const result = budgetDB.updateCard(CardID, amountDue);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

router.patch('/updateBudget', (request, response) => {
    const { amount } = request.body;
    const result = budgetDB.updateBudget(amount);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

router.patch('/updateBank', (request, response) => {
    const { amount } = request.body;
    const result = budgetDB.updateBank(amount);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

router.get('/login/users',  async (req, res) => {
    const result = loginDB.getUsers();

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
}
);
router.post('/login/system', async (req, res) => {
    const { username, password } = req.body;
    try {
	    console.log(username, password);
        const result = await loginDB.logIntoSystem(username, password);
	    console.log('done with log into system routes.js');
	    console.log(result);
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
