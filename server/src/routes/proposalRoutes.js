const express = require('express');
const { submitProposal, getMyProposals, getJobProposals, updateProposalStatus } = require('../controllers/proposalController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', authorize('freelancer'), submitProposal);
router.get('/my', authorize('freelancer'), getMyProposals);
router.get('/job/:jobId', authorize('client'), getJobProposals);
router.put('/:id', authorize('client'), updateProposalStatus);

module.exports = router;
