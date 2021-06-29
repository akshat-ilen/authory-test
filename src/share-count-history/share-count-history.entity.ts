import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SiteEnum } from './enums/site.enum';

@Entity({ name: 'ShareCountHistory' })
@Index(['articleId', 'timestamp'])
export class ShareCountHistoryEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'int4', nullable: true })
  public articleId: number;

  @Column({ type: 'int4', nullable: false })
  public count: number;

  @Column({ enum: SiteEnum })
  public site: SiteEnum;

  @Index()
  @Column({ type: 'timestamptz', nullable: false })
  public timestamp: Date;
}
