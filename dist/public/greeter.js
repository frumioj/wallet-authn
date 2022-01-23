var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SigningCosmosClient } from "@cosmjs/launchpad";
function greeter() {
    var useWallet = "Your wallet is not available";
    if (walletAuthEnabled()) {
        useWallet = "You may use your wallet to authenticate";
        const chainId = "my-chain";
        enableWallet(chainId);
    }
    return useWallet;
}
function walletAuthEnabled() {
    return !!window.keplr;
}
function enableWallet(chainId) {
    window.keplr.enable(chainId);
}
/*
window.onload = async () => {
    console.log("ONLOAD") ;
    document.body.textContent = greeter();
} ;
*/
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!window.keplr) {
        alert("Please install keplr extension");
    }
    else {
        const chainId = "cosmoshub-4";
        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        yield window.keplr.enable(chainId);
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = yield offlineSigner.getAccounts();
        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        const cosmJS = new SigningCosmosClient("https://lcd-cosmoshub.keplr.app", accounts[0].address, offlineSigner);
    }
});
//# sourceMappingURL=greeter.js.map