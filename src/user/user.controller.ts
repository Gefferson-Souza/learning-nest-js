import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UserController {

  @Post()
  async create(@Body() body:any): Promise<any> {
    // Simulate a user creation process
    // In a real application, you would save the user to the database here
    console.log('User created:', body);
    return body;
  }

  @Get()
  async read(): Promise<any> {
    return {users:[]};
  }

  @Get(':id')
  async readOne(@Param() id:string): Promise<any> {
    const user = {
        id
    }
    return user;
  }


}
