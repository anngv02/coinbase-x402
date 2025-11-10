Tài liệu này hướng dẫn cách theo dõi các giao dịch thanh toán trong ứng dụng x402 Video Paywall.

## 📍 Địa Chỉ Ví Nhận Thanh Toán

Tất cả các thanh toán từ người dùng sẽ được gửi trực tiếp đến địa chỉ ví được cấu hình trong file `.env`:

```
WALLET_ADDRESS=your_ethereum_wallet_address
```

## 🔍 Cách Kiểm Tra Địa Chỉ Ví

### Cách 1: Sử dụng Script CLI (Nhanh nhất)

```bash
npm run check-payments
```

Script này sẽ hiển thị:
- Địa chỉ ví nhận thanh toán
- Network (base-sepolia)
- Link đến Blockchain Explorer

### Cách 2: Truy cập Web Interface

Khi server đang chạy, truy cập:
```
http://localhost:4021/payment-info
```

Trang web sẽ hiển thị:
- Địa chỉ ví nhận thanh toán
- Network và giá
- Link trực tiếp đến BaseScan để xem transactions

### Cách 3: Kiểm tra Logs khi Server Khởi Động

Khi bạn chạy server (`npm run dev` hoặc `npm start`), thông tin về địa chỉ ví sẽ được log ngay khi server khởi động:

```
============================================================
💰 THÔNG TIN VÍ NHẬN THANH TOÁN
============================================================
📍 Địa chỉ ví: 0x...
🌐 Network: base-sepolia
🔍 Xem trên Blockchain Explorer: https://sepolia.basescan.org/address/0x...
============================================================
```

## 🌐 Xem Transactions trên Blockchain Explorer

### Base Sepolia Testnet

Sử dụng BaseScan để xem tất cả các giao dịch:
- **URL**: https://sepolia.basescan.org/address/YOUR_WALLET_ADDRESS
- **Thay thế** `YOUR_WALLET_ADDRESS` bằng địa chỉ ví của bạn

### Thông Tin Bạn Có Thể Xem:

1. **Tổng quan:**
   - Số dư USDC hiện tại
   - Tổng số transactions
   - Tổng giá trị nhận được

2. **Chi tiết từng transaction:**
   - Transaction Hash (TX Hash)
   - Từ địa chỉ nào (Sender)
   - Đến địa chỉ nào (Receiver - là ví của bạn)
   - Số tiền (Amount)
   - Token (USDC)
   - Timestamp
   - Gas fee
   - Status (Success/Failed)

3. **Click vào transaction hash** để xem:
   - Toàn bộ chi tiết transaction
   - Block number
   - Gas used
   - Logs và events

## 💰 Cách x402 Payment Hoạt Động

1. **Người dùng click "Pay $0.10 to Access Video"**
2. **x402 middleware yêu cầu thanh toán:**
   - Tạo payment request
   - Gửi đến facilitator (`https://x402.org/facilitator`)
3. **Người dùng thanh toán từ ví của họ:**
   - Ký transaction
   - Gửi USDC đến địa chỉ ví của bạn (`WALLET_ADDRESS`)
4. **Facilitator verify payment:**
   - Kiểm tra transaction trên blockchain
   - Xác nhận thanh toán thành công
5. **Server cho phép truy cập:**
   - Redirect đến `/video-content`
   - Log thông tin thanh toán

## 📊 Logging Khi Có Thanh Toán

Khi có người dùng thanh toán, server sẽ log:

```
============================================================
💳 YÊU CẦU THANH TOÁN
============================================================
👤 IP: 127.0.0.1
📍 Địa chỉ ví nhận: 0x...
💵 Giá: $0.10
🌐 Network: base-sepolia
🔗 Endpoint: GET /authenticate
============================================================
✅ Payment successful, redirecting to video content
💰 Tiền đã được gửi đến: 0x...
🔍 Xem transaction trên: https://sepolia.basescan.org/address/0x...
```

## 🔐 Lưu Ý Bảo Mật

- **Không chia sẻ private key** của địa chỉ ví nhận thanh toán
- **Kiểm tra địa chỉ ví** trước khi deploy lên production
- **Sử dụng ví riêng** cho mỗi ứng dụng
- **Backup private key** an toàn

## 🚀 Production Checklist

Trước khi deploy lên production:

- [ ] Đã cấu hình `WALLET_ADDRESS` đúng địa chỉ ví của bạn
- [ ] Đã test thanh toán trên testnet
- [ ] Đã kiểm tra transactions trên BaseScan
- [ ] Đã backup private key an toàn
- [ ] Đã chuyển từ testnet sang mainnet (nếu cần)
- [ ] Đã cập nhật facilitator URL (nếu dùng Coinbase CDP)

## 📝 API Endpoint

Bạn cũng có thể lấy thông tin thanh toán qua API:

```bash
curl http://localhost:4021/api/payment-info
```

Response:
```json
{
  "walletAddress": "0x...",
  "network": "base-sepolia",
  "price": "$0.10",
  "explorerUrl": "https://sepolia.basescan.org/address/0x...",
  "facilitatorUrl": "https://x402.org/facilitator"
}
```

## 🆘 Troubleshooting

### Không thấy transactions trên BaseScan?

1. Kiểm tra network đúng chưa (base-sepolia vs base mainnet)
2. Kiểm tra địa chỉ ví đúng chưa
3. Đợi vài phút để transaction được confirm
4. Kiểm tra transaction hash trong browser console

### Không thấy địa chỉ ví trong logs?

1. Kiểm tra file `.env` có tồn tại không
2. Kiểm tra `WALLET_ADDRESS` đã được set chưa
3. Restart server sau khi thay đổi `.env`

### Làm sao để xem transaction hash cụ thể?

Transaction hash được tạo bởi x402 protocol và có thể được xem trong:
- Browser console (khi thanh toán)
- Network tab trong DevTools
- Facilitator response

