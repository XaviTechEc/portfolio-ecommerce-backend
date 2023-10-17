import {
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { destinationHelper } from 'src/files/domain/helpers/destination.helper';
import { fileFilterHelper } from 'src/files/domain/helpers/file-filter.helper';
import { fileNamerHelper } from 'src/files/domain/helpers/file-namer.helper';
import { ValidFileDestination } from 'src/files/domain/interfaces/valid-file-destination.type';
import { ValidFileDestinationPipe } from 'src/files/domain/pipes/valid-file-destination.pipe';
import { FilesUseCases } from '../../application/use-cases/files-use-cases';

@Controller('/files')
export class FileController {
  constructor(private filesUseCases: FilesUseCases<Express.Multer.File>) {}

  @Post('/:fileDest')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilterHelper,
      storage: diskStorage({
        destination: destinationHelper,
        filename: fileNamerHelper,
      }),
    }),
  )
  async uploadProductFile(
    @Param('fileDest', new ValidFileDestinationPipe())
    fileDest: ValidFileDestination,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 3000000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesUseCases
      .save(file, fileDest)
      .then((fileUrl) => ({
        success: true,
        fileUrl,
      }))
      .catch((error) => ({ success: false, message: error.message }));
  }

  @Get('/:fileDest/:fileName')
  async getFile(
    @Param('fileDest', new ValidFileDestinationPipe())
    fileDest: ValidFileDestination,
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    return this.filesUseCases
      .findByName(fileName, fileDest)
      .then((path) => res.sendFile(path))
      .catch((error) => ({ success: false, message: error.message }));
  }

  @Delete('/:fileDest/:fileName')
  async deleteFile(
    @Param('fileDest', new ValidFileDestinationPipe())
    fileDest: ValidFileDestination,
    @Param('fileName') fileName: string,
  ) {
    return this.filesUseCases
      .remove(fileName, fileDest)
      .then((success) => ({ success, message: 'File deleted successfully' }))
      .catch((error) => ({ success: false, message: error.message }));
  }
}
