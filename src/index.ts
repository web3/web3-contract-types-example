import { Contract, Web3 } from "web3";
import ERC20 from "./artifacts/ERC20";

(async function() {
    const web3 = new Web3("https://goerli.infura.io/v3/fd1f29ab70844ef48e644489a411d4b3")

    const contract = new Contract(ERC20.abi, "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D", web3)
    
    const holder = "0xa8F6eB216e26C1F7d924A801E46eaE0CE8ed1A0A"
    
    const balance = await contract.methods.balanceOf(holder).call()
    const ticker = await contract.methods.symbol().call()
    
    console.log(`${holder} as ${balance.toString()} ${ticker} tokens`) 
})()