import { Injectable } from '@nestjs/common';
const csv = require('csv-parser');
const fs = require('fs');
import { readFileSync, createReadStream } from 'fs';
import { CryptocompareService } from 'src/modules/third-part/services/cryptocompare.service';
import { UtilsService } from 'src/modules/utils/services/utils.services';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly utils: UtilsService,
    private readonly cryptocompareService: CryptocompareService,
  ) { }

  async getPortfolio(): Promise<Portfolio[]> {
    let portfolio: Portfolio[] = [];
    const mypromise = () =>
      new Promise<Portfolio[]>((resolve, reject) => {
        try {
          const csvFile = createReadStream('./data.csv');
          csvFile.on('error', (e) => {
            reject(e);
          });
          csvFile
            .pipe(csv())
            .on('error', (e) => { })
            .on('data', (row) => {
              const data = row as Portfolio;
              portfolio.push(data);
            })
            .on('end', () => {
              resolve(portfolio);
            });
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    try {
      const d = await mypromise();

      return d;
    } catch (e) {
      return e;
    }
  }

  async getLatestPortfolio(): Promise<any> {
    const allData = await this.getPortfolio();
    const groupedPortfolio = this.utils.groupBy(allData, 'token');
    const tokens = Object.keys(groupedPortfolio);
    const getPortfolioInUSD =
      await this.cryptocompareService.getMultipleSymbolsPrice(tokens);
    tokens.forEach((token) => {
      groupedPortfolio[token].sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
    });

    const latestPortfolio = [];
    tokens.forEach((token) => {
      let v = groupedPortfolio[token][groupedPortfolio[token].length - 1];
      v.amountInUSD =
        Number(getPortfolioInUSD[token]['USD']) * Number(v.amount);
      if (!latestPortfolio[token]) {
        latestPortfolio[token] = [];
      }
      latestPortfolio[token].push(v);
    });

    return latestPortfolio;
  }

  async getLatestPortfolioInDate(input: Date): Promise<any> {
    const allData = await this.getPortfolio();
    const groupedPortfolio = this.utils.groupBy(allData, 'timestamp');

    const atThisTime = groupedPortfolio[`${input.getTime() / 1000}`];
    if (atThisTime) {
      const groupedLatedt = this.utils.groupBy(atThisTime, 'token');

      const tokensAfter = Object.keys(groupedLatedt);
      const getPortfolioInUSD =
        await this.cryptocompareService.getMultipleSymbolsPrice(tokensAfter);
      tokensAfter.forEach((token) => {
        groupedLatedt[token][0].amountInUSD =
          Number(groupedLatedt[token][0].amount) *
          Number(getPortfolioInUSD[token]['USD']);
      });

      // console.log("groupedLatedt", groupedLatedt)
      return groupedLatedt;
    } else {
      return [];
    }

  }


  async getAllPortfolioTokens() {
    const allData = await this.getPortfolio();
    const groupedPortfolio = this.utils.groupBy(allData, 'token');
    return Object.keys(groupedPortfolio);
  }

  async getLatestSymbolPortfolioInDate(input: Date, symbol: string): Promise<any> {
    const allData = await this.getPortfolio();
    const groupedPortfolio = this.utils.groupBy(allData, 'timestamp');

    const atThisTime = groupedPortfolio[`${input.getTime() / 1000}`];
    if (atThisTime) {
      const groupedLatedt = this.utils.groupBy(atThisTime, 'token');
      let symbolAtThisTime = groupedLatedt[symbol];

      const getPortfolioInUSD =
        await this.cryptocompareService.getMultipleSymbolsPrice([symbol]);
      symbolAtThisTime[0].amountInUSD = Number(symbolAtThisTime[0].amount) * Number(getPortfolioInUSD[symbol]['USD']);
      let response = {};
      response[symbol] = symbolAtThisTime;
      return response;
    } else {
      return [];
    }

  }

  async getLatestSymbolPortfolio(symbol: string): Promise<any> {
    const allData = await this.getPortfolio();
    const groupedPortfolio = this.utils.groupBy(allData, 'token');
    const tokens = Object.keys(groupedPortfolio);
    if (tokens.includes(symbol)) {
      groupedPortfolio[symbol].sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

      const getPortfolioInUSD =
        await this.cryptocompareService.getMultipleSymbolsPrice([symbol]);
      let v = groupedPortfolio[symbol][groupedPortfolio[symbol].length - 1];
      v.amountInUSD =
        Number(getPortfolioInUSD[symbol]['USD']) * Number(v.amount);
      let result = [];
      result[symbol] = v;
      return result;
    }


  }
}
