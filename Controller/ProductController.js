const Product = require('../Models/Product');
const Category = require('../Models/Category');
const Review = require('../Models/Review');

// @desc    Fetch all products
// @route   GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const { category: categoryName } = req.query;
    const filter = {};
    if (categoryName) {
      const category = await Category.findOne({ name: { $regex: `^${categoryName}$`, $options: 'i' } });
      if (category) {
        filter.category = category._id;
      } else {
        return res.json([]);
      }
    }
    const products = await Product.find(filter).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product (Admin only)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, spec, color, category, stock } = req.body;
    const photos = req.files.map((file) => file.path.replace(/\\/g, "/"));

    const product = new Product({
      name,
      price,
      description,
      spec,
      photos,
      color,
      category,
      stock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, spec, color, category, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.spec = spec;
      product.color = color;
      product.category = category;
      product.stock = stock;

      if (req.files && req.files.length > 0) {
        product.photos = req.files.map((file) => file.path.replace(/\\/g, "/"));
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Search products
// @route   GET /api/products/search
exports.searchProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;
    const query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { spec: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      const categoryObj = await Category.findOne({ name: { $regex: `^${category}$`, $options: 'i' } });
      if (categoryObj) {
        query.category = categoryObj._id;
      }
    }

    const products = await Product.find(query).populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};