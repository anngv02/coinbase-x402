import { log } from "./log.js";

/**
 * Log thông tin về địa chỉ ví nhận thanh toán
 */
export function logPaymentInfo(walletAddress, network = "base-sepolia") {
  if (!walletAddress) {
    log("WARNING: WALLET_ADDRESS chưa được cấu hình trong .env file!", "error");
    return;
  }

  log("=".repeat(60), "info");
  log("💰 THÔNG TIN VÍ NHẬN THANH TOÁN", "info");
  log("=".repeat(60), "info");
  log(`📍 Địa chỉ ví: ${walletAddress}`, "info");
  log(`🌐 Network: ${network}`, "info");
  
  // Tạo link blockchain explorer
  const explorerUrl = getExplorerUrl(walletAddress, network);
  log(`🔍 Xem trên Blockchain Explorer: ${explorerUrl}`, "info");
  
  log("=".repeat(60), "info");
  log("", "info");
}

/**
 * Lấy URL blockchain explorer dựa trên network
 */
export function getExplorerUrl(address, network = "base-sepolia") {
  const explorers = {
    "base-sepolia": `https://sepolia.basescan.org/address/${address}`,
    "base": `https://basescan.org/address/${address}`,
    "base-goerli": `https://goerli.basescan.org/address/${address}`,
  };

  return explorers[network] || `https://sepolia.basescan.org/address/${address}`;
}

/**
 * Tạo transaction explorer URL
 */
export function getTransactionUrl(txHash, network = "base-sepolia") {
  const explorers = {
    "base-sepolia": `https://sepolia.basescan.org/tx/${txHash}`,
    "base": `https://basescan.org/tx/${txHash}`,
    "base-goerli": `https://goerli.basescan.org/tx/${txHash}`,
  };

  return explorers[network] || `https://sepolia.basescan.org/tx/${txHash}`;
}

/**
 * Log thông tin payment request
 */
export function logPaymentRequest(req, walletAddress, price, network) {
  log("=".repeat(60), "info");
  log("💳 YÊU CẦU THANH TOÁN", "info");
  log("=".repeat(60), "info");
  log(`👤 IP: ${req.ip || req.headers["x-forwarded-for"] || "unknown"}`, "info");
  log(`📍 Địa chỉ ví nhận: ${walletAddress}`, "info");
  log(`💵 Giá: ${price}`, "info");
  log(`🌐 Network: ${network}`, "info");
  log(`🔗 Endpoint: ${req.method} ${req.url}`, "info");
  log("=".repeat(60), "info");
}

