import { SwaggerDocumentOptions } from '@nestjs/swagger';
import { PortfolioModule } from 'src/modules/portfolio/portfolio.module';
import { BaseConfig } from './base-config.service';

class Config extends BaseConfig {
  getExtraModels(): SwaggerDocumentOptions {
    return {
      extraModels: [PortfolioModule],
    };
  }
}

const configService = new Config(process.env);

type ConfigService = typeof configService;

export { configService, ConfigService };
