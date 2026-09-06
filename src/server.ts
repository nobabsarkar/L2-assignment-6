import app from "./app";
import config from "./app/config";
import { transporter } from "./app/lib/nodemailer";

import { prisma } from "./app/lib/prisma";
import { redisClient } from "./app/lib/redis";
import { seedSuperAdmin } from "./app/utils/seed";

const PORT = config.port;

async function main() {
  try {
    await prisma.$connect();
    console.log("connected to the database successfully!");

    await redisClient.connect();
    console.log("Redis Connected successfully");

    await transporter.verify();
    console.log("Nodemailer Connected Successfully");

    await seedSuperAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}

main();
