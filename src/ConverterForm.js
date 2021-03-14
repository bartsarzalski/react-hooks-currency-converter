import React from 'react';

const ConverterForm = (props) => {
    const {
        currencies, 
        selectedCurrency, 
        onChangeAmount, 
        amount,
        onChangeCurrency,
    } = props;

    return (
        <div>
            <input 
                type="number" 
                value={amount} 
                onChange={onChangeAmount} 
            />
            <select 
                value={selectedCurrency} 
                onChange={onChangeCurrency} > 
                {
                    currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)
                }
            </select>
        </div>
    );
}

export default ConverterForm;