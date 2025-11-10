# x402 Video Paywall Demo

This project demonstrates how to implement a paywall for video content using the [x402 payment protocol](https://www.x402.org/). The web app allows users to pay a small amount of cryptocurrency (USDC) to access a paywalled video.

## 🌐 Live Demo

**Live deployment on Vercel:** [https://video-x402.vercel.app/](https://video-x402.vercel.app/)

Try it out! Pay $0.10 USDC on Base Sepolia testnet to access the premium video content.

## Features

- Simple Express.js server with x402 payment middleware
- Paywalled endpoint for accessing premium video content
- Client-side implementation for making payments
- Base Sepolia testnet integration for easy testing
- View wallet address and transaction details
- Access payment information via web UI
- Quick command-line tool to check wallet address
- Track payment requests and successful transactions
- **Ready for both local development and Vercel deployment**

## Prerequisites

- Node.js (>v18)
- A EVM-compatible wallet with Base Sepolia USDC (for testing payments)
- (Optional) An Ethereum wallet address to receive payments - if not provided, a default address will be used

## Quick Start

### Option 1: Local Development

1. **Clone this repository:**

   ```bash
   git clone https://github.com/anngv02/coinbase-x402.git
   cd coinbase-x402
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment (Optional):**

   Create a `.env` file in the root directory:

   ```env
   WALLET_ADDRESS=your_ethereum_wallet_address
   NODE_ENV=development
   PORT=4021
   ```

   **Note:** 
   - If `WALLET_ADDRESS` is not set, the app will use a default address: `0x60e7daf8b14fe9eb379837ea13522ef7dac6e233`
   - All payments are fixed at **$0.10 USDC**
   - Make sure the wallet address you use is one you control, as all payments will be sent directly to this address

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   When the server starts, you'll see payment information logged to the console:
   ```
   ============================================================
   💰 THÔNG TIN VÍ NHẬN THANH TOÁN
   ============================================================
   📍 Địa chỉ ví: 0x60e7daf8b14fe9eb379837ea13522ef7dac6e233
   🌐 Network: base-sepolia
   🔍 Xem trên Blockchain Explorer: https://sepolia.basescan.org/address/0x60e7daf8b14fe9eb379837ea13522ef7dac6e233
   ============================================================
   Using default wallet address (WALLET_ADDRESS not set in environment)
   Server is running on http://localhost:4021
   ```

5. **Open your browser:**

   Navigate to `http://localhost:4021`

### Option 2: Deploy to Vercel

1. **Install Vercel CLI (if not already installed):**

   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel:**

   ```bash
   vercel
   ```

   Follow the prompts to link your project to Vercel.

3. **Set environment variables (Optional):**

   In the Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add `WALLET_ADDRESS` (optional - will use default if not set)
   - Add `NODE_ENV=production`

   Or via CLI:
   ```bash
   vercel env add WALLET_ADDRESS
   vercel env add NODE_ENV production
   ```

4. **Deploy to production:**

   ```bash
   vercel --prod
   ```

5. **Test your deployment:**

   Visit your Vercel deployment URL (e.g., `https://your-app.vercel.app`)

   **Example live deployment:** [https://video-x402.vercel.app/](https://video-x402.vercel.app/)

## Configuration

### Wallet Address

The application uses the following logic for wallet address:

1. **If `WALLET_ADDRESS` is set in environment variables:**
   - Uses the provided address
   - Logs: "Using WALLET_ADDRESS from environment variables"

2. **If `WALLET_ADDRESS` is not set:**
   - Uses default address: `0x60e7daf8b14fe9eb379837ea13522ef7dac6e233`
   - Logs: "Using default wallet address (WALLET_ADDRESS not set in environment)"

### Payment Price

- **Fixed price:** $0.10 USDC
- **Network:** Base Sepolia (testnet)
- **Token:** USDC

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `WALLET_ADDRESS` | No | `0x60e7daf8b14fe9eb379837ea13522ef7dac6e233` | Ethereum wallet address to receive payments |
| `NODE_ENV` | No | `development` | Environment mode (development/production) |
| `PORT` | No | `4021` | Server port (local development only) |
| `VERCEL` | Auto | - | Automatically set by Vercel (don't set manually) |

## How It Works

1. The server uses the `x402-express` middleware to protect the `/authenticate` endpoint
2. When a user tries to access the protected endpoint, they are required to make a payment of $0.10 USDC
3. The payment is processed through the x402 facilitator service (`https://x402.org/facilitator`)
4. After successful payment verification, the user is redirected to `/video-content`, where the premium video content is served
5. All payments are sent directly to the configured wallet address (from env or default)
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

Or on Vercel:

```
https://video-x402.vercel.app/payment-info
```

**Live example:** [https://video-x402.vercel.app/payment-info](https://video-x402.vercel.app/payment-info)

This page displays:
- Wallet address receiving payments
- Network and price configuration
- Direct link to view transactions on BaseScan
- Whether using default address or custom address
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

Or on Vercel:

```bash
curl https://your-app.vercel.app/api/payment-info
```

Response:
```json
{
  "walletAddress": "0x60e7daf8b14fe9eb379837ea13522ef7dac6e233",
  "network": "base-sepolia",
  "price": "$0.10",
  "explorerUrl": "https://sepolia.basescan.org/address/0x60e7daf8b14fe9eb379837ea13522ef7dac6e233",
  "facilitatorUrl": "https://x402.org/facilitator",
  "isDefaultAddress": true
}
```

### 5. Server Logs

When a payment is made, the server logs detailed information:

```
============================================================
💳 YÊU CẦU THANH TOÁN
============================================================
👤 IP: 127.0.0.1
📍 Địa chỉ ví nhận: 0x60e7daf8b14fe9eb379837ea13522ef7dac6e233
💵 Giá: $0.10
🌐 Network: base-sepolia
🔗 Endpoint: GET /authenticate
============================================================
✅ Payment successful, redirecting to video content
💰 Tiền đã được gửi đến: 0x60e7daf8b14fe9eb379837ea13522ef7dac6e233
🔍 Xem transaction trên: https://sepolia.basescan.org/address/0x60e7daf8b14fe9eb379837ea13522ef7dac6e233
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
├── vercel.json              # Vercel deployment configuration
├── package.json
└── README.md
```

## Deployment

### Local Development

```bash
# Start development server with auto-reload
npm run dev

# Or start production server
npm start
```

### Vercel Deployment

#### First Time Setup

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

#### Subsequent Deployments

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Environment Variables on Vercel

1. **Via Dashboard:**
   - Go to Project → Settings → Environment Variables
   - Add `WALLET_ADDRESS` (optional)
   - Add `NODE_ENV=production`

2. **Via CLI:**
   ```bash
   vercel env add WALLET_ADDRESS
   vercel env add NODE_ENV production
   ```

#### Test Vercel Deployment Locally

```bash
# Test Vercel deployment locally
npm run vercel-dev
```

This simulates the Vercel environment and helps catch issues before deployment.

## Customizing

### Change the Wallet Address

Set the `WALLET_ADDRESS` environment variable:

**Local:**
```env
# .env file
WALLET_ADDRESS=your_ethereum_wallet_address
```

**Vercel:**
- Add via Vercel Dashboard → Settings → Environment Variables
- Or via CLI: `vercel env add WALLET_ADDRESS`

### Change the Price

Modify the `price` variable in `api/index.js`:

```javascript
const price = "$0.10"; // Change to your desired price
```

**Note:** Currently fixed at $0.10. To make it configurable, you would need to modify the code to read from environment variables.

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
- `npm run vercel-dev` - Test Vercel deployment locally
- `npm run check-payments` - Check wallet address and explorer link
- `npm test` - Run tests (if available)

## Security Notes

- **Never share your private key** for the receiving wallet address
- **Verify the wallet address** before deploying to production
- **Use a separate wallet** for each application
- **Backup your private key** securely
- **Test thoroughly** on testnet before deploying to mainnet
- **Default wallet address:** If using the default address, be aware that payments will go to that address, not yours

## Troubleshooting

### Local Development

#### Wallet address not showing in logs?

1. Check that the `.env` file exists (optional - will use default if not set)
2. Verify `WALLET_ADDRESS` is set correctly (if using custom address)
3. Restart the server after changing `.env`

#### Server won't start?

1. Check Node.js version: `node --version` (should be >=18)
2. Check if port 4021 is already in use
3. Check for syntax errors in `api/index.js`
4. Check that all dependencies are installed: `npm install`

#### Payment not working?

1. Ensure you have testnet USDC in your wallet
2. Check that the facilitator URL is accessible
3. Verify network configuration matches your wallet (Base Sepolia)
4. Check server logs for error messages

### Vercel Deployment

#### Deployment fails?

1. Check `vercel.json` configuration
2. Verify `api/index.js` exports the app correctly
3. Check Vercel build logs for errors
4. Ensure Node.js version is compatible (>=18)

#### Environment variables not working?

1. Verify environment variables are set in Vercel Dashboard
2. Check that variables are set for the correct environment (Production/Preview/Development)
3. Redeploy after adding environment variables
4. Check Vercel function logs for errors

#### Function timeouts?

1. Check Vercel function logs
2. Verify the function is completing successfully
3. Check for infinite loops or long-running operations
4. Consider optimizing the code

#### Not seeing transactions on BaseScan?

1. Verify you're checking the correct network (base-sepolia vs base mainnet)
2. Check that the wallet address is correct (check `/api/payment-info` endpoint)
3. Wait a few minutes for transactions to be confirmed
4. Check the transaction hash in browser console

### General Issues

#### "Cannot read properties of undefined" error?

- This usually means `WALLET_ADDRESS` was not set, but the app should now handle this gracefully with the default address
- Check that the default address is being used correctly
- Verify environment variables are loaded correctly

#### Payment middleware not working?

1. Check that the middleware is initialized correctly
2. Verify the wallet address is valid (Ethereum address format)
3. Check network configuration
4. Verify facilitator URL is accessible

For more troubleshooting tips, see [PAYMENT-TRACKING.md](./PAYMENT-TRACKING.md).

## Differences: Local vs Vercel

| Feature | Local Development | Vercel Deployment |
|---------|------------------|-------------------|
| **Server** | Long-running Node.js server | Serverless functions |
| **Port** | Configurable (default: 4021) | Automatic (handled by Vercel) |
| **Environment** | `.env` file | Vercel Environment Variables |
| **Logs** | Console output | Vercel Function Logs |
| **Scaling** | Manual | Automatic |
| **Cold Starts** | None | Possible on first request |
| **Testing** | `npm run dev` | `npm run vercel-dev` |

## Resources

- **Live Demo:** [https://video-x402.vercel.app/](https://video-x402.vercel.app/)
- [x402 Protocol Documentation](https://www.x402.org/)
- [Coinbase Developer Platform](https://www.coinbase.com/developer-platform)
- [Base Sepolia Faucet](https://faucet.circle.com/)
- [BaseScan Explorer](https://sepolia.basescan.org/)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)

## License

MIT
