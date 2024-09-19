import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/card';
import Cart from './components/cart/cart';
import { getData } from './constants/db';

const tickets = getData();

const telegram = window.Telegram.WebApp;

const App = () =>{
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    telegram.ready();

  });

  const onAddItem = item => {
    const existItem = cartItems.find(c => c.id == item.id);

    if(existItem){
      const newData =cartItems.map(c => 
        c.id == item.id 
        ? {...existItem, quantity: existItem.quantity + 1} 
        : c
      );     
      setCartItems(newData);
    }
    else{
      const newData = [...cartItems, {...item, quantity : 1}];
      setCartItems(newData);
    }
  };

  const onRemoveItem = item => {
    const existItem = cartItems.find(c => c.id == item.id);    

    if(existItem.quantity == 1) {
      const newData = cartItems.filter(c => c.id != existItem.id);      
      setCartItems(newData);            
    }
    else{
      const newData = cartItems.map(c => 
        c.id == existItem.id 
        ? {...existItem, quantity: existItem.quantity -1} 
        : c
      );     
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Payment details";
    telegram.MainButton.show();
  };

  const onSendData = useCallback(() => {
    const queryID = telegram.initDataUnsave?.queryID;

    if(queryID){
      fetch("http://localhost:8000/web-data",{
        method: "POST",
        headers: {
          'Content-Type':'appication/json',

        },
        body: JSON.stringify(cartItems),
      });
    }
    else{
      telegram.sendData(JSON.stringify(cartItems));
    }
    
  }, [cartItems]);

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', onSendData);

    return () => telegram.offEvent('mainButtonClicked', onSendData);
  },[onSendData]);
  
  return (
    <>
    <h1 className='heading'>Chance Raffle</h1>
    <Cart cartItems={cartItems} onCheckout={onCheckout}/>
    <div className='cards__container'>
      {tickets.map(ticket => (
        <Card 
          key={ticket.id} 
          ticket={ticket} 
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      ))}      
    </div>
    </>
  );
  
};

export default App;