import "./App.css";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { generateMnemonic } from "bip39";
import Wallet from "./components/Wallet";
import { generatePublicKeyForSol } from "./lib/utils";

function App() {
  const [mnemonic, setMnemonic] = useState<string>("");

  const handleGenerateMnemonic = async () => {
    const mne = await generateMnemonic();
    setMnemonic(mne);
  };
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Button onClick={handleGenerateMnemonic}>Generate Mnemonic</Button>
      {mnemonic && <p>{mnemonic}</p>}
      <div>
        <h2 className='text-2xl font-bold'>Generated Mnemonic:</h2>
        <p className='text-lg'>{mnemonic}</p>
      </div>
      {mnemonic && (
        <Wallet
          mnemonic={mnemonic}
          generatePublicKey={generatePublicKeyForSol}
        />
      )}
    </div>
  );
}

export default App;
