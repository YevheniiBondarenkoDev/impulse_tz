import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repositoryUser: Repository<User>,
  ) {}
  getById(id: number) {
    return this.repositoryUser.findOneBy({ id });
  }
  findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.repositoryUser.findOne(options);
  }
  async create({ password, ...userData }: DeepPartial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.repositoryUser.create({
      ...userData,
      password: hashedPassword,
    });
    return this.repositoryUser.save(user);
  }
  update(
    filter: FindOptionsWhere<User>,
    updateData: QueryDeepPartialEntity<User>,
  ) {
    return this.repositoryUser.update(filter, updateData);
  }
}
