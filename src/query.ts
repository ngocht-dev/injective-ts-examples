import { config } from "dotenv";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { IndexerGrpcAccountPortfolioApi } from "@injectivelabs/sdk-ts";

config();

/** Querying Example */
(async () => {
  const endpoints = getNetworkEndpoints(Network.Testnet);
  const indexerGrpcAccountPortfolioApi = new IndexerGrpcAccountPortfolioApi(
    endpoints.indexer
  );

  const injectiveAddress = "inj18hlsqavw8gcyf2gdqjvpr2zxrwxm7lm2zceq0d";
  const portfolio =
    await indexerGrpcAccountPortfolioApi.fetchAccountPortfolioBalances(
      injectiveAddress
    );

  console.log(portfolio);
})();
