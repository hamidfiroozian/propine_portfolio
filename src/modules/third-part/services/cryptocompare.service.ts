/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import axios from 'axios';
import { UtilsService } from 'src/modules/utils/services/utils.services';

@Injectable()
export class CryptocompareService {
  constructor(private readonly utils: UtilsService) { }

  async getMultipleSymbolsPrice(symbols: string[]): Promise<Object> {
    let query = '';
    symbols.forEach((sym) => {
      query += `${sym},`;
    });
    const res = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${query}&tsyms=USD`, {
      headers: {
        "authorization": `Apikey ${process.env.CRYPTOCOMPARE_API_KEY}`
      }
    }
    );
    return res.data;

    // fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD", {
    //     headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    // })
    //     .then((response) => {
    //         console.log(response)
    //         // Do something with response
    //     })
    //     .catch(function (err) {
    //         console.log("Unable to fetch -", err);
    //     });
  }
}
