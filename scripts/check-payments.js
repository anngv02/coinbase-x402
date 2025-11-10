#!/usr/bin/env node

/**
 * Script để kiểm tra địa chỉ ví nhận thanh toán và xem transactions
 * 
 * Usage: node scripts/check-payments.js
 */

import dotenv from "dotenv";
import { getExplorerUrl } from "../utils/paymentTracker.js";

dotenv.config();

const walletAddress = process.env.WALLET_ADDRESS;
const network = "base-sepolia";

if (!walletAddress) {
  console.error("❌ ERROR: WALLET_ADDRESS chưa được cấu hình trong file .env");
  console.log("\nVui lòng tạo file .env với nội dung:");
  console.log("WALLET_ADDRESS=your_ethereum_wallet_address");
  process.exit(1);
}

console.log("=".repeat(60));
console.log("💰 THÔNG TIN VÍ NHẬN THANH TOÁN");
console.log("=".repeat(60));
console.log(`📍 Địa chỉ ví: ${walletAddress}`);
console.log(`🌐 Network: ${network}`);
console.log(`🔗 Explorer URL: ${getExplorerUrl(walletAddress, network)}`);
console.log("=".repeat(60));
console.log("\n📋 HƯỚNG DẪN:");
console.log("1. Mở link Explorer URL phía trên trong browser");
console.log("2. Bạn sẽ thấy:");
console.log("   - Tất cả transactions đến địa chỉ này");
console.log("   - Số dư USDC hiện tại");
console.log("   - Chi tiết từng transaction (sender, amount, timestamp)");
console.log("3. Để xem chi tiết một transaction:");
console.log("   - Click vào transaction hash");
console.log("   - Xem: từ địa chỉ nào, số tiền, gas fee, timestamp");
console.log("\n💡 TIP: Bạn cũng có thể truy cập http://localhost:4021/payment-info");
console.log("   khi server đang chạy để xem thông tin này trên web.");

