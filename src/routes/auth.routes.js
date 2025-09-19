import { signup } from '#controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router.post('/sign-up', signup);

router.post('/sign-in', (req, res) => {
  res.send('POST /api/auth/sign-in res');
});

router.post('/sign-out', (req, res) => {
  res.send('POST /api/auth/sign-out res');
});

export default router;