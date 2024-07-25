import { Module, Global  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, UserSchema } from './schema/users.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
