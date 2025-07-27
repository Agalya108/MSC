const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://agalyaudayappan:923OWXWx3YwvqF64@cluster0.ekpr2wy.mongodb.net/users?retryWrites=true&w=majority')
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String
});

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
});
const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password, 'username,password');

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    if (user.password.startsWith('$2')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;
    }


    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    res.json({ message: "success", code: 200 });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/products', async (req, res) => {

  const products = await Product.find();
  res.json({ code: 200, data: products });
});
app.post('/signup', async (req, res) => {
  try {
    console.log(req.body, 'yug')
    const { name, email, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ name, email, username, password });
    await newUser.save();

    res.json({ message: 'User registered successfully', user: newUser, code: 200 });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/change-password', async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(user.password, 'user.password');
    console.log(oldPassword, "old")
    if (user.password.startsWith('$2')) {
      isMatch = await bcrypt.compare(oldPassword, user.password);
    } else {
      isMatch = oldPassword === user.password;
    }
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
