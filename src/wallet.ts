import { config } from "dotenv";
import { PrivateKey } from "@injectivelabs/sdk-ts";

config();

(async () => {
  const privateKeyHash = process.env.PRIVATE_KEY as string;

  const privateKeyFromHex = PrivateKey.fromPrivateKey(privateKeyHash);
  console.log("privateKeyFromHex: ", privateKeyFromHex);

  const address =
    privateKeyFromHex.toAddress(); /* or privateKeyFromHex.toAddress() */
  console.log({
    injectiveAddress: address.toBech32(),
    ethereumAddress: address.toHex(),
  });
})();
