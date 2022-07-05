import { Controller, Get } from '@nestjs/common';
import { UserEndpoint } from 'src/core/swagger.decorator';
import { PortfolioService } from '../services/portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @UserEndpoint(PortfolioController.name, '1', '', 'object')
  getPortfolio(): Promise<Portfolio[]> {
    return this.portfolioService.getPortfolio();
  }
}
