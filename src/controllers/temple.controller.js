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