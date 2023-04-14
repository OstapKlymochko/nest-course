import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}
  @Get()
  public async getAll(@Req() req: any, @Res() res: any) {
    return res.json(await this.userServices.getAll());
  }
  @Get('/:userId')
  public async getById(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    try {
      return res.json(await this.userServices.getById(userId));
    } catch (e) {
      console.log(e);
    }
  }

  @Post()
  public async createUser(
    @Req() req: any,
    @Res() res: any,
    @Body() body: CreateUserDto,
  ) {
    try {
      return res
        .status(HttpStatus.CREATED)
        .json(await this.userServices.createUser(body));
    } catch (e) {
      console.log(e);
    }
  }

  @Delete('/:userId')
  public async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    try {
      await this.userServices.deleteUser(userId);
      return res.sendStatus(HttpStatus.OK);
    } catch (e) {
      console.log(e);
    }
  }
  @Put('/:userId')
  public async updateUser(
    @Req() req: any,

    @Res() res: any,

    @Param('userId') userId: string,
    @Body() body: any,
  ) {
    try {
      return res.json(await this.userServices.updateUser(body, userId));
    } catch (e) {
      console.log(e);
    }
  }
}
