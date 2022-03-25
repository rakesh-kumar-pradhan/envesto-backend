import { uploadFileToS3 } from "../helpers";
const { Readable } = require('stream');

export class FileUtils {
  constructor() {}

  public static async saveFile(attachment:any) {

    return new Promise(async (resolve, reject) => {
      try {
        let { path, filename,originalname,mime } = attachment;
        //  const buffer = Buffer.from(attachment.buffer, 'base64')
        originalname=   mime;
          const buffer = Buffer.from(attachment.data, 'base64')
          const readable = new Readable()
          readable._read = () => {} // _read is required but you can noop it
          readable.push(buffer)
          readable.push(null)
          
        // const readStream = createReadStream(readable);
      //  unlinkSync(path);
      
        const attachmentFile: any = await uploadFileToS3(readable, originalname);
        console.log(attachmentFile)
        if (attachmentFile.status) {
          const filePath = attachmentFile.data.Location;
        
          // const fileUpload = new Attachment({ filePath: filePath });
          // const file = await fileUpload.save();
          if (filePath) {
            return resolve(filePath);
          } else {
            return reject({
              error: "FILE_UPLOAD_ERROR",
              message: "DB upload error",
            });
          }
        } else
          return reject({
            error: "FILE_UPLOAD_ERROR",
            message: "S3 upload error",
          });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
