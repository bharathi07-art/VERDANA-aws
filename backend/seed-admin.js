// seed-admin.js
import bcrypt from "bcrypt";
import { sequelize, connectPostgres } from "./config/db.js";
import Admin from "./models/admin.js";

const USERNAME = "Bharathi-admin";
const PASSWORD = "Bharathi07@!";

async function seedAdmin() {
  await connectPostgres();
  await sequelize.sync({alter:true});

  const existing = await Admin.findOne({ where: { username: USERNAME } });
  if (existing) {
    console.log("[verdana] Admin already exists, skipping.");
    process.exit(0);
  }

  const password = await bcrypt.hash(PASSWORD, 12);
  await Admin.create({ username: USERNAME, password:password });

  console.log("[verdana] Admin created successfully.");
  process.exit(0);
}

seedAdmin();