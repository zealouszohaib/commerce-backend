const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const products = await User.findAll(); 
    res.status(200).json(products); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching products.' });
  }
};
const getUserByID = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await User.findOne({ where: { id } }); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the product.' });
  }
};




module.exports = { getAllUsers,getUserByID };


