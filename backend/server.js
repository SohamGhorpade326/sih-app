const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Fake crop prices for demo (later connect to DB or API)
let crops = [
  { id: 1, name: "Basmati Rice", price: 3200, change: 2.5, demand: "High" },
  { id: 2, name: "Local Wheat", price: 2150, change: -1.2, demand: "Medium" },
  { id: 3, name: "Hybrid Maize", price: 1900, change: 0.8, demand: "High" },
  { id: 4, name: "Potato (New)", price: 1600, change: -0.5, demand: "Medium" },
  { id: 5, name: "Soybean", price: 4500, change: 3.1, demand: "High" },
  { id: 6, name: "Cotton (Long Staple)", price: 6200, change: 0.1, demand: "Medium" },
];

// Get all crops
app.get("/api/crops", (req, res) => {
  res.json(crops);
});

// Search crop by name
app.get("/api/crops/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const filtered = crops.filter(crop => crop.name.toLowerCase().includes(q));
  res.json(filtered);
});

// Filter by demand
app.get("/api/crops/filter", (req, res) => {
  const demand = req.query.demand;
  const filtered = crops.filter(crop => crop.demand.toLowerCase() === demand.toLowerCase());
  res.json(filtered);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
