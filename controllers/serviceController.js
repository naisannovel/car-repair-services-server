const { ServiceModel } = require('../models/serviceModel');

module.exports.addServiceRouter = async (req,res)=>{
    const servicesDetails = req.body;
    servicesDetails.image = req.file.filename;
    const service = new ServiceModel(servicesDetails);
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