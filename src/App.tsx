import "./App.css";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { generateMnemonic } from "bip39";
import Wallet from "./components/Wallet";
import { generatePublicKeyForSol, generatePublicKeyForEth } from "./lib/utils";

function App() {
  const [mnemonic, setMnemonic] = useState<string>("");

  const handleGenerateMnemonic = async () => {
    const mne = await generateMnemonic();
    setMnemonic(mne);
  };
  return (
    <div className='flex flex-col px-20 gap-5 mx-auto'>
      <h1 className='text-3xl font-bold underline'>Hello Geeks!</h1>
      <Button className='' onClick={handleGenerateMnemonic}>
        Generate Mnemonic
      </Button>
      {mnemonic && (
        <div>
          <h2 className='text-2xl font-bold'>Generated Mnemonic:</h2>
          <p className='text-lg'>{mnemonic}</p>
        </div>
      )}
      {mnemonic && (
        <Wallet
          title='Solana'
          mnemonic={mnemonic}
          generatePublicKey={generatePublicKeyForSol}
        />
      )}
      {mnemonic && (
        <Wallet
          title='Ethereum'
          mnemonic={mnemonic}
          generatePublicKey={generatePublicKeyForEth}
        />
      )}
    </div>
  );
}

export default App;
