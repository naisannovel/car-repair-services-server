const { ReviewModel } = require('../models/reviewModel');

module.exports.addReview = async (req,res)=>{
    const data = req.body;
    data.user = req.user._id

    const file = req.files.image;
    const newImg = file.data;
    const encImg = newImg.toString('base64');
    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, 'base64')
    };

    data.image = image;
    const review = new ReviewModel(data);
    try {
        const result = await review.save();
        res.send(result);
      } catch (err) {
        const error = [];
        for (field in err.errors) {
          error.push(err.errors[field].message);
        }
        res.send(error);
      }
}

module.exports.getReview = async (req,res)=>{
    const result = await ReviewModel.find({}).limit(5);
    if(!result) return res.status(404).send('not found');
    res.send(result)
}