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
  
  const getFileService = async () => {
		try {
			const files = await Files.findAll()

			if (!files) throw new Error("There are no files available")

			return files
		} catch (error) {
			console.error("Error returning file:", error)
			return false
		}
  }

  export { postFileService, getFileService }