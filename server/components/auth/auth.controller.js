import db from '../../db/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT id, username FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      return res.status(400).json({ status: 400, error: 'Username already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const [user] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
    
    const token = jwt.sign(
      { id: user.insertId, username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.cookie('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1 hour
    });

    return res.status(201).json({ status: 201, token, user: {id: user.insertId, username}});
  } catch (err) {
    return res.status(500).json({ status: 500, error: 'Registration failed', details: err.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user) return res.status(401).json({ status: 401, error: 'Invalid username or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ status: 401, error: 'Invalid username or password' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1 hour
    });

    return res.status(200).json({ status: 200, token, user: {id: user.id, username: user.username} });
  } catch (err) {
    return res.status(500).json({ status: 500, details: err.message });
  }
}

export function logout(req, res) {
  res.clearCookie('auth', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  res.json({ status: 'SUCCESSFUL' });
}

export function checkAuth(req, res, next) {
  const token = req.cookies.auth
  if (!token) return res.status(401).json({ status: 401, error: 'No token provided' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return res.status(401).json({ status: 401, error: 'Invalid token' });
  req.user = { id: decoded.id, username: decoded.username };
  next()
}
