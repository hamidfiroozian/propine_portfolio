import { UtilsModule } from './modules/utils/utils.module';
import { CryptocompareService } from './modules/third-part/services/cryptocompare.service';
import { CliModule } from './modules/cli/cli.module';
import { Module } from '@nestjs/common';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ThirdPartModule } from './modules/third-part/third-part.module';

@Module({
  imports: [
    UtilsModule,
    ThirdPartModule,
    ScheduleModule.forRoot(),
    CliModule,
    PortfolioModule,
  ],
  controllers: [],
  providers: [CryptocompareService],
})
export class AppModule {}
