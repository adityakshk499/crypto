import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine,SparklinesReferenceLine } from 'react-sparklines';
 import {FaHome} from 'react-icons/fa'
const Trending = () => {
    const [trending, settrending] = useState([]);
 

    useEffect(() => {
      const url = "https://api.coingecko.com/api/v3/search/trending";
      axios
        .get(url)
        .then((res) => {
          res.data.coins.map((data) => {
            axios.get(
              `https://api.coingecko.com/api/v3/coins/${data.item.id}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
            ).then(res => settrending(trending => [...trending,res.data]))
          });
        })
        .catch((err) => console.log(err));
    }, []);

  return <>
    <div className="flex-col flex justify-center items-center mx-auto my-5">
    {trending.map(trending => (
        <div key={trending.id}  className="w-[90%] rounded-md border my-8 shadow-xl bg-slate-200 dark:bg-slate-700 dark:shadow-zinc-800  ">
            {/* <p className="text-2xl font-serif my-3  font-bold text-center">{trending.name}</p> */}
            <div  className="grid md:grid-cols-3 mx-4 my-7">
                
                <div className="md:col-span-2 row-span md:mb-0 mb-10">
                <div className="flex - flex-col items-center justify-center  sm:items-start">
                <div className="flex flex-row space-x-2 ">
                <img className='w-6 md:w-8' src={trending.image.small} alt="/" />
               <p className="text-2xl font-bold"> {trending.name} </p>
               
                </div>
                <div className='flex flex-row space-x-2' >
                <p className="text-2xl font-bold capitalize">({trending.symbol})</p>
                </div>
                <div className="flex flex-row space-x-2 ">
                <p className="text-xl font-semibold">{trending.market_data.current_price.inr.toLocaleString()}<small className="text-x font-thin">INR</small> </p>
                
                {trending.market_data.price_change_percentage_24h_in_currency.inr>=0?<p className="text-green-700 text-xl font-semibold">{trending.market_data.price_change_percentage_24h_in_currency.inr} &uArr;</p>:
                   <p className="text-xl font-semibold text-red-600">{trending.market_data.price_change_percentage_24h_in_currency.inr} &dArr;</p>}
                </div> 
                <div className="flex flex-row space-x-2 ">
                    
                  <p className="text-xl font-bold">Capacity-₹{trending.market_data.market_cap.inr.toLocaleString()}</p>
                </div>
                <div className="flex flex-row space-x-2">
                <p className="text-xl font-bold">{trending.categories[0]}</p>
                </div>
                <div className="flex flex-row space-x-2">
                    <p className="text-xl font-semibold">Sentiments-</p>
                    <p className="text-xl font-thin text-green-600"> {trending.sentiment_votes_up_percentage}% &uArr;</p>
                    <p className="text-xl font-thin text-red-600">{trending.sentiment_votes_down_percentage}% &dArr;</p>
                </div>
                
                
                <div  className="flex flex-row space-x-2 mt-2" >
                  <a href={trending.links.homepage[0]} rel="noreferrer"  target='_blank'><FaHome size={20}/></a>
                </div>
                

                </div>
                </div>
                <Sparklines data={trending.market_data.sparkline_7d.price}>
                <SparklinesLine style={{ fill: "none" }} />
                <SparklinesReferenceLine type="mean" />
                {/* <SparklinesLine color="teal" /> */}
                </Sparklines>
                
            </div>
        </div>

    ))}
      
    </div>

  </>;
};

export default Trending;
