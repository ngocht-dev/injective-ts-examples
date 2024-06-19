import { config } from "dotenv";
import { getNetworkInfo, Network } from "@injectivelabs/networks";
import {
  TxClient,
  PrivateKey,
  TxRestClient,
  ChainRestAuthApi,
  createTransaction,
  MsgSend,
  getGasPriceBasedOnMessage,
} from "@injectivelabs/sdk-ts";
import {
  BigNumberInBase,
  DEFAULT_STD_FEE,
  getStdFee,
} from "@injectivelabs/utils";

config();

/** MsgSend Example */
(async () => {
  const network = getNetworkInfo(Network.Testnet);

  const fee_ = getStdFee({});
  console.log("fee before", fee_, DEFAULT_STD_FEE);
  const privateKeyHash = process.env.PRIVATE_KEY as string;

  console.log("privateKeyHash: ", privateKeyHash);
  const privateKey = PrivateKey.fromHex(privateKeyHash);
  const injectiveAddress = privateKey.toBech32();
  const publicKey = privateKey.toPublicKey().toBase64();

  /** Account Details **/
  const accountDetails = await new ChainRestAuthApi(network.rest).fetchAccount(
    injectiveAddress
  );

  /** Prepare the Message */
  const amount = {
    amount: new BigNumberInBase(0.01).toWei().toFixed(),
    denom: "inj",
  };

  const msg = MsgSend.fromJSON({
    amount,
    srcInjectiveAddress: injectiveAddress,
    dstInjectiveAddress: injectiveAddress,
  });

  console.log("getGasPriceBasedOnMessage: ", getGasPriceBasedOnMessage([msg]);

  /** Prepare the Transaction **/
  const { signBytes, txRaw } = createTransaction({
    message: msg,
    memo: "",
    fee: DEFAULT_STD_FEE,
    pubKey: publicKey,
    sequence: parseInt(accountDetails.account.base_account.sequence, 10),
    accountNumber: parseInt(
      accountDetails.account.base_account.account_number,
      10
    ),
    chainId: network.chainId,
  });

  /** Sign transaction */
  const signature = await privateKey.sign(Buffer.from(signBytes));

  /** Append Signatures */
  txRaw.signatures = [signature];

  /** Calculate hash of the transaction */
  console.log(`Transaction Hash: ${TxClient.hash(txRaw)}`);

  const txService = new TxRestClient(network.rest);

  /** Simulate transaction */
  const simulationResponse = await txService.simulate(txRaw);
  console.log(
    `Transaction simulation response: ${JSON.stringify(
      simulationResponse.gasInfo
    )}`
  );

  const fee = getStdFee({
    gas: simulationResponse.gasInfo.gasUsed,
  });

  console.log("fee after: ", fee);
})();
