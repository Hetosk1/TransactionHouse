import {TransactionContext} from '../context/TransactionContext';
import {useContext} from 'react';


const WalletNotConnected = () => {
    const {connectWallet, currentAccount} = useContext(TransactionContext);
    return (
        <div className="bg-white shadow rounded-lg mt-10 mb-5 mr-5 ml-5 py-8 px-6">
            <h1 className="bg-white text-center">Wallet Not Connected</h1>
            <button type="submit" class=" mt-5 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={connectWallet}>Connect Now</button>
        </div>
    );
};

export default WalletNotConnected;