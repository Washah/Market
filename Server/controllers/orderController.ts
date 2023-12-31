import { Request, Response } from "express";
import { Order, OrderModel, ShoppingCartModel } from "../Models/Store";

// Function to create an order in database
export const createOrder = async (req: Request, res: Response) => {
  const orderDetails: Order = req.body;
  try {
    const newOrder = new OrderModel(orderDetails);
    await newOrder.save();
    // open new shopping cart after order has been completed
    const newShoppingCart = new ShoppingCartModel({
      customerId: newOrder.customerId,
    });
    await newShoppingCart.save();
    res.status(201).json({ newOrder, newShoppingCart });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get all the overbooked dates(more than 3 orders per date)
export const getOverbookedDates = async (req: Request, res: Response) => {
  try {
    const overbookedDates = await OrderModel.aggregate([
      {
        $group: {
          _id: "$deliveryDate",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gte: 3 },
        },
      },
    ]);
    const dates = overbookedDates.map(item => item._id);
    res.status(200).json(dates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get the amount of all orders
export const getOrdersAmount = async (req: Request, res: Response) => {
  try {
    const orderCount = await OrderModel.countDocuments();
    res.status(200).json(orderCount);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get last order of user by user id
export const getLastOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const lastOrder = await OrderModel.findOne({ customerId: userId })
      .sort({
        orderExecutionDate: -1,
      })
      .select("orderExecutionDate -_id");

    if (!lastOrder) {
      return res.status(200).json({ message: "No order found for this user." });
    }

    res.status(200).json(lastOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
