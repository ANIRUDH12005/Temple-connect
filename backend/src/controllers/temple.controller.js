import Temple from "../models/temple.model.js";

// @desc    Get all temples
// @route   GET /api/temples
// @access  Public
export const getAllTemples = async (req, res, next) => {
  try {
    const { state, city, deity, name, page = 1, limit = 10, sort = "-createdAt" } = req.query;

    let filter = {};

    if (state) filter.state = { $regex: state, $options: "i" };
    if (city) filter.city = { $regex: city, $options: "i" };
    if (deity) filter.deity = { $regex: deity, $options: "i" };
    
    // Case-insensitive search using name or text index if name is provided
    if (name) {
      filter.$or = [
        { name: { $regex: name, $options: "i" } },
        { city: { $regex: name, $options: "i" } },
        { deity: { $regex: name, $options: "i" } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Temple.countDocuments(filter);
    const temples = await Temple.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      count: temples.length,
      data: temples,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single temple
// @route   GET /api/temples/:id
// @access  Public
export const getTempleById = async (req, res, next) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    // Bonus: Increment views
    temple.views += 1;
    await temple.save();

    res.status(200).json({
      success: true,
      data: temple,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create temple
// @route   POST /api/temples
// @access  Private (Admin)
export const createTemple = async (req, res, next) => {
  try {
    // If layout uses lat/lng, map it to GeoJSON coordinates
    if (req.body.location && req.body.location.lat && req.body.location.lng) {
      req.body.location.coordinates = [req.body.location.lng, req.body.location.lat];
    }

    const temple = await Temple.create(req.body);

    res.status(201).json({
      success: true,
      data: temple,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update temple
// @route   PUT /api/temples/:id
// @access  Private (Admin)
export const updateTemple = async (req, res, next) => {
  try {
    if (req.body.location && req.body.location.lat && req.body.location.lng) {
      req.body.location.coordinates = [req.body.location.lng, req.body.location.lat];
    }

    const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      data: temple,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete temple
// @route   DELETE /api/temples/:id
// @access  Private (Admin)
export const deleteTemple = async (req, res, next) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Temple deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get popular temples (Bonus)
// @route   GET /api/temples/popular
// @access  Public
export const getPopularTemples = async (req, res, next) => {
  try {
    const temples = await Temple.find().sort("-views").limit(10);

    res.status(200).json({
      success: true,
      count: temples.length,
      data: temples,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearby temples (Bonus)
// @route   GET /api/temples/nearby
// @access  Public
export const getNearbyTemples = async (req, res, next) => {
  try {
    const { lat, lng, distance = 5000 } = req.query; // distance in meters

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Please provide lat and lng coordinates",
      });
    }

    const temples = await Temple.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: Number(distance),
        },
      },
    });

    res.status(200).json({
      success: true,
      count: temples.length,
      data: temples,
    });
  } catch (error) {
    next(error);
  }
};