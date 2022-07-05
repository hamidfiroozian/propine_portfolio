/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { UtilsService } from './services/utils.services';

@Module({
  imports: [forwardRef(() => PortfolioModule)],
  controllers: [],
  exports: [UtilsService],
  providers: [UtilsService],
})
export class UtilsModule { }
