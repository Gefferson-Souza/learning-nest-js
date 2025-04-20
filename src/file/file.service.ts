import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import { writeFile } from 'fs';
@Injectable()
export class FileService {
  async uploadFile(
    file: Express.Multer.File,
    destinationPath: string,
  ): Promise<string> {
    // Escreve o arquivo usando a API de promises
    await fsPromises.writeFile(destinationPath, file.buffer);

    return destinationPath;
  }

  async deleteFile(filePath: string): Promise<string> {
    return `File ${filePath} deleted successfully!`;
  }
}
