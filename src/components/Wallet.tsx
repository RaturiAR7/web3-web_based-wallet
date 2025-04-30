import { useState } from "react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='bg-gray-400 flex justify-center'>
            My {title} Wallets:
          </AccordionTrigger>
          {publicKeys.map((p, index) => {
            return <AccordionContent key={index}>{p}</AccordionContent>;
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Wallet;
