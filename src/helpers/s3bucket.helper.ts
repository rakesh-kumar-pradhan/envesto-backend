import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  region: process.env.AWS_REGION
});

export const uploadFileToS3 = async (fileStream: any, fileName: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      
      let nameAndExtensionArray = fileName.split('.')
      let extension = nameAndExtensionArray.pop()
      let formattedFileName = nameAndExtensionArray.join(' ')
      formattedFileName = formattedFileName.split(' ').join('-') + '-' + Date.now() + '.' + extension

      const params = {
        Bucket:process.env.AWS_BUCKET_NAME as string,
        Key: formattedFileName,
        Body: fileStream,
      };
      const data = await s3.upload(params).promise();

      if (data) {
        return resolve({ status: true, data: data });
      } else {
        return resolve({ status: true, message: "File Upload fails" });
      }
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

export const deleteFileFromS3 = async (fileName: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const params = {
        Bucket:process.env.AWS_BUCKET_NAME as string,
        Key: fileName,
      };
      const data: any = await s3.deleteObject(params).promise();
      if (data) {
        return resolve({ status: true, data: data });
      } else {
        return resolve({ status: true, message: "File delete failed" });
      }
    } catch (error) {
      return reject(error);
    }
  })
}
