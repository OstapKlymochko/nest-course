import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto/user.dto';

@Injectable()
export class UsersService {
  private users: any[] = [];
  public async createUser(newUser: CreateUserDto): Promise<any> {
    if (!newUser.status) {
      newUser.status = false;
    }
    this.users.push(newUser);
    return this.users.slice(-1);
  }
  public async getAll(): Promise<any> {
    return this.users;
  }
  public async getById(userId: string): Promise<any> {
    try {
      return this.users[+userId];
    } catch (e) {
      console.log(e);
    }
  }
  public async deleteUser(userId: string): Promise<void> {
    try {
      this.users.splice(+userId, 1);
    } catch (e) {
      console.log(e);
    }
  }
  public async updateUser(updateData, userId: string): Promise<any> {
    try {
      this.users[+userId] = { ...this.users[+userId], ...updateData };
      return this.users[+userId];
    } catch (e) {
      console.log(e);
    }
  }
}
