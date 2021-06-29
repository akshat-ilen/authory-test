import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareCountHistoryEntity } from './share-count-history.entity';
import { ShareCountHistoryService } from './share-count-history.service';
import { ShareCountHistoryController } from './share-count-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShareCountHistoryEntity])],
  providers: [ShareCountHistoryService],
  controllers: [ShareCountHistoryController],
})
export class ShareCountHistoryModule {}
