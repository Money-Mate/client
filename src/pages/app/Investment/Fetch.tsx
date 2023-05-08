//@ts-ignore
import * as finnhub from "finnhub";
import { useEffect, useState } from "react";
import { invests } from "./Investdata";
import {
  formatNumber,
  convertUSDToEUR,
} from "../../../utils/formatterFunctions";

interface Idata {
  c: number,
  d: number,
  dp: number,
  h: number,
  l: number,
  o: number,
  pc: number,
}
const Fetch = () => {
  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  const key: string = import.meta.env.VITE_API_KEY as string;
  api_key.apiKey = key;
  const finnhubClient = new finnhub.DefaultApi();

  const [values, setValues] = useState<string[]>([]);


  const fetchValues = async () => {
    const filteredSymbols = invests.filter((invest) => invest.symbol);
    const symbols = filteredSymbols.map((invest) => invest.symbol);
    console.log(symbols)
    const promises = symbols.map((symbol) => {
      return new Promise<string>((resolve, reject) => {
        finnhubClient.quote(symbol, (error: string, data: Idata) => {
          if (error) {
            reject(error);
          } else {
            const amount = convertUSDToEUR(data.c);
            resolve(formatNumber(amount));
          }
        });
      });
    });

    try {
      const results = await Promise.all(promises);
      console.log(results)
      setValues(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchValues();
  }, []);



  return (
    <>
      <div className="text-center">
        {values.length > 0 && values.map((value, index) => (
          <div className="text-mm-text-white " key={index}>
            {value}
          </div>
        ))}
      </div>
    </>
  );
};

export default Fetch;
