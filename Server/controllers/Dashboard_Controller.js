const UserDetails = require("../models/UserDetails");
const EmployeeDetails = require("../models/Staff");
const Orders = require("../models/Orders");
const Product = require("../models/Products");
const Allowances = require("../models/Allowances");
const Expenses = require("../models/Expenses");
const Deductions = require("../models/Deductions");
const Service = require("../models/ServiceForm");
const ServiceInvoice = require("../models/ServiceInvoice");
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

const Dashboard_Update_Employee = async (req, res) => {
  await EmployeeDetails.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "The employee record was not updated",
        });
      }
      res.status(200).json({
        success: true,
        message: `The employee data is successfully updated`,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "The employee update attempt failed",
        error: error,
      });
    });
};

const Dashboard_Staff_Data = async (req, res) => {
  try {
    const employees = await EmployeeDetails.find({});
    if (employees) {
      console.log(employees);
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
                message: "An error occured while deleting employee credentials",
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

const Dashboard_Update_Item = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "The product record was not updated",
        });
      }
      res.status(200).json({
        success: true,
        message: `The product data is successfully updated`,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "The product update attempt failed",
        error: error,
      });
    });
};

const Dashboard_Delete_Item = async (req, res) => {
  try {
    const { id } = req.params;

    Product.find({ _id: id })
      .then((result) => {
        console.log(`Item record exists`);
        if (result.length > 0) {
          Product.deleteOne({ _id: id })
            .then(() => {
              res.status(201).json({
                success: true,
                message: `Item sucessfully deleted`,
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json({
                success: false,
                message: "An error occured while deleting item details",
                error,
              });
            });
        } else {
          // item details don't exist
          res.status(400).json({
            success: false,
            message:
              "The item record doesn't exist or has already been deleted",
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
      message: "Server Error: error while deleting item",
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
          cart: req.session.cart,
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
const Dashboard_Reduce_Cart_Items = (req, res) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  console.log(req.session.cart);
  res.status(200).json({
    success: true,
    message: `The items reduction operation from the cart was successful`,
    redirect: req.session.oldURL,
  });
};

const Dashboard_Remove_Items = (req, res) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  console.log(req.session.cart);
  res.status(200).json({
    success: true,
    message: `The item selected was successfully removed from the cart`,
    redirect: req.session.oldURL,
  });
};

const Dashboard_Shopping_Cart_Details = (req, res) => {
  if (!req.session.cart) {
    res.status(401).json({
      success: false,
      message: `No shopping cart session: No items in the shopping cart`,
    });
  }
  let cart = new Cart(req.session.cart);
  res.status(201).json({
    success: true,
    message: `A shopping cart session exists`,
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    cart,
  });
};

const Dashboard_Checkout = async (req, res) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
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
    date: formattedToday,
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
    cart,
    success: true,
    message: "The payment is successfully made",
  });
};

const Dashboard_All_Products = async (req, res) => {
  try {
    await Product.find().then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          products: result,
          success: true,
          message: "All the products have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There are no products stored yet",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching product information",
      error: error,
    });
  }
};
const Dashboard_Order_Details = async (req, res) => {
  try {
    await Orders.findById(req.params.id).then((result) => {
      res.status(201).json({
        success: true,
        message: "The order details have been successfully fetched",
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching order information",
      error: error,
    });
  }
};

const Dashboard_All_Orders = async (req, res) => {
  try {
    let totalPrice = 0;
    await Orders.find().then((result) => {
      if (result.length > 0) {
        result.forEach((order) => {
          totalPrice += order.cart.totalPrice;
        });
      }
      console.log(result);
      res.status(201).json({
        totalPrice,
        orders: result,
        success: true,
        message: "All the products have been successfully fetched",
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching product information",
      error: error,
    });
  }
};

const Dashboard_Deductions_Data = async (req, res) => {
  try {
    await Deductions.find().then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          allowances: result,
          success: true,
          message: "All the deductions details have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There are no deduction stored yet",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching deduction information",
      error: error,
    });
  }
};

const Dashboard_Deductions_Entry = async (req, res) => {
  try {
    const deduction = new Deductions({
      id_no: req.body.id_no,
      month: req.body.month,
      year: req.body.year,
      nhif: req.body.nhif,
      nssf: req.body.nssf,
      advances: req.body.advances,
      taxes: req.body.taxes,
    });

    deduction
      .save()
      .then((result) => {
        console.log("Successful deduction entry");
        res.status(201).json({
          success: true,
          message: "Successful deduction entry",
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in deduction entry process.Try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The deduction entry attempt failed",
      error: error,
    });
  }
};

const Dashboard_Deductions_Update = async (req, res) => {
  await Deductions.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "The deduction record was not updated",
        });
      }
      res.status(200).json({
        success: true,
        message: `The deduction data is successfully updated`,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "The deduction update attempt failed",
        error: error,
      });
    });
};

const Dashboard_Expenses = async (req, res) => {
  try {
    await Expenses.find().then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          expenses: result,
          success: true,
          message: "All the expense details have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There are no expenses stored yet",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching expenses information",
      error: error,
    });
  }
};

