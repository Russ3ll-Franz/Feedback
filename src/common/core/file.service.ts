import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { v4 } from 'uuid';
import { contentType } from 'mime-types';

@Injectable()
export class FileService {

  static fileLimit(files: number, fileSize: number) {
    return {
      files,
      fileSize,
    };
  }

  static storage(path: string[]) {
    return diskStorage({
      destination: (req, file, cb) => cb(null, join('.', ...path)),
      filename: (req, file, cb) => cb(null, `${v4().replace(/-/g, '')}${extname(file.originalname)}`),
    });
  }

  static fileFilter(req: any, file, cb) {
    const ext = contentType(file.mimetype);
    const ext1 = file.mimetype;
    // console.log(ext1);
    // if (ext.) {
    //   return cb(new Error('Extension not allowed'), false); // FileIntercepter is completely ignoring this.
    // }
    return cb(null, true);
  }
}
