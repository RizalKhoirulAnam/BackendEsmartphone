const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./database");
const Product = require("./Models/Product");
const Category = require("./Models/Category");
const User = require("./Models/User");
const Review = require("./Models/Review");
const Order = require("./Models/Order");
const bcrypt = require("bcryptjs");

dotenv.config();

const products = [
  {
    name: "iPhone 16",
    price: 1099,
    description:
      "The latest iPhone with a stunning display and a powerful new chip.",
    spec: "A18 Bionic chip, 6.1-inch Super Retina XDR display, 48MP Main camera",
    color: "Space Black",
    photos: ["/images/product/iphone16.jpg"],
    category: "Apple",
    stock: 10,
  },
  {
    name: "Xiaomi 13",
    price: 729,
    description:
      "The Xiaomi 13 offers a premium experience with a sleek design and top-of-the-line specs.",
    spec: "Snapdragon 8 Gen 2, 6.36-inch AMOLED display, Leica professional optical lens",
    color: "White",
    photos: ["/images/product/xiaomi13.jpg"],
    category: "Xiaomi",
    stock: 15,
  },
  {
    name: "Realme GT",
    price: 599,
    description:
      "Realme GT is a flagship killer with a powerful processor and a high refresh rate display.",
    spec: "Snapdragon 888, 6.43-inch Super AMOLED display, 120Hz refresh rate",
    color: "Racing Yellow",
    photos: ["/images/product/realmegt.jpg"],
    category: "Realme",
    stock: 20,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    description:
      "The ultimate Samsung phone with a built-in S Pen and a pro-grade camera.",
    spec: "Snapdragon 8 Gen 3, 6.8-inch Dynamic AMOLED 2X display, 200MP camera",
    color: "Titanium Gray",
    photos: ["/images/product/samsungs24ultra.jpg"],
    category: "Samsung",
    stock: 5,
  },
  {
    name: "Oppo Find X",
    price: 999,
    description:
      "A flagship phone from Oppo with a unique camera system and a beautiful design.",
    spec: "Snapdragon 8 Gen 1, 6.7-inch AMOLED display, 50MP dual primary cameras",
    color: "Ceramic White",
    photos: ["/images/product/oppofindx.jpg"],
    category: "Oppo",
    stock: 8,
  },
  {
    name: "Vivo X100",
    price: 899,
    description:
      "Experience mobile photography like never before with the Vivo X100.",
    spec: "MediaTek Dimensity 9300, 6.78-inch AMOLED display, ZEISS APO certified telephoto camera",
    color: "Startrail Blue",
    photos: ["/images/product/vivox100.jpg"],
    category: "Vivo",
    stock: 12,
  },
  {
    name: "iPhone 16",
    price: 1099,
    description:
      "The latest iPhone with a stunning display and a powerful new chip.",
    spec: "A18 Bionic chip, 6.1-inch Super Retina XDR display, 48MP Main camera",
    color: "Space Black",
    photos: ["/images/product/iphone16.jpg"],
    category: "Apple",
    stock: 10,
  },
  {
    name: "Xiaomi 13",
    price: 729,
    description:
      "The Xiaomi 13 offers a premium experience with a sleek design and top-of-the-line specs.",
    spec: "Snapdragon 8 Gen 2, 6.36-inch AMOLED display, Leica professional optical lens",
    color: "White",
    photos: ["/images/product/xiaomi13.jpg"],
    category: "Xiaomi",
    stock: 15,
  },
  {
    name: "Realme GT",
    price: 599,
    description:
      "Realme GT is a flagship killer with a powerful processor and a high refresh rate display.",
    spec: "Snapdragon 888, 6.43-inch Super AMOLED display, 120Hz refresh rate",
    color: "Racing Yellow",
    photos: ["/images/product/realmegt.jpg"],
    category: "Realme",
    stock: 20,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    description:
      "The ultimate Samsung phone with a built-in S Pen and a pro-grade camera.",
    spec: "Snapdragon 8 Gen 3, 6.8-inch Dynamic AMOLED 2X display, 200MP camera",
    color: "Titanium Gray",
    photos: ["/images/product/samsungs24ultra.jpg"],
    category: "Samsung",
    stock: 5,
  },
  {
    name: "Oppo Find X",
    price: 999,
    description:
      "A flagship phone from Oppo with a unique camera system and a beautiful design.",
    spec: "Snapdragon 8 Gen 1, 6.7-inch AMOLED display, 50MP dual primary cameras",
    color: "Ceramic White",
    photos: ["/images/product/oppofindx.jpg"],
    category: "Oppo",
    stock: 8,
  },
  {
    name: "Vivo X100",
    price: 899,
    description:
      "Experience mobile photography like never before with the Vivo X100.",
    spec: "MediaTek Dimensity 9300, 6.78-inch AMOLED display, ZEISS APO certified telephoto camera",
    color: "Startrail Blue",
    photos: ["/images/product/vivox100.jpg"],
    category: "Vivo",
    stock: 12,
  },
  {
    name: "iPhone 16",
    price: 1099,
    description:
      "The latest iPhone with a stunning display and a powerful new chip.",
    spec: "A18 Bionic chip, 6.1-inch Super Retina XDR display, 48MP Main camera",
    color: "Space Black",
    photos: ["/images/product/iphone16.jpg"],
    category: "Apple",
    stock: 10,
  },
  {
    name: "Xiaomi 13",
    price: 729,
    description:
      "The Xiaomi 13 offers a premium experience with a sleek design and top-of-the-line specs.",
    spec: "Snapdragon 8 Gen 2, 6.36-inch AMOLED display, Leica professional optical lens",
    color: "White",
    photos: ["/images/product/xiaomi13.jpg"],
    category: "Xiaomi",
    stock: 15,
  },
  {
    name: "Realme GT",
    price: 599,
    description:
      "Realme GT is a flagship killer with a powerful processor and a high refresh rate display.",
    spec: "Snapdragon 888, 6.43-inch Super AMOLED display, 120Hz refresh rate",
    color: "Racing Yellow",
    photos: ["/images/product/realmegt.jpg"],
    category: "Realme",
    stock: 20,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    description:
      "The ultimate Samsung phone with a built-in S Pen and a pro-grade camera.",
    spec: "Snapdragon 8 Gen 3, 6.8-inch Dynamic AMOLED 2X display, 200MP camera",
    color: "Titanium Gray",
    photos: ["/images/product/samsungs24ultra.jpg"],
    category: "Samsung",
    stock: 5,
  },
  {
    name: "Oppo Find X",
    price: 999,
    description:
      "A flagship phone from Oppo with a unique camera system and a beautiful design.",
    spec: "Snapdragon 8 Gen 1, 6.7-inch AMOLED display, 50MP dual primary cameras",
    color: "Ceramic White",
    photos: ["/images/product/oppofindx.jpg"],
    category: "Oppo",
    stock: 8,
  },
  {
    name: "Vivo X100",
    price: 899,
    description:
      "Experience mobile photography like never before with the Vivo X100.",
    spec: "MediaTek Dimensity 9300, 6.78-inch AMOLED display, ZEISS APO certified telephoto camera",
    color: "Startrail Blue",
    photos: ["/images/product/vivox100.jpg"],
    category: "Vivo",
    stock: 12,
  },
  {
    name: "iPhone 16",
    price: 1099,
    description:
      "The latest iPhone with a stunning display and a powerful new chip.",
    spec: "A18 Bionic chip, 6.1-inch Super Retina XDR display, 48MP Main camera",
    color: "Space Black",
    photos: ["/images/product/iphone16.jpg"],
    category: "Apple",
    stock: 10,
  },
  {
    name: "Xiaomi 13",
    price: 729,
    description:
      "The Xiaomi 13 offers a premium experience with a sleek design and top-of-the-line specs.",
    spec: "Snapdragon 8 Gen 2, 6.36-inch AMOLED display, Leica professional optical lens",
    color: "White",
    photos: ["/images/product/xiaomi13.jpg"],
    category: "Xiaomi",
    stock: 15,
  },
  {
    name: "Realme GT",
    price: 599,
    description:
      "Realme GT is a flagship killer with a powerful processor and a high refresh rate display.",
    spec: "Snapdragon 888, 6.43-inch Super AMOLED display, 120Hz refresh rate",
    color: "Racing Yellow",
    photos: ["/images/product/realmegt.jpg"],
    category: "Realme",
    stock: 20,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    description:
      "The ultimate Samsung phone with a built-in S Pen and a pro-grade camera.",
    spec: "Snapdragon 8 Gen 3, 6.8-inch Dynamic AMOLED 2X display, 200MP camera",
    color: "Titanium Gray",
    photos: ["/images/product/samsungs24ultra.jpg"],
    category: "Samsung",
    stock: 5,
  },
  {
    name: "Oppo Find X",
    price: 999,
    description:
      "A flagship phone from Oppo with a unique camera system and a beautiful design.",
    spec: "Snapdragon 8 Gen 1, 6.7-inch AMOLED display, 50MP dual primary cameras",
    color: "Ceramic White",
    photos: ["/images/product/oppofindx.jpg"],
    category: "Oppo",
    stock: 8,
  },
  {
    name: "Vivo X100",
    price: 899,
    description:
      "Experience mobile photography like never before with the Vivo X100.",
    spec: "MediaTek Dimensity 9300, 6.78-inch AMOLED display, ZEISS APO certified telephoto camera",
    color: "Startrail Blue",
    photos: ["/images/product/vivox100.jpg"],
    category: "Vivo",
    stock: 12,
  },
  {
    name: "iPhone 16",
    price: 1099,
    description:
      "The latest iPhone with a stunning display and a powerful new chip.",
    spec: "A18 Bionic chip, 6.1-inch Super Retina XDR display, 48MP Main camera",
    color: "Space Black",
    photos: ["/images/product/iphone16.jpg"],
    category: "Apple",
    stock: 10,
  },
  {
    name: "Xiaomi 13",
    price: 729,
    description:
      "The Xiaomi 13 offers a premium experience with a sleek design and top-of-the-line specs.",
    spec: "Snapdragon 8 Gen 2, 6.36-inch AMOLED display, Leica professional optical lens",
    color: "White",
    photos: ["/images/product/xiaomi13.jpg"],
    category: "Xiaomi",
    stock: 15,
  },
  {
    name: "Realme GT",
    price: 599,
    description:
      "Realme GT is a flagship killer with a powerful processor and a high refresh rate display.",
    spec: "Snapdragon 888, 6.43-inch Super AMOLED display, 120Hz refresh rate",
    color: "Racing Yellow",
    photos: ["/images/product/realmegt.jpg"],
    category: "Realme",
    stock: 20,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    description:
      "The ultimate Samsung phone with a built-in S Pen and a pro-grade camera.",
    spec: "Snapdragon 8 Gen 3, 6.8-inch Dynamic AMOLED 2X display, 200MP camera",
    color: "Titanium Gray",
    photos: ["/images/product/samsungs24ultra.jpg"],
    category: "Samsung",
    stock: 5,
  },
  {
    name: "Oppo Find X",
    price: 999,
    description:
      "A flagship phone from Oppo with a unique camera system and a beautiful design.",
    spec: "Snapdragon 8 Gen 1, 6.7-inch AMOLED display, 50MP dual primary cameras",
    color: "Ceramic White",
    photos: ["/images/product/oppofindx.jpg"],
    category: "Oppo",
    stock: 8,
  },
  {
    name: "Vivo X100",
    price: 899,
    description:
      "Experience mobile photography like never before with the Vivo X100.",
    spec: "MediaTek Dimensity 9300, 6.78-inch AMOLED display, ZEISS APO certified telephoto camera",
    color: "Startrail Blue",
    photos: ["/images/product/vivox100.jpg"],
    category: "Vivo",
    stock: 12,
  },
];

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "User",
    email: "user@gmail.com",
    password: "user123",
    role: "user",
  },
];

