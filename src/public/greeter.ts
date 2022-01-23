import { Window as KeplrWindow } from "@keplr-wallet/types";
import { SigningCosmosClient } from "@cosmjs/launchpad" ;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

function greeter() {

    var useWallet = "Your wallet is not available" ;
    
    if (walletAuthEnabled()){
	useWallet = "You may use your wallet to authenticate" ;
	const chainId = "my-chain" ;

	enableWallet(chainId) ;
    }

    return useWallet ;
}

function walletAuthEnabled() {
  return !!window.keplr ;
}

function enableWallet(chainId: string) {
    window.keplr.enable( chainId ) ;
}

/*
window.onload = async () => {
    console.log("ONLOAD") ;
    document.body.textContent = greeter();
} ;
*/

window.onload = async () => {
    if (!window.keplr) {
        alert("Please install keplr extension");
    } else {
        const chainId = "cosmoshub-4";

        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId);
    
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
    
        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts();
    
        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        const cosmJS = new SigningCosmosClient(
            "https://lcd-cosmoshub.keplr.app",
            accounts[0].address,
            offlineSigner,
        );
    }
}
