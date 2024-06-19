import { config } from "dotenv";
import { Network, getNetworkEndpoints } from "@injectivelabs/networks";
import {
  // InjectiveStargate,
  InjectiveDirectEthSecp256k1Wallet,
} from "@injectivelabs/sdk-ts";
// import { BigNumberInBase, getDefaultStdFee } from "@injectivelabs/utils";

config();

(async () => {
  console.log('network: ', Network.Devnet)
  const endpoints = getNetworkEndpoints(Network.Devnet);
  console.log('endpoints: ', endpoints);
  const privateKeyHash = process.env.PRIVATE_KEY as string;
  const wallet = await InjectiveDirectEthSecp256k1Wallet.fromKey(
    Buffer.from(privateKeyHash, "hex")
  );

  console.log('wallet: ', wallet.address)


  // const [firstAccount] = await wallet.getAccounts();

  // const rpcEndpoint = endpoints.rpc as string;
  // const client =
  //   await InjectiveStargate.InjectiveSigningStargateClient.connectWithSigner(
  //     rpcEndpoint,
  //     wallet as any
  //   );

  // const recipient = firstAccount.address;
  // const amount = {
  //   amount: new BigNumberInBase(0.001).toWei().toFixed(),
  //   denom: "inj",
  // };
  // const result = await client.sendTokens(
  //   firstAccount.address,
  //   recipient,
  //   [amount],
  //   getDefaultStdFee(),
  //   "Have fun with your inj coins"
  // );

  // console.log(result);
})();
