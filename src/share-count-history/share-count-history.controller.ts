import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsQueryParamsDto } from './dto/analytics-query-params.dto';
import { AnalyticsResponseDto } from './dto/analytics-response.dto';
import { ShareCountHistoryService } from './share-count-history.service';

@Controller('analytics')
export class ShareCountHistoryController {
  constructor(
    private readonly shareCountHistoryService: ShareCountHistoryService,
  ) {}

  @Get()
  findAll(
    @Query() query: AnalyticsQueryParamsDto,
  ): Promise<AnalyticsResponseDto[]> {
    return this.shareCountHistoryService.findAll(query);
  }
}
