import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const employeesSeed = async () => {
  await connectToDatabase();
  try {
    const employees = [
      {
        name: "John Smith",
        email: "john@example.com",
        password: "employee123",
        role: "employee"
      },
      {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        password: "employee123",
        role: "employee"
      },
      {
        name: "Michael Brown",
        email: "michael@example.com",
        password: "employee123",
        role: "employee"
      },
      {
        name: "Emma Davis",
        email: "emma@example.com",
        password: "employee123",
        role: "employee"
      },
      {
        name: "James Johnson",
        email: "james@example.com",
        password: "employee123",
        role: "employee"
      }
    ];

    for (const employee of employees) {
      const hashPassword = await bcrypt.hash(employee.password, 10);
      const newEmployee = new User({
        ...employee,
        password: hashPassword
      });
      await newEmployee.save();
    }
    console.log("Employees seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

employeesSeed();
