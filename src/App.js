import React, { useEffect, useState } from 'react';

import ConverterForm from './ConverterForm';

import './App.css';

const BASE_URL = 'http://data.fixer.io/api/';

const App = () => {

  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(`${BASE_URL}latest?access_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencies([...Object.keys(data.rates)]);
        setExchangeRate(data.rates[firstCurrency]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${BASE_URL}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setExchangeRate(data.rates[toCurrency])}
          );
    }
  }, [fromCurrency, toCurrency]);


  const handleFromAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  const handleToAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <ConverterForm 
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        selectedCurrency={fromCurrency} 
        currencies={currencies} />
      <span>=</span>
      <ConverterForm 
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        selectedCurrency={toCurrency}
        currencies={currencies} />
    </div>
  );
}

export default App;
