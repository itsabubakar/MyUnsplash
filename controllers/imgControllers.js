const Image = require('../models/Image')

// @desc Gets all images
// @route Get /api

const getAllImg = async (req, res) => {
    const images = await Image.find().lean()

    // If no notes 
    if (!images?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }
    res.send(images)
}

// @desc posts an image
// @route post /api

const postImage = async (req, res) => {
    const { link, label } = req.body

    // Check for duplicate title
    const duplicate = await Image.findOne({ link }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Image already exists' })
    }

    const image = await Image.create({ link, label })
        .then(() => {
            res.status(201).json({ message: 'New image added' })
        })
        .catch((err) => {
            console.log(err._message)
            return res.status(400).json({ message: 'Invalid image data recieved' })
        })
}

// @desc delets an image
// @route delete /api

const deleteImg = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Image id required' })
    }

    // Confirm image exists to delete 
    const image = await Image.findById(id).exec()

    if (!image) {
        return res.status(400).json({ message: 'Image not found' })
    }

    const result = await image.deleteOne()

    const reply = `Image with ID ${result._id} deleted`

    res.json(reply)
}


module.exports = {
    getAllImg,
    postImage,
    deleteImg
}