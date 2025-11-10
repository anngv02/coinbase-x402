# x402 Video Paywall Demo

This project demonstrates how to implement a paywall for video content using the [x402 payment protocol](https://www.x402.org/). The web app allows users to pay a small amount of cryptocurrency (USDC) to access a paywalled video.

## Features

- Simple Express.js server with x402 payment middleware
- Paywalled endpoint for accessing premium video content
- Client-side implementation for making payments
- Base Sepolia testnet integration for easy testing
- View wallet address and transaction details
- Access payment information via web UI
- Quick command-line tool to check wallet address
- Track payment requests and successful transactions

## Prerequisites

- Node.js (>v18)
- A EVM-compatible wallet with Base Sepolia USDC
- An Ethereum wallet address to receive payments (configured in `.env` file)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/anngv02/coinbase-x402.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the following variables (replace `WALLET_ADDRESS` with your actual wallet address where you want to receive payments):

   ```env
   WALLET_ADDRESS=your_ethereum_wallet_address
   NODE_ENV=development
   PORT=4021
   ```

   **Important**: Make sure this is a wallet address you control, as all payments will be sent directly to this address.

4. Get Base Sepolia USDC for testing:
   - Visit https://faucet.circle.com/
   - Select Base Sepolia in the network dropdown
   - Request test USDC

5. Start the development server:
   ```bash
   npm run dev
   ```

   When the server starts, you'll see payment information logged to the console:
   ```
   ============================================================
   💰 THÔNG TIN VÍ NHẬN THANH TOÁN
   ============================================================
   📍 Địa chỉ ví: 0x...
   🌐 Network: base-sepolia
   🔍 Xem trên Blockchain Explorer: https://sepolia.basescan.org/address/0x...
   ============================================================
   ```

6. Open your browser and navigate to `http://localhost:4021`

## How It Works

1. The server uses the `x402-express` middleware to protect the `/authenticate` endpoint
2. When a user tries to access the protected endpoint, they are required to make a payment
3. The payment is processed through the x402 facilitator service
4. After successful payment verification, the user is redirected to `/video-content`, where the premium video content is served
5. All payments are sent directly to the wallet address configured in your `.env` file
6. Payment information is logged to the console and can be viewed via the web interface

## Payment Tracking

This project includes several ways to track and monitor payments:

### 1. Check Payment Info via CLI

Run the included script to quickly view your wallet address and explorer link:

```bash
npm run check-payments
```

This will display:
- Your receiving wallet address
- Network (base-sepolia)
- Direct link to BaseScan explorer

### 2. View Payment Info on Web

When the server is running, visit:

```
http://localhost:4021/payment-info
```

This page displays:
- Wallet address receiving payments
- Network and price configuration
- Direct link to view transactions on BaseScan
- Instructions for tracking transactions

### 3. View Transactions on BaseScan

All payments are sent directly to your configured wallet address. You can view all transactions by:

1. Getting your wallet address from the logs, CLI script, or web interface
2. Visiting: `https://sepolia.basescan.org/address/YOUR_WALLET_ADDRESS`
3. Viewing transaction details including:
   - Transaction hash
   - Sender and receiver addresses
   - Amount and token (USDC)
   - Timestamp
   - Gas fees
   - Transaction status

### 4. API Endpoint

Get payment information programmatically via the API:

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

### 5. Server Logs

When a payment is made, the server logs detailed information:

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

For more detailed information about payment tracking, see [PAYMENT-TRACKING.md](./PAYMENT-TRACKING.md).

## Project Structure

```
coinbase-x402/
├── api/
│   └── index.js              # Express server with x402 middleware
├── handlers/
│   └── videoAccessHandler.js # Handler for video content
├── public/
│   ├── index.html           # Home page
│   ├── payment-info.html    # Payment info web interface
│   ├── video-content.html   # Protected video content
│   └── ...
├── scripts/
│   └── check-payments.js    # CLI script to check wallet address
├── utils/
│   ├── log.js               # Logging utility
│   └── paymentTracker.js    # Payment tracking utilities
├── package.json
└── README.md
```

## Customizing

### Change the Price

Modify the `price` variable in `api/index.js`:

```javascript
const price = "$0.10"; // Change to your desired price
```

### Change the Video

Update the video source in `public/video-content.html`

### Deploy on Base Mainnet

To deploy on Base mainnet:

1. Update the network configuration in `api/index.js`:
   ```javascript
   const network = "base"; // Change from "base-sepolia" to "base"
   ```

2. You'll need CDP API Keys from Coinbase Developer Platform
3. Update the facilitator configuration to use Coinbase's hosted facilitator
4. Make sure your wallet has sufficient funds on Base mainnet

## Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (auto-reload)
- `npm run check-payments` - Check wallet address and explorer link
- `npm test` - Run tests (if available)

## Security Notes

- **Never share your private key** for the receiving wallet address
- **Verify the wallet address** before deploying to production
- **Use a separate wallet** for each application
- **Backup your private key** securely
- **Test thoroughly** on testnet before deploying to mainnet

## Troubleshooting

### Wallet address not showing in logs?

1. Check that the `.env` file exists
2. Verify `WALLET_ADDRESS` is set correctly
3. Restart the server after changing `.env`

### Not seeing transactions on BaseScan?

1. Verify you're checking the correct network (base-sepolia vs base mainnet)
2. Check that the wallet address is correct
3. Wait a few minutes for transactions to be confirmed
4. Check the transaction hash in browser console

### Payment not working?

1. Ensure you have testnet USDC in your wallet
2. Check that the facilitator URL is accessible
3. Verify network configuration matches your wallet
4. Check server logs for error messages

For more troubleshooting tips, see [PAYMENT-TRACKING.md](./PAYMENT-TRACKING.md).

## Resources

- [x402 Protocol Documentation](https://www.x402.org/)
- [Coinbase Developer Platform](https://www.coinbase.com/developer-platform)
- [Base Sepolia Faucet](https://faucet.circle.com/)
- [BaseScan Explorer](https://sepolia.basescan.org/)

## License

MIT
