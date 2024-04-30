const bcrypt = require('bcrypt');
const pool = require('../database/db');

const register = async (req, res) => {
  const { first_name, last_name, email, wallet_address, gender, date_of_birth, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      `INSERT INTO users (first_name, last_name, email, wallet_address, gender, date_of_birth, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [first_name, last_name, email, wallet_address, gender, date_of_birth, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "User could not be created", details: err.message });
  }
};

const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (validPassword) {
        const token = jwt.sign({ user_id: user.rows[0].user_id }, '123abc', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};


module.exports = {
    register,
    login
  }