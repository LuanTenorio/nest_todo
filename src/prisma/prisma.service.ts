import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  constructor(){
    super({
      log: [
        { emit: 'event', level: 'query' }
      ],

      errorFormat: 'colorless',
    });
  }
    
  async onModuleInit() {
    this.logs()

    await this.$connect();
  }

  async logs(){
    const showQuery = env["SHOW_QUERY"] == "true"

    if(!showQuery)
      return
    
    this.$on("query" as never, async ({query, params, duration}: Prisma.QueryEvent) => {
      console.log(`[Query] ${duration}ms ${params} -- '${query}'`)
    })
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}