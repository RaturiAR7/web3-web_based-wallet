import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { clsx, type ClassValue } from "clsx";
import { derivePath } from "ed25519-hd-key";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { twMerge } from "tailwind-merge";
import nacl from "tweetnacl";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GeneratePublicKeyParams {
  mnemonic: string;
  currentIndex: number;
}

export const generatePublicKeyForSol = async (
  mnemonic: GeneratePublicKeyParams["mnemonic"],
  currentIndex: GeneratePublicKeyParams["currentIndex"]
): Promise<string> => {
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${currentIndex}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keyPair = Keypair.fromSecretKey(secret);
  console.log("Keypair", keyPair);
  return keyPair.publicKey.toBase58();
};

export const generatePublicKeyForEth = async (
  mnemonic: GeneratePublicKeyParams["mnemonic"],
  currentIndex: GeneratePublicKeyParams["currentIndex"]
) => {
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/60'/${currentIndex}'/0'`;
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(path);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);
  return wallet.address;
};
