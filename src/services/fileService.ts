import db from "../config/dbConfig"
const { Files } = db
const postFileService = async (contractFile: Express.Multer.File) => {
    try {
      if (contractFile) {

        await Files.create({
          source: contractFile.buffer,
          original_name: contractFile.originalname,
        });
  
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error uploading file:', error);
      return false;
    }
  };
  

export {postFileService}