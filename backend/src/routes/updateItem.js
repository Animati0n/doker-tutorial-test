const db = require('../persistence');

module.exports = async (req, res) => {
    await db.updateItem(req.params.id, {
        name: req.body.name,
        completed: req.body.completed,
    });
    console.log("get item request:",req.params.id,typeof req.params.id);
    
    const item = await db.getItem(req.params.id);
    res.send(item);
};
