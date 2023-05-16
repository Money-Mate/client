import axios from "axios";
import {
  formatNumber,
  convertUSDToEUR,
} from "../../../utils/formatterFunctions";
import { invests}   from "./Investdata";

interface CoinResponse {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date: string;
}


  
export async function fetchCoin(): Promise<void> {
  try {
    const filteredInvests = invests.filter((invest) => invest.symbol && invest.symbol.length > 6);
    const symbols = filteredInvests.map((invest) => invest.symbol);

    const coinResponses = await Promise.all(
      symbols.map((symbol) =>
        axios.get<CoinResponse[]>(
          `https://api.coinpaprika.com/v1/coins/${symbol}/ohlcv/today`
        )
      )
    );

    coinResponses.forEach((response, index) => {
      const investToUpdate = filteredInvests[index];
      const amount = convertUSDToEUR(response.data[0].close);
      investToUpdate.value = Number(amount.toFixed(2));
    });
  } catch (error) {
    console.error(error);
  }
}



  const symbols = [
    "btc-bitcoin",
    "eth-ethereum",
    // "usdt-tether",
    // "bnb-binance-coin",
    // "usdc-usd-coin",
    // "xrp-xrp",
    // "hex-hex",
    // "ada-cardano",
    // "doge-dogecoin",
    // "sol-solana",
    // "matic-polygon",
    // "dai-dai",
    // "trx-tron",
    // "ltc-litecoin",
    // "dot-polkadot",
    // "shib-shiba-inu",
    // "avax-avalanche",
    // "leo-leo-token",
    // "link-chainlink",
    // "xmr-monero",
    // "etc-ethereum-classic",
    // "xlm-stellar",
    // "uni-uniswap",
    // "bch-bitcoin-cash",
    // "algo-algorand",
    // "grt-the-graph",
    // "ftm-fantom",
    // "ape-apecoin",
    // "egld-elrond",
    // "sand-the-sandbox",
  ];