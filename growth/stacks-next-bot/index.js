console.log("🚀 stacks-next Growth Bot Starting...");

let pkg;

try {
  pkg = require("@yusufolosun/stacks-next");
  console.log("✅ Package loaded");
} catch (err) {
  console.log("⚠️ Failed to load package:", err.message);
}

(async () => {
  try {
    const {
      createStacksConfig,
      isValidStacksAddress,
      stxToMicroStx,
      estimateFee,
      createBnsName,
      truncateMemo,
      createContractReadCacheKey,
    } = pkg || {};

    // Safe usage checks
    const config =
      createStacksConfig?.({ network: "testnet" }) ?? null;

    console.log(
      "Address valid:",
      isValidStacksAddress?.(
        "SPJ6HB7H6NWVVR14D2PF2DBSQQG28T5CY5N5NT4"
      ) ?? "fallback"
    );

    console.log(
      "STX → micro:",
      stxToMicroStx?.("1.25") ?? "fallback"
    );

    if (estimateFee && config) {
      try {
        const fee = await estimateFee(config, {
          estimatedSize: 250,
        });
        console.log("Estimated fee:", fee);
      } catch (err) {
        console.log("⚠️ Fee estimation failed:", err.message);
      }
    }

    console.log(
      "BNS:",
      createBnsName?.("satoshi", "btc") ?? "fallback"
    );

    console.log(
      "Memo:",
      truncateMemo?.("payment for order #1234") ?? "fallback"
    );

    console.log(
      "Cache key:",
      createContractReadCacheKey?.({
        network: "testnet",
        contractId:
          "SPJ6HB7H6NWVVR14D2PF2DBSQQG28T5CY5N5NT4.my-contract",
        functionName: "get-balance",
        args: ["SPJ6HB7H6NWVVR14D2PF2DBSQQG28T5CY5N5NT4"],
        blockHeight: 12345,
      }) ?? "fallback"
    );
  } catch (err) {
    console.log("⚠️ Execution error:", err.message);
  }

  console.log("✅ Growth Bot Completed");
})();
