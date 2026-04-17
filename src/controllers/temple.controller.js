import Temple from "../models/temple.model.js";

// CREATE
export const createTemple = async (req, res) => {
  try {
    const temple = await Temple.create(req.body);

    return res.status(201).json({
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

// GET ALL
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

// GET SINGLE
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

// UPDATE
export const updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

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

// DELETE
export const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Temple deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};