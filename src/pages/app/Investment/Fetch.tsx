//@ts-ignore
import * as finnhub from "finnhub";
import { useEffect, useState } from "react";
import { formatNumber } from "../../../utils/formatterFunctions";


const api_key = finnhub.ApiClient.instance.authentications["api_key"];
const key = import.meta.env.VITE_API_KEY;
api_key.apiKey = key;
const finnhubClient = new finnhub.DefaultApi();

const Fetch = () => {

  const [quote, setQuote] = useState();
  const symbol = "TSLA";
  
  useEffect(() => {
    //@ts-ignore
    finnhubClient.quote(`${symbol}`, (error, data, response) => {
      console.log(data);
      setQuote(data);
    });
  }, []);
    
    return (
        <>
        <div>
        {quote ? (
          <div>
            <h1 className="text-mm-text-white">Tesla</h1>
            {/* @ts-ignore */}
            <p className="text-mm-text-white">Current price: {formatNumber(quote.c)}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
        </>
    )
}

export default Fetch;
