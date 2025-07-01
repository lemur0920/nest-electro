import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "src/user/dto/create-user.req.dto.ts";

@Injectable()
export class PrismaService 
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

    async createUser(createUserDto: CreateUserDto) {
      return this.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          name: createUserDto.name
        }
      });
    }

    async onModuleInit() {
      await this.$connect();
    }

    async onModuleDestroy() {
      await this.$disconnect();
    }
  }