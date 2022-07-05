/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { CryptocompareService } from './services/cryptocompare.service';

@Module({
  imports: [forwardRef(() => UtilsModule)],
  controllers: [],
  exports: [CryptocompareService],
  providers: [CryptocompareService],
})
export class ThirdPartModule { }
