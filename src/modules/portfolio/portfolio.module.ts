import { PortfolioController } from './controllers/portfolio.controller';
import { PortfolioService } from './services/portfolio.service';

import { forwardRef, Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { ThirdPartModule } from '../third-part/third-part.module';

@Module({
  imports: [
    forwardRef(() => UtilsModule),
    forwardRef(() => ThirdPartModule),
  ],
  controllers: [PortfolioController],
  exports: [PortfolioService],
  providers: [PortfolioService],
})
export class PortfolioModule { }
