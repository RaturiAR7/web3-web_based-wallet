import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { clsx, type ClassValue } from "clsx";
import { derivePath } from "ed25519-hd-key";
import { twMerge } from "tailwind-merge";
import nacl from "tweetnacl";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GeneratePublicKeyForSolParams {
  mnemonic: string;
  currentIndex: number;
}

export const generatePublicKeyForSol = async (
  mnemonic: GeneratePublicKeyForSolParams["mnemonic"],
  currentIndex: GeneratePublicKeyForSolParams["currentIndex"]
): Promise<string> => {
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${currentIndex}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keyPair = Keypair.fromSecretKey(secret);
  console.log("Keypair", keyPair);
  return keyPair.publicKey.toBase58();
};
