import {useContext } from 'react';
import {ethers} from 'ethers';
import { TransactionContext } from '../context/TransactionContext';


const WalletConnected =  () => {

    const {connectWallet, currentAccount, handleChange, formData, sendTransaction, isLoading, fetchBalance} = useContext(TransactionContext);
    

    const handleSubmit = (e) => {
      
      const {addressTo, amount} = formData;
      console.log(addressTo);
      console.log(amount);
      e.preventDefault();
      if(!addressTo || !amount ) {
        alert("Details not enough...");
      }
      sendTransaction();


  
    };

    return (
        <div className="bg-white mx-5 my-5 px-5 py-5 shadow rounded-lg">
    
          <div className="bg-white font-semibold text-xl text-center font-sans">
            Transaction House 
          </div>
    
          <div className="bg-gray-500 px-5 py-5 rounded-lg my-5 ">
            <div className="bg-gray-500">
              <div className="bg-gray-500  text-white inline font-semibold">
                Balance (Eth) : 
              </div>
              <div className="bg-white font-semibold py-1 px-1 inline ml-2 rounded-lg shadow ">
                  
              </div> <br />
    
            </div>
    
    
            <div className="bg-gray-500 mt-5">
              <div className="bg-gray-500 mt-2 text-white inline font-semibold">
                  Address: 
              </div>
              <div className="bg-white font-semibold py-1 px-1 inline ml-2 rounded-lg shadow ">
                  {currentAccount}
              </div> 
            </div>
              
            
          </div>
    
          <div className="bg-white">
            <form action="" className="bg-white">
              <label htmlFor="" className="bg-white block">To : </label>
              <input type="text" onChange={(e)=>handleChange(e, "addressTo")} name="addressTo" className="bg-white border mt-2 w-full rounded-lg  focus:outline-gray-500 " />
              <label htmlFor="" className="bg-white block mt-3">Amount : </label>
              <input type="number" onChange={(e)=>handleChange(e, "amount")} name="amount" className="bg-white border mt-2 w-full rounded-lg focus:outline-gray-500"/>
              {isLoading 
                ? <button type='button' class=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-300 hover:bg-gray-700 focus:outline-none mt-5 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 " disabled onClick={handleSubmit} >Send Now</button>
                : <button type='button' class=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none mt-5 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 " onClick={handleSubmit} >Send Now</button>
              }
              
            </form>
          </div>
          
        </div>
    );
};

export default WalletConnected;