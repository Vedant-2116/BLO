// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const jwtSecretKey = '101398199@georgebrown.ca';
const app = express();
const port = 5001;

// Enable CORS middleware
app.use(cors({ origin: 'http://localhost:3000' }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://vedqntgohel:r9KC6muUvCXjNIeJ@vedant.zonvp7s.mongodb.net/BLO', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define a user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    cart: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
          },
          size: {
            type: String // Assuming size is stored as a string, modify as needed
          },
          quantity: {
            type: Number,
            default: 1,
            min: 1
          }
        }
      ],      
    shippingDetails: {
        type: {
            fullName: {
                type: String
            },
            phoneNumber: {
                type: String
            },
            province: {
                type: String
            },
            city: {
                type: String
            },
            streetAddress: {
                type: String
            },
            postalCode: {
                type: String
            }
        },
        default: {} // Default shipping details object
    },
    paymentCard: {
        type: {
            cardholderName: {
                type: String
            },
            cardNumber: {
                type: String
            },
            expirationDate: {
                type: String
            },
            cvv: {
                type: String
            }
            // Add other relevant fields for payment card details
        },
        default: {} // Default payment card object
    }
});

// Define a User model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
      const { fullName, email, username, password, role } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ fullName, email, username, password: hashedPassword, role });
      await newUser.save();
  
      // Send the response with the user details and role
      res.status(201).json({ 
        message: 'Signup successful',
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role // Include the role in the response
        }
      });
    } catch (error) {
      console.error('Signup failed:', error);
      res.status(500).json({ error: 'Signup failed' });
    }
});

  
  // Login endpoint
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Incorrect username or password' });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: '1h' });
  
      // Send token and role in the response
      res.json({ token, role: user.role });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/api/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  });
  app.put('/api/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedUserData = req.body;
  
      // Find the user by ID and update their data
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User data updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ error: 'Failed to update user data' });
    }
  });

  app.put('/api/users/:userId/shipping-details', async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName, phoneNumber, province, city, streetAddress, postalCode } = req.body;

        // Check if the user exists
        let user = await User.findById(userId);

        // If user doesn't exist, create a new user with the shipping details
        if (!user) {
            user = new User({
                _id: userId,
                shippingDetails: { fullName, phoneNumber, province, city, streetAddress, postalCode }
            });
        } else {
            // If user exists, update their shipping details
            user.shippingDetails = { fullName, phoneNumber, province, city, streetAddress, postalCode };
        }

        // Save the user document
        await user.save();

        res.status(200).json({ message: 'Shipping details updated successfully', user });
    } catch (error) {
        console.error('Error updating shipping details:', error);
        res.status(500).json({ error: 'Failed to update shipping details' });
    }
});

app.get('/api/users/:userId/shipping-details', async (req, res) => {
    try {
        const userId = req.params.userId;
        // Fetch user from the database based on userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Extract shipping details from the user document
        const shippingDetails = user.shippingDetails;
        res.json(shippingDetails);
    } catch (error) {
        console.error('Error fetching shipping details:', error);
        res.status(500).json({ error: 'Failed to fetch shipping details' });
    }
});


app.put('/api/users/:userId/payment-card', async (req, res) => {
    try {
        const { userId } = req.params;
        const { cardholderName, cardNumber, expirationDate, cvv } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update payment card details
        user.paymentCard = { cardholderName, cardNumber, expirationDate, cvv };
        await user.save();

        res.status(200).json({ message: 'Payment card details updated successfully', user });
    } catch (error) {
        console.error('Error updating payment card details:', error);
        res.status(500).json({ error: 'Failed to update payment card details' });
    }
});

app.put('/api/users/:userId/cart', async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity, size } = req.body; // Add size to the destructuring

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the product already exists in the cart
        const existingProductIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        if (existingProductIndex !== -1) {
            // If the product exists, update its quantity
            user.cart[existingProductIndex].quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart with size
            user.cart.push({ productId, quantity, size });
        }

        // Save the updated user object
        await user.save();

        res.status(200).json({ message: 'Cart updated successfully', user });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
    }
});
  app.get('/api/users/:userId/cart', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Retrieve the cart data from the user object
        const cart = user.cart;
        
        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

  

  // Define a product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imagePath: String,
  isNew: Boolean,
  videoPath: String,
  liked: Boolean,
  collection: String,
});

// Define a Product model
const Product = mongoose.model('Product', productSchema);

// Middleware
app.use(bodyParser.json());

// Route to fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
app.get('/api/products/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      // Find the product by ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      // Return the product details
      res.json(product);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ error: 'Failed to fetch product details' });
    }
  });

// Route to fetch a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Route to create a new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Failed to create product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Route to update a product by ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Failed to update product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Route to delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Failed to delete product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});


// Route to toggle the like status of a product by ID
app.post('/api/products/:id/like', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      product.liked = !product.liked;
      await product.save();
      res.json(product);
    } catch (error) {
      console.error('Failed to toggle like status:', error);
      res.status(500).json({ error: 'Failed to toggle like status' });
    }
  });

  // Order 
  const orderSchema = new mongoose.Schema({
    customerName: String,
    phoneNumber: String,
    shippingDetails: String, // Change shippingDetails to an array of strings
    products: [
      {
        productId: String, // Add productId field
        name: String,
        price: Number,
        size: String,
        quantity: Number // Add quantity field
      }
    ],
    total: Number,
    shippingCharge: Number,
    taxes: Number,
    subTotal: Number,
    status: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

  

  const Order = mongoose.model('Order', orderSchema);

  app.post('/api/orders', async (req, res) => {
    try {
      // Extract order data from the request body
      const { customerName, phoneNumber, shippingDetails, products, total, shippingFees, taxes, subTotal } = req.body;
  
      // Concatenate shipping details into a single string
      const formattedShippingDetails = `${shippingDetails.streetAddress}, ${shippingDetails.city}, ${shippingDetails.province}, ${shippingDetails.postalCode}`;
  
      // Modify products array to include productId, name, price, quantity, and size
      const formattedProducts = products.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        size: item.size,
        quantity: item.quantity
      }));
  
      // Create a new order document with default status as 'unpaid'
      const newOrder = new Order({
        customerName,
        phoneNumber,
        shippingDetails: formattedShippingDetails,
        products: formattedProducts,
        total,
        shippingFees,
        taxes,
        subTotal,
        status: 'unpaid'
      });
  
      // Save the order to the database
      const savedOrder = await newOrder.save();
  
      // Respond with a success message and the order ID
      res.status(201).json({ message: 'Order created successfully', orderId: savedOrder._id });
    } catch (error) {
      // If an error occurs, respond with an error message
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });
  
  
 // Get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.put('/api/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    const updatedData = req.body;

    try {
        // Find the order by ID and update it with the new data
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order updated successfully', updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});


// Print an order by ID
app.post('/api/orders/:id/print', async (req, res) => {
    try {
        const orderId = req.params.id;
        // Here you can implement your print logic, such as sending the order details to a printer
        // For now, let's just send a response indicating that the print request was received
        console.log(`Printing order with ID: ${orderId}`);
        res.json({ message: 'Print request received for order', orderId });
    } catch (error) {
        console.error('Error printing order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
