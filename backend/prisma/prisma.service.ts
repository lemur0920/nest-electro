import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserCreateDto } from "src/user/dto/user-create.req.dto.ts";

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

    async createUser(userCreateDto: UserCreateDto) {
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