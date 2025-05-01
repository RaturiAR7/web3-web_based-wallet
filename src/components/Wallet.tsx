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
    <div className='flex flex-col justify-center items-center p-10 gap-5 w-full'>
      <Button className='bg-gray-950' onClick={handlegGeneratePublicKey}>
        Add a {title} Wallet
      </Button>
      <Accordion type='single' collapsible className='w-[50%]'>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='bg-[#242124] flex justify-center gap-2'>
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