const seedDB = async () => {
  await connectDB();
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Order.deleteMany();

    const createdCategories = await Category.insertMany(
      [...new Set(products.map((p) => p.category))].map((name) => ({ name }))
    );

    const productsWithCategoryIds = products.map((product) => {
      const category = createdCategories.find(
        (c) => c.name === product.category
      );
      return { ...product, category: category._id };
    });

    const createdProducts = await Product.insertMany(productsWithCategoryIds);

    const salt = await bcrypt.genSalt(10);
    const hashedUsers = users.map((user) => {
      return { ...user, password: bcrypt.hashSync(user.password, salt) };
    });

    let createdUsers = await User.insertMany(hashedUsers);

    // Add sample cart and favorites to users
    const userForStuff = await User.findOne({ email: "user@gmail.com" });
    const adminForStuff = await User.findOne({ email: "admin@gmail.com" });

    if (userForStuff) {
      userForStuff.cart = [
        { product: createdProducts[0]._id, qty: 1 },
        { product: createdProducts[2]._id, qty: 2 },
      ];
      userForStuff.favorites = [createdProducts[1]._id, createdProducts[3]._id];
      await userForStuff.save();
    }

    if (adminForStuff) {
      adminForStuff.cart = [{ product: createdProducts[4]._id, qty: 3 }];
      adminForStuff.favorites = [createdProducts[5]._id];
      await adminForStuff.save();
    }

    const reviews = [
      {
        name: createdUsers[0].name,
        rating: 4,
        comment: "This is a great product!",
        product: createdProducts[0]._id,
        user: createdUsers[0]._id,
      },
      {
        name: createdUsers[1].name,
        rating: 5,
        comment: "I love it!",
        product: createdProducts[0]._id,
        user: createdUsers[1]._id,
      },
      {
        name: createdUsers[0].name,
        rating: 5,
        comment: "Highly recommended!",
        product: createdProducts[0]._id,
        user: createdUsers[0]._id,
      },
      {
        name: createdUsers[1].name,
        rating: 4,
        comment: "Amazing phone!",
        product: createdProducts[1]._id,
        user: createdUsers[1]._id,
      },
      {
        name: createdUsers[0].name,
        rating: 3,
        comment: "Could be better.",
        product: createdProducts[1]._id,
        user: createdUsers[0]._id,
      },
      {
        name: createdUsers[1].name,
        rating: 5,
        comment: "Super fast!",
        product: createdProducts[2]._id,
        user: createdUsers[1]._id,
      },
      {
        name: createdUsers[0].name,
        rating: 4,
        comment: "Great value for money.",
        product: createdProducts[2]._id,
        user: createdUsers[0]._id,
      },
      {
        name: createdUsers[1].name,
        rating: 5,
        comment: "The camera is incredible.",
        product: createdProducts[3]._id,
        user: createdUsers[1]._id,
      },
      {
        name: createdUsers[0].name,
        rating: 5,
        comment: "Best phone I have ever owned.",
        product: createdProducts[3]._id,
        user: createdUsers[0]._id,
      },
      {
        name: createdUsers[1].name,
        rating: 4,
        comment: "Stunning design.",
        product: createdProducts[4]._id,
        user: createdUsers[1]._id,
      },
      {
        name: createdUsers[0].name,
        rating: 5,
        comment: "Very happy with my purchase.",
        product: createdProducts[4]._id,
        user: createdUsers[0]._id,
      },
      {
        name: createdUsers[1].name,
        rating: 5,
        comment: "Excellent camera quality.",
        product: createdProducts[5]._id,
        user: createdUsers[1]._id,
      },
      {
        name: createdUsers[0].name,
        rating: 4,
        comment: "A bit expensive, but worth it.",
        product: createdProducts[5]._id,
        user: createdUsers[0]._id,
      },
    ];

    await Review.insertMany(reviews);

    // Create sample orders
    const user = await User.findOne({ email: "user@gmail.com" });
    const sampleOrders = [
      {
        user: user._id,
        orderItems: [
          {
            name: createdProducts[0].name,
            qty: 1,
            image: createdProducts[0].photos[0],
            price: createdProducts[0].price,
            product: createdProducts[0]._id,
          },
          {
            name: createdProducts[1].name,
            qty: 2,
            image: createdProducts[1].photos[0],
            price: createdProducts[1].price,
            product: createdProducts[1]._id,
          },
        ],
        shippingAddress: {
          address: "123 Main St",
          city: "Anytown",
          postalCode: "12345",
          country: "USA",
        },
        paymentMethod: "Manual Transfer",
        paymentStatus: "paid",
        isPaid: true,
        paidAt: new Date(),
        totalPrice:
          createdProducts[0].price * 1 + createdProducts[1].price * 2,
      },
    ];

    await Order.insertMany(sampleOrders);

    // Update product ratings based on reviews
    for (const product of createdProducts) {
      const productReviews = await Review.find({ product: product._id });
      if (productReviews.length > 0) {
        const avgRating =
          productReviews.reduce((acc, item) => item.rating + acc, 0) /
          productReviews.length;
        product.rating = avgRating;
        product.numReviews = productReviews.length;
        await product.save();
      }
    }

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  await connectDB();
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  seedDB();
}
