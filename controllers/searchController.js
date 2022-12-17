const Image = require('../models/Image')

// @desc Gets all images
// @route Get /api

const getImg = async (req, res) => {
    const { searchItem } = req.body
    const images = await Image.find({ label: searchItem }).lean()

    // If no images 
    if (!images?.length) {
        return res.status(400).json({ message: 'No images found' })
    }
    res.send(images)
}

module.exports = {
    getImg
}