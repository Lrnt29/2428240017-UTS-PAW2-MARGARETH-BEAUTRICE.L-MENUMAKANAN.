#!/usr/bin/env node
// Titik masuk aplikasi: baca .env -> konek MongoDB -> jalankan server HTTP.

import "dotenv/config";
import http from "node:http";
import app from "../app.js";
import connectDB from "../config/db.js";

const port = Number(process.env.PORT) || 3000;
app.set("port", port);

const server = http.createServer(app);

try {
  await connectDB();
  server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
} catch (err) {
  console.error("Gagal terhubung ke MongoDB:", err.message);
  process.exit(1);
}
