import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "src/user/dto/create-user.req.dto.ts";

@Injectable()
export class PrismaService 
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

    constructor() {
      super({
        log: [
          { emit: 'stdout', level: 'query' },
        ]
      })
    }

    async createUser(userCreateDto: CreateUserDto) {
    return this.user.create({
        data: { 
          email: userCreateDto.email,
          name: userCreateDto.name,
          password: userCreateDto.password
        },
      })
    }

    async onModuleInit() {
      await this.$connect();
    }

    async onModuleDestroy() {
      await this.$disconnect();
    }
  }
