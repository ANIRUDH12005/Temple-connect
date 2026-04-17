import Temple from "../models/temple.model.js";

// CREATE TEMPLE
export const createTemple = async (req, res) => {
  try {
    const temple = await Temple.create(req.body);

    return res.status(201).json({
      success: true,
      data: temple,
    });

  } catch (error) {
    console.error(error); // 👈 IMPORTANT

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();

    return res.status(200).json({
      success: true,
      count: temples.length,
      data: temples,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: temple,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};