const { ServiceModel, validate } = require('../models/serviceModel');

// create
module.exports.addService = async (req,res)=>{

    const file = req.files.image;
    const newImg = file.data;
    const encImg = newImg.toString('base64');
    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, 'base64')
    };

    const { value, error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    value.image = image;
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

// get
module.exports.fetchAllServices = async (req,res)=>{
  const result = await ServiceModel.find();
  res.send(result);
}

// delete
module.exports.deleteService = async (req,res)=>{
  const id = req.params.id;
  const result = await ServiceModel.findByIdAndDelete(id);
  if (!result) return res.status(404).send("not found");
  res.send(`successfully deleted ${result.name} service`);
}

// update service price
module.exports.updateServicePrice = async (req,res)=>{
  const id = req.params.id;
  const price = req.body;
  const result = await ServiceModel.findByIdAndUpdate(id,price,{ new: true });
  return res.status(200).send(result)
}