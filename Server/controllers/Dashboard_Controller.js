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
const Payroll = require("../models/Payroll");
const Customer = require("../models/Customer");
const Quotation = require("../models/QuotationInvoive");
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
      basic_salary: req.body.basic_salary,
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
          err,
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
const Dashboard_Single_Employee = async (req, res) => {
  try {
    await EmployeeDetails.findById(req.params.id).then((result) => {
      if (result) {
        res.status(201).json({
          employee: result,
          success: true,
          message: "The employee details have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message:
            "There is no employee record stored yet with the specified id",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching employee information",
      error: error,
    });
  }
};

const Dashboard_Staff_Data = async (req, res) => {
  try {
    const employees = await EmployeeDetails.find({});
    if (employees.length > 0) {
      console.log(employees);
      res.status(200).json({
        status: true,
        message: `Employee data sucessfully fetched`,
        employees,
      });
    } else {
      res.status(400).json({
        status: false,
        message: `No employee data was found`,
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
          err,
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
    cart: req.session.cart,
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
  } else {
    let cart = new Cart(req.session.cart);
    res.status(201).json({
      success: true,
      message: `A shopping cart session exists`,
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
      cart,
    });
  }
};

const Dashboard_Checkout = async (req, res) => {
  try {
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
    } else if (!req.session.customer) {
      res.status(401).json({
        success: false,
        message: `No customer selected`,
      });
    } else {
      var cart = new Cart(req.session.cart);

      const customer_details = req.session.customer;
      console.log(customer_details._id);
      await Customer.findById(customer_details._id).then(async (result) => {
        if (result) {
          let oldInvoices = result.invoice_history || [];
          if (oldInvoices.length) {
            oldInvoices = oldInvoices.filter((t) => {
              if (oldInvoices.invoice_code !== req.body.invoice_code) {
                return t;
              }
            });
          }

          await Customer.findByIdAndUpdate(customer_details._id, {
            invoice_history: [
              ...oldInvoices,
              { invoice_code: req.body.invoice_code, status: "paid" },
            ],
          });
          console.log("Invoice codes successfully updated");
          if (req.body.contact_person) {
            await Customer.findByIdAndUpdate(customer_details._id, {
              contact_person: req.body.contact_person,
            });
          }
        } else {
          res.status(401).json({
            success: false,
            message: "There is no customer record with the specified id",
          });
        }
      });

      await Quotation.find({ ref_code: req.body.invoice_code }).then(
        (result) => {
          if (result.length > 0) {
            res.status(401).json({
              success: false,
              message: "An invoice record already has this code",
            });
          } else {
            const Order = new Orders({
              user: req.user,
              customer: customer_details._id,
              invoice_code: req.body.invoice_code,
              date: formattedToday,
              product_details: cart,
              terms: req.body.terms,
              purchase_type: req.body.purchase_type,
              discount: req.body.discount,
              tax: req.body.tax,
            });
            Order.save()
              .then((result) => {
                console.log("Order details successfully saved");
                req.session.cart = null;
                req.session.customer = null;
                res.status(201).json({
                  success: true,
                  message: "The payment is successfully made",
                  result,
                });
              })
              .catch((error) => {
                res.status(400).json({
                  success: false,
                  message: "An error occured while saving the order details",
                  error,
                });
              });
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while processing checkout information",
      error: error,
    });
  }
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
          totalPrice += order.product_details.totalPrice;
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

const Dashboard_Single_Deductions_Data = async (req, res) => {
  try {
    await Deductions.find({ id_no: req.params.id })
      .sort({ $natural: -1 })
      .limit(1)
      .then((result) => {
        if (result) {
          res.status(201).json({
            allowances: result,
            success: true,
            message: "The deductions details have been successfully fetched",
          });
        } else {
          res.status(401).json({
            success: false,
            message: "There are no deduction stored yet with the specified id",
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
          err,
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

const Dashboard_Single_Expenses = async (req, res) => {
  try {
    await Expenses.findById(req.params.id).then((result) => {
      if (result) {
        res.status(201).json({
          expense: result,
          success: true,
          message: "The expense details have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There are no expenses stored yet with the specified id",
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
          err,
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

const Dashboard_Single_Allowance = async (req, res) => {
  try {
    await Allowances.find({ id_no: req.params.id })
      .sort({ $natural: -1 })
      .limit(1)
      .then((result) => {
        if (result.length > 0) {
          res.status(201).json({
            allowances: result,
            success: true,
            message: "The allowances details have been successfully fetched",
          });
        } else {
          res.status(401).json({
            success: false,
            message: "There are no allowances stored yet with the specified id",
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
          err,
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
              err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in service invoice entry process.Try again",
          err,
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

const Dashboard_Payroll_Entry = async (req, res) => {
  try {
    const payroll = new Payroll({
      id_no: req.body.id_no,
      net_salary: req.body.net_salary,
      remitted_amount: req.body.remitted_amount,
      outstanding_amount: req.body.outstanding_amount,
      date_of_payment: req.body.date_of_payment,
    });

    payroll
      .save()
      .then((result) => {
        console.log("Successful payroll entry");
        res.status(201).json({
          success: true,
          message: "Successful payroll entry",
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in payroll entry process.Try again",
          err,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The payroll entry attempt failed",
      error: error,
    });
  }
};
const Dashboard_Payroll_Update = async (req, res) => {
  await Payroll.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "The payroll record was not updated",
        });
      }
      res.status(200).json({
        success: true,
        message: `The payroll data is successfully updated`,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "The payroll update attempt failed",
        error: error,
      });
    });
};
const Dashboard_Service_Invoice = async (req, res) => {
  try {
    await ServiceInvoice.find().then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          service_invoices: result,
          success: true,
          message:
            "All the service invoice records have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There are no service invoice records stored yet",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching service invoice records",
      error: error,
    });
  }
};
const Dashboard_Service_Form = async (req, res) => {
  try {
    await Service.find().then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          service_forms: result,
          success: true,
          message:
            "All the service form records have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There are no service form records stored yet",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching service form records",
      error: error,
    });
  }
};
const Dashboard_Single_Service_Invoice = async (req, res) => {
  try {
    await ServiceInvoice.findById(req.params.id).then((result) => {
      if (result) {
        res.status(201).json({
          service_invoices: result,
          success: true,
          message: "The service invoice record has been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There is no service invoice record with the specified id",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching the service invoice record",
      error: error,
    });
  }
};
const Dashboard_Single_Service_Form = async (req, res) => {
  try {
    await Service.findById(req.params.id).then((result) => {
      if (result) {
        res.status(201).json({
          service_forms: result,
          success: true,
          message: "The service form record has been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message:
            "There is no service form record stored yet with the specified id",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching the service form record",
      error: error,
    });
  }
};

const Dashboard_Customer_Entry = async (req, res) => {
  try {
    const customer = new Customer({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      contact_person: req.body.contact_person,
    });

    customer
      .save()
      .then((result) => {
        console.log("Successful customer entry");
        res.status(201).json({
          success: true,
          message: "Successful customer entry",
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in customer entry process.Try again",
          err,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The customer entry attempt failed",
      error: error,
    });
  }
};

const Dashboard_Customer_Details = async (req, res) => {
  try {
    await Customer.find().then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          customers: result,
          success: true,
          message: "All the customer records have been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There is no customer record stored yet",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching customer records",
      error: error,
    });
  }
};
const Dashboard_Single_Customer_Details = async (req, res) => {
  try {
    await Customer.findById(req.params.id).then((result) => {
      if (result) {
        req.session.customer = result;
        res.status(201).json({
          customer: req.session.customer,
          success: true,
          message: "The customer record has been successfully fetched",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "There is no customer record with the specified id",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching the customer record",
      error: error,
    });
  }
};

const Dashboard_Quotation_Invoice = async (req, res) => {
  try {
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
    } else if (!req.session.customer) {
      res.status(401).json({
        success: false,
        message: `No customer selected`,
      });
    } else {
      var cart = new Cart(req.session.cart);
      const customer_details = req.session.customer;
      console.log(customer_details._id);
      await Customer.findById(customer_details._id).then(async (result) => {
        if (result) {
          let oldInvoices = result.invoice_history || [];
          if (oldInvoices.length) {
            oldInvoices = oldInvoices.filter((t) => {
              if (oldInvoices.invoice_code !== req.body.ref_code) {
                return t;
              }
            });
          }

          await Customer.findByIdAndUpdate(customer_details._id, {
            invoice_history: [
              ...oldInvoices,
              { invoice_code: req.body.ref_code, status: "quotation" },
            ],
          });
          console.log("Invoice codes successfully updated");
          if (req.body.contact_person) {
            await Customer.findByIdAndUpdate(customer_details._id, {
              contact_person: req.body.contact_person,
            });
          }
        } else {
          res.status(401).json({
            success: false,
            message: "There is no customer record with the specified id",
          });
        }
      });

      await Quotation.find({ ref_code: req.body.ref_code }).then((result) => {
        if (result.length > 0) {
          res.status(401).json({
            success: false,
            message: "A quotation record already has this reference code",
          });
        } else {
          const quotation = new Quotation({
            ref_code: req.body.ref_code,
            date: formattedToday,
            due_date: req.body.due_date,
            quotations_details: cart,
            terms: req.body.terms,
            quotation_type: req.body.quotation_type,
            discount: req.body.discount,
            tax: req.body.tax,
          });
          quotation
            .save()
            .then((result) => {
              console.log("Quotation details successfully saved");
              req.session.customer = null;
              req.session.cart = null;
              res.status(201).json({
                success: true,
                message: "Quotation details successfully saved",
                result,
              });
            })
            .catch((error) => {
              res.status(400).json({
                success: false,
                message: "An error occured while saving the quotation details",
                error,
              });
            });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while processing quotation information",
      error: error,
    });
  }
};

const Dashboard_Quotation_Data = async (req, res) => {
  try {
    await Quotation.find().then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          allowances: result,
          success: true,
          message: "The quotation details have been successfully fetched",
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
      message: "Server Error: error while fetching quotation information",
      error: error,
    });
  }
};

const Dashboard_Single_Quotation_Data = async (req, res) => {
  try {
    await Quotation.find({ invoice_code: req.params.invoice })
      .sort({ $natural: -1 })
      .limit(1)
      .then((result) => {
        if (result.length > 0) {
          res.status(201).json({
            allowances: result,
            success: true,
            message: "The quotation details have been successfully fetched",
          });
        } else {
          res.status(401).json({
            success: false,
            message:
              "There are no quotation stored yet with the specified invoice code",
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: error while fetching quotation information",
      error: error,
    });
  }
};

const Dashboard_Quotation_Update = async (req, res) => {
  await Quotation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "The quotation record was not updated",
        });
      }
      res.status(200).json({
        success: true,
        message: `The quotation data is successfully updated`,
        result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "The quotation update attempt failed",
        error: error,
      });
    });
};

const Dashboard_Quotation_Update_To_Sale = async (req, res) => {
  try {
    await Quotation.find({ _id: req.params.id }).then(async (result) => {
      if (result.length > 0) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        const formattedToday = dd + "/" + mm + "/" + yyyy;
        const details = [...result];
        let invoice_code = "";
        let product_details = {};
        let terms = "";
        let purchase_type = "";
        let discount = 0;
        let tax = 0;
        details.forEach(function (element) {
          invoice_code = element.ref_code;
          product_details = element.quotations_details;
          terms = element.terms;
          purchase_type = element.quotation_type;
          discount = element.discount;
          tax = element.tax;
        });
        if (!req.session.customer) {
          res.status(401).json({
            success: false,
            message: `No customer selected`,
          });
        } else {
          const customer_details = req.session.customer;
          console.log(customer_details._id);
          await Customer.findById(customer_details._id).then(async (result) => {
            if (result) {
              let oldInvoices = result.invoice_history || [];
              if (oldInvoices.length) {
                oldInvoices = oldInvoices.filter((t) => {
                  if (oldInvoices.invoice_code !== invoice_code) {
                    return t;
                  }
                });
              }

              await Customer.findByIdAndUpdate(customer_details._id, {
                invoice_history: [
                  ...oldInvoices,
                  { invoice_code: invoice_code, status: "paid" },
                ],
              });
              console.log("Invoice codes successfully updated");
              if (req.body.contact_person) {
                await Customer.findByIdAndUpdate(customer_details._id, {
                  contact_person: req.body.contact_person,
                });
              }
            } else {
              res.status(401).json({
                success: false,
                message: "There is no customer record with the specified id",
              });
            }
          });

          await Quotation.findByIdAndDelete(details[0]._id)
            .then(async (result) => {
              await Quotation.find({ ref_code: invoice_code }).then(
                (result) => {
                  if (result.length > 0) {
                    res.status(401).json({
                      success: false,
                      message: "An invoice record already has this code",
                    });
                  } else {
                    const Order = new Orders({
                      user: req.user,
                      invoice_code: invoice_code,
                      date: formattedToday,
                      product_details: product_details,
                      terms: terms,
                      purchase_type: purchase_type,
                      discount: discount,
                      tax: tax,
                    });
                    Order.save()
                      .then((result) => {
                        console.log("Order details successfully saved");
                        req.session.cart = null;
                        req.session.customer = null;
                        res.status(201).json({
                          success: true,
                          message: "The payment is successfully made",
                          result,
                        });
                      })
                      .catch((error) => {
                        res.status(400).json({
                          success: false,
                          message:
                            "An error occured while saving the order details",
                          error,
                        });
                      });
                  }
                }
              );
            })
            .catch((err) => {
              res.status(404).json({
                success: false,
                message: "Error while deleting quotation record",
              });
            });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "The quotation record was not updated",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The quotation update attempt failed",
      error: error,
    });
  }
};

module.exports = {
  Dashboard_Upload_Profile_Pic,
  Dashboard_Staff_Entry,
  Dashboard_Update_Employee,
  Dashboard_Single_Employee,
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
  Dashboard_Single_Deductions_Data,
  Dashboard_Deductions_Entry,
  Dashboard_Deductions_Update,
  Dashboard_Expenses,
  Dashboard_Single_Expenses,
  Dashboard_Expenses_Entry,
  Dashboard_Expenses_Update,
  Dashboard_Allowance,
  Dashboard_Single_Allowance,
  Dashboard_Allowances_Entry,
  Dashboard_Allowances_Update,
  Dashboard_Service_Details,
  Dashboard_Payroll_Entry,
  Dashboard_Payroll_Update,
  Dashboard_Service_Form,
  Dashboard_Service_Invoice,
  Dashboard_Single_Service_Form,
  Dashboard_Single_Service_Invoice,
  Dashboard_Customer_Entry,
  Dashboard_Customer_Details,
  Dashboard_Single_Customer_Details,
  Dashboard_Quotation_Invoice,
  Dashboard_Quotation_Data,
  Dashboard_Single_Quotation_Data,
  Dashboard_Quotation_Update,
  Dashboard_Quotation_Update_To_Sale,
};
