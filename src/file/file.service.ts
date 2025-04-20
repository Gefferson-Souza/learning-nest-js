import { Injectable, NotFoundException } from "@nestjs/common";
import { promises as fsPromises } from "fs";
import { writeFile } from "fs";
@Injectable()
export class FileService {
    async uploadFile(file: Express.Multer.File, destinationPath: string): Promise<string> {
        try {
            // Escreve o arquivo usando a API de promises
            await fsPromises.writeFile(destinationPath, file.buffer);
            
            return destinationPath;
        } catch (error) {
            // Lança um erro que pode ser capturado pelo try/catch do controller
            throw new Error(`Error uploading file: ${error.message}`);
        }
    }
    
    async deleteFile(filePath: string): Promise<string> {
        return `File ${filePath} deleted successfully!`;
    }
}