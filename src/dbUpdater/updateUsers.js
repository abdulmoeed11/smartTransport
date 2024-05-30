require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../components/user/models/Users"); // Adjust the path to your User model

const updateUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Update all users with isAdmin: true to have role: 'admin'
    const result = await User.updateMany(
      { isAdmin: true },
      { $set: { role: "admin" } }
    );

    console.log(`${result.nModified} users updated`);

    // Optional: Remove the isAdmin field
    await User.updateMany({ isAdmin: true }, { $unset: { isAdmin: "" } });

    console.log("isAdmin field removed from updated users");
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

updateUsers();
