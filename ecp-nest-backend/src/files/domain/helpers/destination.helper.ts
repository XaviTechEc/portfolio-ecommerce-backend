import { Request } from 'express';
import { validateDestination } from './validate-destination.helper';
import { ValidFileDestination } from '../interfaces/valid-file-destination.type';

export const destinationHelper = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void,
) => {
  const { fileDest } = req.params;

  if (!file) {
    return callback(new Error('File is empty'), '');
  }

  if (!fileDest) {
    return callback(new Error('File destination is empty'), '');
  }

  const { isValid } = validateDestination(fileDest as ValidFileDestination);

  if (!isValid) {
    return callback(new Error('File destination is not valid'), '');
  }

  const fileDestination = `./static/${fileDest}`;

  callback(null, fileDestination);
};
