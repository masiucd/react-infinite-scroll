import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('testing users');
});

export default router;