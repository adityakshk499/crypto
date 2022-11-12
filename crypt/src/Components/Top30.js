import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { RiCoinsLine } from "react-icons/ri";
const Top30 = () => {
  const [coins, setcoins] = useState([]);
  const [value, setvalue] = useState("");
 
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=true";

    axios
      .get(url)
      .then((res) => {
        setcoins(res.data);
        
      })
      .catch((err) => console.log(err));
  }, []);

  const handlechange = (e) => {
    setvalue(e.target.value);
  };

  return (
    <>
      <div className=" flex flex-col items-center  my-6 mx-auto">
        <p>1.These are the top-50 Crypto in which you can invest.</p>
        <p>2. &#8593;&#8595; stands for price change in last 24hrs.</p>
        <p>3. Prices of cryptos are in INR.</p>
        <input
          onChange={handlechange}
          value={value}
          placeholder="Search here the desired cryptos....... "
          className="mx-auto w-[70%] md:w-[50%] mt-3 rounded-xl border dark:border-purple-900 dark:bg-secondary p-3 shadow-lg shadow-slate-400 dark:shadow-gray-600"
          type="text"
        />
      </div>

      
    
        
      

      <table className=" w-[95%]  text-center border  my-6 mx-auto">
        <thead className="border ">
          <tr >

            <th className="text-sm  ">Rank</th>
            <th className="text-sm p-4 ">
              <RiCoinsLine />
            </th>
            <th className="text-sm ">Name</th>
            <th className="text-sm ">Price</th>

            <th className=" text-sm ">&#8593;&#8595;</th>
            <th className="text-sm ">&#8593;&#8595;%</th>

            <th className="text-sm ">Graph</th>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((match) => {
              if (value === "") {
                return match;
              }
              else if(match.name.toLowerCase().includes(value.toLowerCase())){
                return match
              }
              
            })
            .map((coin, index) => (
              <tr className="border text-center border-  " key={coin.id}>
                <td className="text-sm font-light ">{coin.market_cap_rank}</td>
                <td>
                  <img className="w-4 md:w-7" src={coin.image} alt="/" />
                </td>
                <td className="text-sm font-light">{coin.name}</td>
                <td className="text-sm font-light">
                  {coin.current_price.toLocaleString()}
                </td>

                <td className="text-sm font-light ">
                  {coin.price_change_24h.toFixed(0)}
                </td>
                <td className={coin.price_change_percentage_24h.toFixed(0)>=0?"text-sm font-light dark: text-green-500":"text-sm font-light dark: text-red-500"}>
                  {coin.price_change_percentage_24h.toFixed(0)}
                </td>

                <td className="text-sm font-light">
                  <Sparklines data={coin.sparkline_in_7d.price}>
                    <SparklinesLine color="teal" />
                  </Sparklines>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Top30;