const Dashboard_Expenses_Entry = async (req, res) => {
  try {
    const expenses = new Expenses({
      code: req.body.code,
      service_item_name: req.body.service_item_name,
      total_cost: req.body.total_cost,
      recorded_by: req.body.recorded_by,
      date: req.body.date,
    });

    expenses
      .save()
      .then((result) => {
        console.log("Successful expenses entry");
        res.status(201).json({
          success: true,
          message: "Successful expenses entry",
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in expenses entry process.Try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The expenses entry attempt failed",
      error: error,
    });
  }
};
const Dashboard_Expenses_Update = async (req, res) => {
  await Expenses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "The expenses record was not updated",
        });
      }
      res.status(200).json({
        success: true,
        message: `The expenses data is successfully updated`,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "The expenses update attempt failed",
        error: error,
      });
    });
};

const Dashboard_Allowance = async (req, res) => {
  try {
    await Allowances.find().then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          allowances: result,
          success: true,
          message: "All the allowances details have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There are no allowances stored yet",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching allowances information",
      error: error,
    });
  }
};

const Dashboard_Allowances_Entry = async (req, res) => {
  try {
    const allowances = new Allowances({
      id_no: req.body.id_no,
      month: req.body.month,
      year: req.body.year,
      arrears: req.body.arrears,
      house: req.body.house,
      imprest_amount: req.body.imprest_amount,
      transport: req.body.transport,
    });

    allowances
      .save()
      .then((result) => {
        console.log("Successful allowances entry");
        res.status(201).json({
          success: true,
          message: "Successful allowances entry",
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in allowances entry process.Try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The allowances entry attempt failed",
      error: error,
    });
  }
};

const Dashboard_Allowances_Update = async (req, res) => {
  await Allowances.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "The allowances record was not updated",
        });
      }
      res.status(200).json({
        success: true,
        message: `The allowances data is successfully updated`,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "The allowances update attempt failed",
        error: error,
      });
    });
};

const Dashboard_Service_Details = async (req, res) => {
  try {
    const serviceInvoice = new ServiceInvoice({
      invoice_code: req.body.invoice_code,
      date: req.body.date,
      time: req.body.time,
      work_duration: req.body.work_duration,
      cost: req.body.cost,
    });

    serviceInvoice
      .save()
      .then((result) => {
        console.log("Successful service invoice entry");

        const serviceInvoiceId = result._id;
        const service = new Service({
          client_name: req.body.client_name,
          work_location: req.body.work_location,
          requested_by: req.body.requested_by,
          scope: req.body.scope,
          scope_description: req.body.scope_description,
          payment_details: serviceInvoiceId,
          employee_details: req.body.employee_details,
        });

        service
          .save()
          .then((result) => {
            console.log("Successful service entry");
            res.status(201).json({
              success: true,
              message: "Successful service entry",
              result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(401).json({
              success: false,
              message: "Error in service entry process.Try again",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in service invoice entry process.Try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The service entry attempt failed",
      error: error,
    });
  }
};

module.exports = {
  Dashboard_Upload_Profile_Pic,
  Dashboard_Staff_Entry,
  Dashboard_Update_Employee,
  Dashboard_Staff_Data,
  Dashboard_Delete_Employee,
  Dashboard_New_Item,
  Dashboard_Update_Item,
  Dashboard_Delete_Item,
  Dashboard_Add_To_Cart,
  Dashboard_Reduce_Cart_Items,
  Dashboard_Remove_Items,
  Dashboard_Shopping_Cart_Details,
  Dashboard_Checkout,
  Dashboard_All_Products,
  Dashboard_Order_Details,
  Dashboard_All_Orders,
  Dashboard_Deductions_Data,
  Dashboard_Deductions_Entry,
  Dashboard_Deductions_Update,
  Dashboard_Expenses,
  Dashboard_Expenses_Entry,
  Dashboard_Expenses_Update,
  Dashboard_Allowance,
  Dashboard_Allowances_Entry,
  Dashboard_Allowances_Update,
  Dashboard_Service_Details,
};
