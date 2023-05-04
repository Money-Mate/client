//@ts-ignore
import * as finnhub from "finnhub";
import { useEffect } from "react";
import { invests } from "./Investdata";
import { formatNumber, convertUSDToEUR } from "../../../utils/formatterFunctions";

const Fetch = () => {
  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  const key = import.meta.env.VITE_API_KEY;
  api_key.apiKey = key;
  const finnhubClient = new finnhub.DefaultApi();

  useEffect(() => {
    const values: [] = [];
    const filteredSymbols = invests.filter((invest) => invest.symbol);
    const symbols = filteredSymbols.map((invest) => invest.symbol);
    console.log(symbols);
    for (let i = 0; i < symbols.length; i++) {
      //@ts-ignore
         finnhubClient.quote(symbols[i], (error, data, response) => {
        if (!error) {
          const amount = convertUSDToEUR(data.c)
          //@ts-ignore
          values.push(formatNumber(amount));
          values.filter(
            (value, index) => value && values.indexOf(value) === index
          );
        } else {
          console.error(error);
        }
        console.log(values);
      });
    
    };
  }, []);

  return (
  <>
  <div>Fetching data...</div>;

  </>
  )
};

export default Fetch;
