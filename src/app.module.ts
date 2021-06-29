import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareCountHistoryModule } from './share-count-history/share-count-history.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ShareCountHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
