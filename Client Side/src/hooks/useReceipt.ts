import saveAs from "file-saver";
import { Order } from "../models/Order";
import { useCartState } from "./useCartState";
import { useProductState } from "./useProductState";
import moment from "moment";

export const useReceipt = () => {
  // Fetch cart items using the custom hook
  const { cartItems } = useCartState();
  // Fetch products using the custom hook
  const { products } = useProductState();

  // Map cart items to their corresponding products and append quantity information
  const orderItems = cartItems.map(cartItem => {
    const product = products.find(prod => prod._id === cartItem.productId);
    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });

  // Construct a list of items in string format for the receipt
  const itemsList = orderItems
    .map(
      item =>
        `${item.productName!.padEnd(25, " ")} x ${item.quantity} : \u20AA${(
          item.price! * item.quantity
        ).toFixed(2)}`
    )
    .join("\n");

  // Function to generate and download the receipt
  const downloadReceipt = (orderDetails: Order) => {
    // Format the current date for the receipt
    const orderDate = moment().format("DD/MM/YYYY, HH:mm:ss");
    // Format the provided delivery date for the receipt
    const deliveryDate = moment(orderDetails.deliveryDate).format("DD/MM/YYYY");

    // Construct the receipt text
    const receiptText = `
Receipt
----------------------------------
Order Date   : ${orderDate}
Delivery Date: ${deliveryDate}
City         : ${orderDetails.deliveryCity}
Street       : ${orderDetails.deliveryStreet}
Payment      : **** **** **** ${orderDetails.paymentMethodLast4Digits}
          
Items:
${itemsList}
  
Total Amount : \u20AA${orderDetails.finalPrice.toFixed(2)}
          
Thank you for shopping with us! 🙂`;

    const blob = new Blob([receiptText], { type: "text/plain" });
    saveAs(blob, "receipt.txt");
  };

  return { downloadReceipt };
};
