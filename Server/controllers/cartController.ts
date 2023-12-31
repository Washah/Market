import { CartItemModel, ShoppingCartModel } from "../Models/Store";
import { Request, Response } from "express";

// Function to check if user has an cart and if no create it
export const checkShoppingCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    // use the last created shopping cart
    const latestShoppingCart = await ShoppingCartModel.findOne({
      customerId: userId,
    }).sort({ createdAt: -1 }); // sorting in descending order

    if (latestShoppingCart) {
      res.status(200).json(latestShoppingCart);
    } else {
      const newShoppingCart = new ShoppingCartModel({ customerId: userId });
      await newShoppingCart.save();
      res.status(201).json(newShoppingCart);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// function to add new item to the cart
export const addItemToCart = async (req: Request, res: Response) => {
  const { cartId } = req.params;
  const item = req.body;

  try {
    const shoppingCart = await ShoppingCartModel.findOne({ _id: cartId });
    if (!shoppingCart) {
      return res.status(400).json({ message: "Shopping cart not found" });
    }

    const existingCartItem = await CartItemModel.findOne({
      cartId: cartId,
      productId: item.productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += item.quantity;
      existingCartItem.generalPrice += item.generalPrice;
      await existingCartItem.save();
      res.status(200).json(existingCartItem);
    } else {
      const newCartItem = new CartItemModel({ ...item, cartId: cartId });
      await newCartItem.save();
      res.status(201).json(newCartItem);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get all cart items with cartId
export const getCartItems = async (req: Request, res: Response) => {
  const { cartId } = req.params;
  try {
    const cartItems = await CartItemModel.find({ cartId: cartId });
    if (!cartItems) {
      return res.status(404).json({ message: "No items in this cart" });
    }
    res.status(200).json(cartItems);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// update cart item
export const updateCartItem = async (req: Request, res: Response) => {
  const item = req.body;

  try {
    const cartItem = await CartItemModel.findOne({
      cartId: item.cartId,
      productId: item.productId,
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = item.quantity;
    cartItem.generalPrice = item.generalPrice;

    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// delete item from cart
export const deleteCartItem = async (req: Request, res: Response) => {
  const { cartId, productId } = req.params;
  try {
    const cartItem = await CartItemModel.findOne({
      cartId: cartId,
      productId: productId,
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    await CartItemModel.deleteOne({ _id: cartItem._id });
    res.status(200).json(cartItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// delete all cart items
export const deleteAllCartItems = async (req: Request, res: Response) => {
  const { cartId } = req.params;

  try {
    const cartItems = await CartItemModel.find({ cartId: cartId });
    if (cartItems.length === 0)
      return res.status(404).json({ message: "No items in this cart" });
    await CartItemModel.deleteMany({ cartId: cartId });
    res.status(200).json({ message: "All cart items are deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
