import { CliService } from './services/cli.service';
import { Module } from '@nestjs/common';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [PortfolioModule, UtilsModule],
  controllers: [],
  providers: [CliService],
})
export class CliModule {}
