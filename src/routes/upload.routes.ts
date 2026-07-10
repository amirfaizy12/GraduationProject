import { Router } from 'express';
import { upload, handleUpload } from '../controllers/upload.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', upload.single('file'), handleUpload);

export default router;
