export const fileFilterHelper = (
  _req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file) {
    return callback(new Error('File is empty'), false);
  }

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (!validExtensions.includes(fileExtension)) {
    return callback(
      new Error(`The file extension ${fileExtension} is not valid`),
      false,
    );
  }

  return callback(null, true);
};
