import React, { useEffect, useState } from "react";
import axios from "axios";


const useBitcoin = () => {
  // KODUNUZ BURAYA GELECEK
  const [bitcoin, setBitcoin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.data;

        console.log(data);
        setBitcoin(data.bpi.USD.rate_float); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return bitcoin;
};


function App() {
  // KODUNUZ BURAYA GELECEK
  const bitcoinPrice = useBitcoin();

  if (bitcoinPrice === null) {
    return <div className="flex items-center justify-center h-screen bg-gray-100"><div className="text-xl">Loading...</div></div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bitcoin Fiyatı</h1>
      <p className="text-2xl text-green-600">{bitcoinPrice.toFixed(2)} $</p>
      <p className="text-gray-600 mt-2">Güncel Fiyat (USD)</p>
    </div>
  );
}

export default App;
