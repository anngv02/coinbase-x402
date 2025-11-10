import express from "express";
import { paymentMiddleware } from "x402-express";
import dotenv from "dotenv";
import path from "path";
import { log } from "../utils/log.js";
import { videoAccessHandler } from "../handlers/videoAccessHandler.js";
import { logPaymentInfo, logPaymentRequest, getExplorerUrl } from "../utils/paymentTracker.js";

dotenv.config();

// Create and configure the Express app
const app = express();

// Use Base Sepolia (testnet) for development
const network = "base-sepolia";
const facilitatorObj = { url: "https://x402.org/facilitator" };
// Use WALLET_ADDRESS from env if available, otherwise use default address
const walletAddress = process.env.WALLET_ADDRESS || "0x60e7daf8b14fe9eb379837ea13522ef7dac6e233";
const price = "$0.10";

// Log payment information on startup
logPaymentInfo(walletAddress, network);

// Log which address is being used
if (process.env.WALLET_ADDRESS) {
  log("Using WALLET_ADDRESS from environment variables", "info");
} else {
  log("Using default wallet address (WALLET_ADDRESS not set in environment)", "info");
}

// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json());

// x402 payment middleware configuration
// walletAddress is always set (either from env or default)
app.use(
  paymentMiddleware(
    walletAddress, // your receiving wallet address
    {
      // Protected endpoint for authentication
      "GET /authenticate": {
        price: price, // Fixed price: $0.10
        network: network,
      },
    },
    facilitatorObj
  )
);

// Add request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log payment request for protected endpoints
  if (req.url === "/authenticate") {
    logPaymentRequest(req, walletAddress, price, network);
  }
  
  log(`${req.method} ${req.url}`);
  res.on("finish", () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Authentication endpoint - just redirects to the authenticated content
// Note: This only runs after payment middleware verifies payment successfully
app.get("/authenticate", (req, res) => {
  // This endpoint is only reached after successful payment verification by middleware
  log("✅ Payment successful, redirecting to video content");
  log(`💰 Tiền đã được gửi đến: ${walletAddress}`);
  log(`🔍 Xem transaction trên: ${getExplorerUrl(walletAddress, network)}`);
  res.redirect("/video-content");
});

// Video content endpoint - serves the authenticated content
app.get("/video-content", videoAccessHandler);

// API endpoint to get payment information
app.get("/api/payment-info", (req, res) => {
  res.json({
    walletAddress: walletAddress,
    network: network,
    price: price, // Fixed price: $0.10
    explorerUrl: getExplorerUrl(walletAddress, network),
    facilitatorUrl: facilitatorObj.url,
    isDefaultAddress: !process.env.WALLET_ADDRESS, // Indicate if using default address
  });
});

// Serve payment info page
app.get("/payment-info", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "payment-info.html"));
});

// Serve the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Export the app for Vercel serverless functions
export default app;

// Start the server for local development only
// Vercel serverless functions don't need app.listen() - they automatically invoke the exported handler
// Check if we're running locally (not in Vercel's serverless environment)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 4021;
  app.listen(PORT, () => {
    log(`Server is running on http://localhost:${PORT}`);
  });
}