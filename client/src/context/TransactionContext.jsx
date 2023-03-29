import React, {useState} from 'react';
import {ethers} from 'ethers';
import {contractAddress, contractABI} from '../utils/constants'
export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log(
        provider,
        signer,
        transactionsContract
    );

    return transactionsContract;
}




export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo : '', amount : ''});
    const [isLoading, setIsLoading] = useState(false);
    const name = 'het';
    const age = 17;
 
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({
                method : "eth_requestAccounts"
            });
            setCurrentAccount(accounts[0]);
            console.log(currentAccount);

        }catch(error){
            console.log("Ethereum object not found");
        }
    }

    const fetchBalance = async () =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer =  provider.getSigner()
        let balance =  await provider.getBalance(currentAccount);
        return balance;
    };

    const handleChange = (e, name) => {
        console.log(formData);
        setFormData((prevState)=>({...prevState, [name] : e.target.value}));
        
    };

    const sendTransaction = async () => {

            if(!ethereum) return alert("Please Install Metamask.")
                const {addressTo, amount} = formData;
                const transactionContract = await getEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount);
                await ethereum.request({
                    method : "eth_sendTransaction",
                    params : [{
                        from : currentAccount,
                        to : addressTo,
                        gas : '0x5208',
                        value : parsedAmount._hex,
                    }]
                });

                const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount);
                setIsLoading(true);
                console.log(`Loading : ${transactionHash.hash}`);
                await transactionHash.wait();
                setIsLoading(false);
                console.log(`Success : ${transactionHash.hash}`);

                const transactionCount = await transactionContract.getTransactionCount();
    };

    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, handleChange, formData, sendTransaction, isLoading, fetchBalance}}>
            {children}
        </TransactionContext.Provider>
    );
}