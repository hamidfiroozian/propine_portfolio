# Portfolio Manager
## Run App
 _npm install_
 <br/>
 _npm run start:dev_

## Portfolio File
we use a csv file as portfolio data, 
The CSV file has the following columns
 - timestamp: Integer number of seconds since the Epoch
 - transaction_type: Either a DEPOSIT or a WITHDRAWAL
 - token: The token symbol
 - amount: The amount transacted

## Commands
there are 5 types of Commands:
 - operating commands , _--help_ for help and you can close CLI app by _exit_ 
 - Given no parameters, return the latest portfolio value per token in USD 
- Given a token, return the latest portfolio value for that token in USD <br/> 
 _ex BTC_
- Given a date, return the portfolio value per token in USD on that date , date should be in timestamp format <br/>  _ex 1657038700_
- Given a date and a token, return the portfolio value of that token in USD on that date , date should be in timestamp format and and you have to split date and token by ","<br/>  _ex 1657038700,BTC_

# App Docs
>this app contains 4 modules
>> -  Portfolio Module : <br/>
this is core module , we can manage portfolio here, <br/>
all functionalities about portfolio implemented in this module, and we can use these functions in every modules only by importing this module <br/>
if we need add or change function about portfolio we have to do it in this module<br/>
also we have controllers to use these functions as http request
<br/>
  
>> Functions <br/> 
>> 1 - getPortfolio() => return all portfolio<br/>
2 - getLatestPortfolio() => return the latest portfolio <br/>
3 - getLatestPortfolioInDate(input: Date) => return the portfolio value per token in USD on that date <br/>
4 - getAllPortfolioTokens() => return all tokens in portfolio <br/>
5 - getLatestSymbolPortfolioInDate(input: Date, symbol: string) => return the portfolio value of that token in USD on that date <br/>
6 - getLatestSymbolPortfolio(symbol: string) => return the latest portfolio value for that token in USD <br/>

>> - CLI module : <br/>
all cli management are in this modules , here we only manage inputs then use ** Portfolio Module ** for result .<br/>
for example if you need to get portfolio value per token in USD you need to get token in cli and use **Portfolio Module Services** to get result . 

>> - Utils Module : <br/>
when you need to have a utility function you have to define it here and you can use them by importing this module 

>> - Third part Module <br/>
if you need to call third part service you have to define it in this module

## .ENV
you have to add your CRYPTOCOMPARE_API_KEY in .env file

<br/>
<br/>
we didnt implement Api endpotints , but we can use Portfolio Module to create all kinds of apps .



