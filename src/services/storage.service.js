const ImageKit = require("imagekit");
const { v4: uuidv4 } = require('uuid');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URLENDPOINT
})


async function uploadFile(fileBuffer) {

    const result = await imagekit.upload({
        file: fileBuffer,
        fileName: uuidv4(),
        folder: "mern14-products"
    })

    return result
}


module.exports = { uploadFile }