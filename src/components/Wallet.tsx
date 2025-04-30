import { useState } from "react";
import { Button } from "./ui/button";

interface WalletProps {
  title: string;
  mnemonic: string;
  generatePublicKey: (
    mnemonic: string,
    currentIndex: number
  ) => Promise<string>;
}

const Wallet = ({ title, mnemonic, generatePublicKey }: WalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const handlegGeneratePublicKey = async () => {
    const publicKey = await generatePublicKey(mnemonic, currentIndex);
    setPublicKeys((prev) => [...prev, publicKey]);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div>
      <Button onClick={handlegGeneratePublicKey}>Add a {title} Wallet</Button>
      <div>
        <h1>
          My {title} Wallets:
          {publicKeys.map((p, index) => {
            return <div key={index}>{p}</div>;
          })}
        </h1>
      </div>
    </div>
  );
};

export default Wallet;
