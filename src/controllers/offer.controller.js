const offerService = require('../services/offer.service')

async function list (req, res, next) {
  try {
    const { sector, type } = req.query;
    const filter = {};
    if (sector) filter.sector = sector;
    if (type) filter.type = type;
    const offers = await offerService.list(filter);
    res.json(offers);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
async function getById (req, res, next) {
  try {
    res.json(await offerService.getById(req.params.id))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function create (req, res, next) {
  try {
    res.json(await offerService.create(req.body))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function update (req, res, next) {
  try {
    res.json(await offerService.update(req.params.id, req.body))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function deleteOffer (req, res, next) {
  try {
    res.json(await offerService.deleteOffer(req.params.id))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
async function getOffersByUserId (req, res, next) {
  try {
    res.json(await offerService.getOffersByUserId(req.params.userId))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function ownOffers (req, res, next) {
  try {
    res.json(await offerService.ownOffers(req.params.id))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function recommendStudentForOffer(req, res) {
  const { offerId, teacherId, studentId } = req.body;

  try {
    const result = await offerService.recommendStudentForOffer(offerId, teacherId, studentId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function verifyStudentRecommendation(req, res) {
  const { offerId,studentId } = req.body;

  try {
    const result = await offerService.verifyStudentRecommendation(offerId,studentId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function endOffer (req, res, next) {
  try {
    res.json(await offerService.endOffer(req.params.id, req.params.isEnded))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
async function getRecommendedOffers (req,res,next) {
  try {
    res.json(await offerService.getRecommendedOffers(req.params.userId))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
async function rejectOffer(req, res) {
  const recommendationId = req.params.recommendationId;

  try {
    const result = await offerService.rejectOffer(recommendationId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getOffferByPublication (req, res, next) {
  try {
    res.json(await offerService.getOffferByPublication(req.params.pubId))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = {
  list,
  create,
  update,
  deleteOffer,
  getById,
  getOffersByUserId,
  ownOffers,
  recommendStudentForOffer,
  verifyStudentRecommendation,
  endOffer,
  getRecommendedOffers,
  rejectOffer,
  getOffferByPublication

}
