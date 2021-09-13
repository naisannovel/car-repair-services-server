const { ServiceModel, validate } = require('../models/serviceModel');

// create
module.exports.addServiceRouter = async (req,res)=>{
    const { value, error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    value.image = req.file.filename;
    const service = new ServiceModel(value);
    try {
        const result = await service.save();
        res.send(result);
      } catch (err) {
        const error = [];
        for (field in err.errors) {
          error.push(err.errors[field].message);
        }
        res.send(error);
      }
}

// update
