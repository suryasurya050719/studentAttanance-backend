/** paste the aws s3 credentials */

const {S3Client,PutObjectCommand} = require('@aws-sdk/client-s3')


const s3 = new S3Client({
    region:region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey:secretKey
      }
})

const uploadFile = async(file)=>{
const newFileName = `${Date.now()}${file.originalname}`
    const params = new PutObjectCommand( {
        ACL:'public-read',
        Bucket:bucketName,
        Key:newFileName,
        Body:file.buffer,
        ContentType: file.mimetype
        
    })
   await s3.send(params)
    return `https://${bucketName}.s3.${region}.amazonaws.com/${newFileName}`
}

module.exports = {uploadFile}