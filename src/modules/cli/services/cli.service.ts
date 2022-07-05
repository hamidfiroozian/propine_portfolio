import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
// const { prompt } = require('enquirer');
import * as enquirer from 'enquirer';
import { PortfolioService } from 'src/modules/portfolio/services/portfolio.service';
import { UtilsService } from 'src/modules/utils/services/utils.services';
interface question {
    type: string;
    name: string;
    message: string;
}
@Injectable()
export class CliService {
    running: boolean = false;

    constructor(
        private readonly portfolioService: PortfolioService,
        private readonly utilsService: UtilsService,
    ) { }

    @Timeout(3000)
    async runCLI() {
        this.running = true;
        do {
            const q = {
                type: 'input',
                name: 'input',
                message: 'Enter command (--help for help , exit for exit)?',
            };
            const answer = await enquirer.prompt<question>(q);

            if (answer[q.name] == 'exit') {
                this.running = false;
            }
            await this.paesrInputs(answer[q.name]);
        } while (this.running);
    }

    async paesrInputs(input: string) {
        if (input == '') {
            console.log('latest portfolio value per token in USD , waiting . . .');
            const res = await this.portfolioService.getLatestPortfolio();
            console.log(res);
            return;
        }

        if (input == '--help') {
            const h = this.utilsService.getCliHelp();
            console.log(h);
            return;
        }
        if (input.includes(',')) {
            const d = input.split(',');
            const date = d[0];
            const symbol = d[1];
            const isDate = this.utilsService.isDate(date);
            const res = await this.portfolioService.getLatestSymbolPortfolioInDate(isDate, symbol);
            console.log(res);
            return;
        }
        const isDate = this.utilsService.isDate(input);
        if (isDate) {
            const res = await this.portfolioService.getLatestPortfolioInDate(isDate);
            console.log(res);
            return;
        }



        const tokens = await this.portfolioService.getAllPortfolioTokens();
        if (tokens.includes(input)) {
            const r = await this.portfolioService.getLatestSymbolPortfolio(input);
            console.log(r);

            return;
        }



        console.log("Wrong input  or its not in your portfolio")
        const h = this.utilsService.getCliHelp();
        console.log(h);
    }
}
