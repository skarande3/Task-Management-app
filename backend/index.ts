import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



dotenv.config();

const app = express();
const port = 4000;
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  
app.post('/auth/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});



// This is the correct way to type the login route that will work
app.post('/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: 'Invalid credentials' });
        return; // Separate the return from the response
      }
  
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
      return; 
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
      return; // Separate the return from the response
    }
  });

  const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, secretKey) as { id: number };
      (req as any).userId = decoded.id;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  app.get('/tasks', authenticate, async (req: Request, res: Response) => {
    const userId = (req as any).userId;
  
    try {
      const result = await pool.query('SELECT * FROM tasks WHERE userId = $1', [userId]);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });
  
  
  app.post('/tasks', authenticate, async (req: Request, res: Response) => {
    const { title, description, iscomplete = false } = req.body;
    const userId = (req as any).userId; 
  
    try {
      await pool.query(
        'INSERT INTO tasks (title, description, iscomplete, userId) VALUES ($1, $2, $3, $4)',
        [title, description, iscomplete, userId]
      );
      res.status(201).send('Task created');
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });
  
  



// Test Endpoint
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// app.get('/tasks', async (req, res) => {
//     try {
//       const result = await pool.query('SELECT * FROM tasks');
//       res.json(result.rows);
//     } catch (error) {
//       const err = error as Error;
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   app.post('/tasks', async (req, res) => {
//     const { title, description } = req.body;
//     try {
//       await pool.query('INSERT INTO tasks (title, description) VALUES ($1, $2)', [title, description]);
//       res.status(201).send('Task created');
//     } catch (error) {
//       const err = error as Error;
//       res.status(500).json({ error: err.message });
//     }
//   });
  
  app.put('/tasks/:id', authenticate, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, iscomplete } = req.body;
    try {
      await pool.query(
        'UPDATE tasks SET title=$1, description=$2, iscomplete=$3 WHERE id=$4',
        [title, description, iscomplete, id]
      );
      res.send('Task updated');
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });
  
  app.delete('/tasks/:id', authenticate, async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).userId;
  
    try {
      await pool.query('DELETE FROM tasks WHERE id = $1 AND userId = $2', [id, userId]);
      res.send('Task deleted');
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });
  