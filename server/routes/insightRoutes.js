import express from 'express';
import {
  getInsights,
  getFilterOptions,
  getStatistics
} from '../controllers/insightController.js';

const router = express.Router();

router.get('/insights', getInsights);
router.get('/filters', getFilterOptions);
router.get('/statistics', getStatistics);

export default router;
