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
const walletAddress = process.env.WALLET_ADDRESS;
const price = "$0.10";

// Log payment information on startup
logPaymentInfo(walletAddress, network);

// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json());

// x402 payment middleware configuration
app.use(
  paymentMiddleware(
    walletAddress, // your receiving wallet address
    {
      // Protected endpoint for authentication
      "GET /authenticate": {
        price: price, // Set your desired price
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
app.get("/authenticate", (req, res) => {
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
    price: price,
    explorerUrl: getExplorerUrl(walletAddress, network),
    facilitatorUrl: facilitatorObj.url,
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

// Start the server for local development
const PORT = process.env.PORT || 4021;
app.listen(PORT, () => {
  log(`Server is running on http://localhost:${PORT}`);
});