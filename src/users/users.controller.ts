import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('by-email')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.usersService.validateUser(body.username, body.password);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const existing = await this.usersService.findByUsername(body.username);
    if (existing) {
      throw new Error('Username already exists');
    }
    return this.usersService.create(body);
  }
}