const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (password.length < 6) {
      return res.json({
        error: "password is required and should be 6 characters long",
      });
    }

    // check if email is taken
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "Invalid email or password." });
    }

    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Invalid email or password" });
    }

    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.json({ message: "Error logging in user", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findById(req.user._id);

    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "password is required and should be 6 characters long",
      });
    }

    const passwordHash = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: passwordHash || user.password,
      },
      { new: true }
    );

    updated.password = undefined; // for not sending the password in response.
    updated.role = undefined; // for not sending the role in response.

    res.json({ message: "success", updated });
  } catch (error) {
    res.json({ message: "Error updating profile", error: error.message });
  }
};
