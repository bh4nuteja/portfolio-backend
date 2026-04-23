const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect("mongodb://bhanu:804GnFb9TSFQX5mL@ac-2hdwoa5-shard-00-00.hyz9mzg.mongodb.net:27017,ac-2hdwoa5-shard-00-01.hyz9mzg.mongodb.net:27017,ac-2hdwoa5-shard-00-02.hyz9mzg.mongodb.net:27017/?ssl=true&replicaSet=atlas-9r0xpr-shard-0&authSource=admin&appName=Cluster0");

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("804GnFb9TSFQX5mL", 10);

  const admin = new Admin({
    username: "bhanu",
    password: hashedPassword
  });

  await admin.save();
  console.log("Admin created");
  process.exit();
}

createAdmin();