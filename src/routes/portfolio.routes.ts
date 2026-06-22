import { Router } from 'express';
import {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  publishPortfolio,
  unpublishPortfolio,
  deletePortfolio,
  getPortfolioBySlug,
  downloadCv,
} from '../controllers/portfolio.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public route for slug lookup
router.get('/slug/:slug', getPortfolioBySlug);

// All other routes require auth
router.use(authMiddleware);

router.post('/', createPortfolio);
router.get('/:id', getPortfolio);
router.put('/:id', updatePortfolio);
router.post('/:id/publish', publishPortfolio);
router.post('/:id/unpublish', unpublishPortfolio);
router.delete('/:id', deletePortfolio);
router.get('/:id/cv', downloadCv);

export default router;
