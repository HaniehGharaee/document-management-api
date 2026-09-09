import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('mongodb.uri');
        const dbName = configService.get<string>('mongodb.dbName');
        const username = configService.get<string>('mongodb.userName');
        const password = configService.get<string>('mongodb.password');
        if (!uri || !dbName) {
          throw new Error('Database connection configuration is invalid');
        }
        const connectionOptions: any = {
          uri,
          dbName,
        };
        if (username && password) {
          connectionOptions.user = username;
          connectionOptions.pass = password;
        }

        //return object
        return connectionOptions;
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
//OnModuleDestroy itself is an interface, not a function.
export class DatabaseModule implements OnModuleDestroy{
  constructor(
    @Inject(getConnectionToken())
    private readonly connection: Connection

  ){}

  async onModuleDestroy (){
    await this.connection.close()
  }

}
