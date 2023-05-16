//@ts-ignore
import * as finnhub from "finnhub";
import { formatNumber, convertUSDToEUR } from "../../../utils/formatterFunctions";
import { invests } from "./Investdata";

interface Idata {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
const key: string = import.meta.env.VITE_API_KEY as string;
api_key.apiKey = key;
const finnhubClient = new finnhub.DefaultApi();

export async function fetchInvests(): Promise<void> {
  const filteredSymbols = invests.filter((invest) => invest.symbol && invest.symbol.length <= 6);
  const symbols = filteredSymbols.map((invest) => invest.symbol);
  const promises = symbols.map((symbol) => {
    return new Promise<string>((resolve, reject) => {
      finnhubClient.quote(symbol, (error: string, data: Idata) => {
        if (error) {
          reject(error);
        } else {
          const amount = convertUSDToEUR(data.c);
          resolve(formatNumber(amount));
          invests.forEach((invest) => {
            if (invest.symbol === symbol) {
              invest.value = Number(amount.toFixed(2));
            }
          });
        }
      });
    });
  });

  try {
    const results = await Promise.all(promises);
    
  } catch (error) {
    console.error(error);
    
  }
}