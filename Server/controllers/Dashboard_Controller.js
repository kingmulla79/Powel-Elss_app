const UserDetails = require("../models/UserDetails");
const EmployeeDetails = require("../models/Staff");
const Orders = require("../models/Orders");
const Product = require("../models/Products");
const Cart = require("../models/Cart");
const path = require("path");

const Dashboard_Upload_Profile_Pic = async (req, res) => {
  const user = req.user;

  if (!user)
    return res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  try {
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const profile_pic = fileUrl;
    console.log(profile_pic);

    await UserDetails.findByIdAndUpdate(user._id, { profile_pic });
    res.status(201).json({
      success: true,
      message: "Your profile has been updated",
    });
  } catch (error) {
    console.log("Error while uploading the message", error);
    res.status(500).json({
      success: false,
      message:
        "Server Error: error while uploading the message. Try again after some time",
      error: error,
    });
  }
};
const Dashboard_Staff_Entry = async (req, res) => {
  try {
    const isNewId = await EmployeeDetails.isThisIdInUse(req.body.id_no);
    if (!isNewId)
      return res.status(400).json({
        success: false,
        message: "A user with this id number already exists",
      });
    const employee = new EmployeeDetails({
      id_no: req.body.id_no,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_no: req.body.phone_no,
      job_title: req.body.job_title,
      P_no: req.body.P_no,
    });
    employee
      .save()
      .then((result) => {
        console.log("Successful entry");
        res.status(201).json({
          success: true,
          message: "Successful entry",
          redirect: "/api/auth/dashboard",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in registration.Try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The employee entry attempt failed",
      error: error,
    });
  }
};
const Dashboard_Staff_Data = async (req, res) => {
  try {
    const employees = await EmployeeDetails.find({});
    if (employees) {
      res.status(200).json({
        status: true,
        message: `Employee data sucessfully fetched`,
        employees,
      });
    } else {
      res.status(400).json({
        status: false,
        message: `Bad request`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The employee data fetch attempt failed",
      error: error,
    });
  }
};
const Dashboard_Delete_Employee = async (req, res) => {
  try {
    const { id } = req.params;
    EmployeeDetails.find({ _id: id })
      .then((result) => {
        console.log(`Employee record exists`);
        if (result.length > 0) {
          EmployeeDetails.deleteOne({ _id: id })
            .then(() => {
              res.status(201).json({
                success: true,
                message: `Employee sucessfully deleted`,
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json({
                success: false,
                message:
                  "An error occured while deleting verification credentials",
                error,
              });
            });
        } else {
          // user verification details don't exist
          res.status(400).json({
            success: false,
            message:
              "The account record doesn't exist or has already been deleted",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "The Id provided is invalid",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The employee data deletion attempt failed",
      error: error,
    });
  }
};

const Dashboard_New_Item = async (req, res) => {
  try {
    const item = new Product({
      name: req.body.name,
      desc: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      product_photo: req.body.product_photo,
    });

    item
      .save()
      .then((result) => {
        console.log("Successful entry");
        res.status(201).json({
          success: true,
          message: "Successful entry",
          redirect: "/api/auth/dashboard",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in entry process.Try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The item entry attempt failed",
      error: error,
    });
  }
};

const Dashboard_Add_To_Cart = async (req, res) => {
  try {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    await Product.findById(productId)
      .then((result) => {
        cart.add(result, result._id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.status(200).json({
          success: true,
          message: `The item has been successfully added to cart`,
        });
      })
      .catch((error) => {
        res.status(401).json({
          success: false,
          message:
            "Could not find the products provided in the products collection",
          error: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while adding item to cart",
      error: error,
    });
  }
};

const Dashboard_Shopping_Cart_Details = (req, res) => {
  if (!req.session.cart) {
    res.status(200).json({
      success: true,
      message: `No shopping cart session: No items in the shopping cart`,
    });
  }
  let cart = new Cart(req.session.cart);
  res.status(201).json({
    success: true,
    message: `A shopping cart session exists`,
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
};

const Dashboard_Checkout = async (req, res) => {
  if (!req.session.cart) {
    res.status(401).json({
      success: false,
      message: `No shopping cart available`,
    });
  }
  var cart = new Cart(req.session.cart);

  const Order = new Orders({
    user: req.user,
    cart: cart,
    address: req.body.address,
    name: req.body.name,
  });
  Order.save()
    .then((result) => {
      console.log("Order details successfully saved");
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "An error occured while saving the order details",
      });
    });
  req.session.cart = null;
  res.status(201).json({
    success: true,
    message: "The payment is successfully made",
  });
};

module.exports = {
  Dashboard_Upload_Profile_Pic,
  Dashboard_Staff_Entry,
  Dashboard_Staff_Data,
  Dashboard_Delete_Employee,
  Dashboard_New_Item,
  Dashboard_Add_To_Cart,
  Dashboard_Shopping_Cart_Details,
  Dashboard_Checkout,
};
