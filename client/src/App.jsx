import { WalletConnected, WalletNotConnected } from "./components";
import {useState} from 'react';
import {useContext} from 'react';
import {TransactionContext} from './context/TransactionContext';

const App = () => {

  
  const {ethereum} = window;
  const {connectWallet, currentAccount, handleChange, formData, sendTransaction} = useContext(TransactionContext);
  
  const walletConnected = () => {

  }

  return (
    <div>
      {currentAccount 
       
       
       ?  <WalletConnected />
       
       : <WalletNotConnected />

      }
    </div>
  );
};

export default App;