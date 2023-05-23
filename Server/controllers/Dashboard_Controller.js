const UserDetails = require("../models/UserDetails");
const EmployeeDetails = require("../models/Staff");
const ItemDetails = require("../models/Items");
const ItemSalesDetails = require("../models/ItemSales");
const InvoiceDetails = require("../models/Invoice");
const path = require("path");

const Dashboard_Load_Page = (req, res) => {
  res.status(200).json({ success: true });
};
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
const Dashboard_New_Item_Page = (req, res) => {
  res.status(200).json({ success: true });
};

const Dashboard_New_Item = async (req, res) => {
  try {
    const item = new ItemDetails({
      item_name: req.body.item_name,
      item_category: req.body.item_category,
      unit_price: req.body.unit_price,
      unit_size: req.body.unit_size,
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

const Dashboard_New_Sale_Page = (req, res) => {
  res.status(200).json({ success: true });
};
const Dashboard_New_Sale = async (req, res) => {
  try {
    const invoice = new InvoiceDetails({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      total_cost: req.body.total_cost,
    });

    invoice
      .save()
      .then((result) => {
        console.log("Successful invoice entry");
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in invoice entry process.Try again",
        });
      });

    const invoice_id = await InvoiceDetails.find({}).sort({ _id: -1 }).limit(1);
    const item_id = await ItemDetails.find({}).sort({ _id: -1 }).limit(1);
    const itemSale = new ItemSalesDetails({
      invoice_code: invoice_id[0]._id,
      item: item_id[0]._id,
      quantity: req.body.quantity,
      unit_price: req.body.unit_price,
      sub_total: req.body.sub_total,
    });

    itemSale
      .save()
      .then((result) => {
        console.log("Successful sale entry");
        res.status(201).json({
          success: true,
          message: "Successful sale entry",
          redirect: "/api/auth/dashboard",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in sale entry process.Try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The sale entry attempt failed",
      error: error,
    });
  }
};
const Dashboard_New_Invoice_Page = (req, res) => {
  res.status(200).json({ success: true });
};
const Dashboard_New_Invoice = (req, res) => {
  try {
    const invoice = new InvoiceDetails({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      total_cost: req.body.total_cost,
    });

    invoice
      .save()
      .then((result) => {
        console.log("Successful invoice entry");
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
          message: "Error in invoice entry process.Try again",
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The invoice entry attempt failed",
      error: error,
    });
  }
};
module.exports = {
  Dashboard_Load_Page,
  Dashboard_Upload_Profile_Pic,
  Dashboard_Staff_Entry,
  Dashboard_New_Item_Page,
  Dashboard_New_Item,
  Dashboard_New_Sale_Page,
  Dashboard_New_Sale,
  Dashboard_New_Invoice_Page,
  Dashboard_New_Invoice,
};
