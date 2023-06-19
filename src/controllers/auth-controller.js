const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const { use } = require("../routes/api");
const { hashPassword, comparePassword } = require("../utility/auth");

exports.register = async (req, res) => {
  console.log("req.body".bgCyan, req.body);
  try {
    const { name, email, password } = req.body;

    // check if email is taken
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "Email is taken" });
    }

    // hash password
    const passwordHash = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: passwordHash,
    }).save();

    // create jwt token for signed in user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      //   message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.json({ message: "Error registering user", error: error.message });
  }
};
