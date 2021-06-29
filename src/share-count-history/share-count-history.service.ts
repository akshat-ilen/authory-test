import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsResponseDto } from './dto/analytics-response.dto';
import { ShareCountHistoryEntity } from './share-count-history.entity';
import { plainToClass } from 'class-transformer';
import { AnalyticsQueryParamsDto } from './dto/analytics-query-params.dto';

@Injectable()
export class ShareCountHistoryService {
  constructor(
    @InjectRepository(ShareCountHistoryEntity)
    private readonly shareCountRepo: Repository<ShareCountHistoryEntity>,
  ) {}

  async findAll(
    queryParams: AnalyticsQueryParamsDto,
  ): Promise<AnalyticsResponseDto[]> {
    // Checking condition if from from date is larger than to date
    if (queryParams.from > queryParams.to) {
      throw new UnprocessableEntityException(
        'From date cannot be greater than To date',
      );
    }

    const rawResult = await this.shareCountRepo.query(
      `
        SELECT t."articleId" Id,
          SUM(CASE WHEN t."site" = 'twitter' THEN t."count" ELSE 0 END) "twitter",
          SUM(CASE WHEN t."site" = 'facebook' THEN t."count" ELSE 0 END) "facebook",
          SUM(CASE WHEN t."site" = 'pinterest' THEN t."count" ELSE 0 END) "pinterest",
          SUM(CASE WHEN t."site" = 'linkedin_comments' OR t."site" = 'linkedin_reactions' THEN t."count" ELSE 0 END) "linkedin",
          SUM(t."count") "all"
        FROM public."ShareCountHistory" t
        ${this.whereConditionQuery(queryParams)}
        GROUP BY t."articleId"
        ORDER BY "${queryParams.orderBy || 'all'}" DESC;
      `,
    );

    // Transforming the result to AnalyticsResponseDto (converting string to numbers)
    return plainToClass(AnalyticsResponseDto, rawResult as []);
  }

  /**
   * This function returns the formatted where condition clause based on query parameters
   * @param params: AnalyticsQueryParamsDto
   * @returns string
   */
  private whereConditionQuery(params: AnalyticsQueryParamsDto): string {
    let timeStampCondition = '';
    if (params.from && params.to) {
      timeStampCondition = `(t.timestamp BETWEEN '${params.from}' AND '${params.to}')`;
    } else if (params.from && !params.to) {
      timeStampCondition = `t.timestamp >= '${params.from}'`;
    } else if (!params.from && params.to) {
      timeStampCondition = `t.timestamp <= '${params.to}'`;
    }

    let articleIdCondition = params.Id ? ` t."articleId" = ${params.Id} ` : '';

    const whereClause =
      timeStampCondition !== '' || articleIdCondition !== '' ? 'WHERE' : '';

    if (timeStampCondition !== '' && articleIdCondition !== '') {
      articleIdCondition = `AND ${articleIdCondition}`;
    }

    return `${whereClause} ${timeStampCondition} ${articleIdCondition} `;
  }
}
