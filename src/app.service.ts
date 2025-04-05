import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private welcomeText: string = 'Olá Mundo!';

  constructor() {}

  getHello(): string {
    return this.welcomeText;
  }

  setHello(name: string): string {
    this.welcomeText = name;
    return `Olá ${this.welcomeText}`;
  }
}
