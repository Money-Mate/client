import axios from "axios";
import {
  formatNumber,
  convertUSDToEUR,
} from "../../../utils/formatterFunctions";

interface CoinResponse {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date: string;
}

const symbol = "btc-bitcoin";
const symbol1 = "eth-ethereum";

let coinPromise: Promise<string> | null = null;

export function fetchCoin(): Promise<string> {
  if (!coinPromise) {
    coinPromise = axios
      .get<CoinResponse[]>(
        `https://api.coinpaprika.com/v1/coins/${symbol1}/ohlcv/today`
      )
      .then((response) => {
        coinPromise = null;
        const amount = convertUSDToEUR(response.data[0].close);
        const formattedAmount = formatNumber(amount);
        console.log(formattedAmount);
        return formattedAmount;
      })
      .catch((error) => {
        coinPromise = null;
        console.error(error);
        return "";
      });
  }
  return coinPromise;
}
