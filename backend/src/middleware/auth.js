import store from '../store/dataStore.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

/**
 * Auth middleware using JWT tokens. Falls back to demo user if no valid token.
 */
export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    let userId = 'demo';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (payload && payload.sub) userId = payload.sub;
      } catch (err) {
        console.warn('[Auth] Invalid token:', err.message);
      }
    }

    let user = store.getUserById(userId);
    if (!user) {
      user = store.create('users', {
        id: userId,
        email: `user-${userId}@example.com`,
        name: 'Trader',
        password: 'mock',
      });
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.error('[Auth] Critical Error:', err.message);
    // Even if there is an error, just attach a fallback user so we NEVER 401
    req.user = { id: 'demo', email: 'demo@example.com', name: 'Demo Trader' };
    next();
  }
}

/**
 * Generate a JWT for a given user id.
 */
export function generateToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}
