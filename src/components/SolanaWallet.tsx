import { useState } from "react";
import { Button } from "./ui/button";
import { generatePublicKeyForSol } from "@/lib/utils";

interface SolanaWalletProps {
  mnemonic: string;
}

const SolanaWallet = ({ mnemonic }: SolanaWalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const generatePublicKey = async () => {
    const publicKey = await generatePublicKeyForSol(mnemonic, currentIndex);
    setPublicKeys((prev) => [...prev, publicKey]);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div>
      <Button onClick={generatePublicKey}>Add a Sol Wallet</Button>
      <div>
        <h1>
          My Sol Wallets:
          {publicKeys.map((p, index) => {
            return <div key={index}>{p}</div>;
          })}
        </h1>
      </div>
    </div>
  );
};

export default SolanaWallet;
