import { useForm, Controller } from "react-hook-form";
import { OrderFormValues } from "../../types/OrderFormValues";
import Button from "../Button/Button";
import FormInput from "../FormInput";
import { resolver } from "../../validators/orderFormValidator";
import "./OrderForm.css";
import { useUserState } from "../../hooks/useUserState";
import React from "react";
import { capitalizeWords } from "../../utils/capitalizeWords";
import { Order } from "../../models/Order";
import { useCartState } from "../../hooks/useCartState";
import OrderCompletedModal from "../OrderCompletedModal";
import { createOrder } from "../../api/orderApi";
import OrderDatePicker from "../OrderDatePicker";
import dayjs from "dayjs";
import { setCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import CreditCardInput from "../CreditCardInput";
import useResponsive from "../../hooks/useResponsive";

const OrderForm = () => {
  // custom hook to get user and cart state from the Redux store
  const { user } = useUserState();
  const { cartId, cartItems } = useCartState();

  // Local state for modal visibility and order details
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState<Order>();

  // Calculate the final price from cart items
  const finalPrice = cartItems.reduce((acc, item) => {
    return acc + item.generalPrice;
  }, 0);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver,
    defaultValues: {
      deliveryCity: capitalizeWords(user?.city ?? ""),
      deliveryStreet: capitalizeWords(user?.street ?? ""),
    },
  });

  const dispatch = useDispatch();

  // Function to execute on form submit
  const onSubmit = handleSubmit(async data => {
    try {
      const last4digits = data.paymentMethodLast4Digits.slice(-4);
      // Construct order details object
      const orderDetails: Order = {
        ...data,
        customerId: user?._id ?? "",
        paymentMethodLast4Digits: last4digits,
        cartId: cartId,
        finalPrice: finalPrice,
      };
      const response = await createOrder(orderDetails);
      if (response) {
        setOrderDetails(response.newOrder);
        setModalOpen(true);
        dispatch(setCart(response.newShoppingCart));
      }
      reset();
    } catch (err) {
      console.error(err);
    }
  });

  const { isTabletOrMobile } = useResponsive();

  return (
    <div className="order">
      {isModalOpen && (
        <OrderCompletedModal
          onClose={() => setModalOpen(false)}
          isOpen={isModalOpen}
          orderDetails={orderDetails}
        />
      )}
      <h1 className="order__header-1 header blueText">Order</h1>
      <h2 className="order__header-2 header blueText">Shipping Details</h2>
      <div className="order__form">
        <form onSubmit={onSubmit}>
          <FormInput
            register={register("deliveryCity")}
            name="deliveryCity"
            label="City"
            type="text"
            error={!!errors.deliveryCity}
            helperText={errors.deliveryCity?.message}
          />
          <FormInput
            register={register("deliveryStreet")}
            name="deliveryStreet"
            label="Street"
            type="text"
            error={!!errors.deliveryStreet}
            helperText={errors.deliveryStreet?.message}
          />
          <Controller
            name="deliveryDate"
            control={control}
            render={({ field }) => (
              <OrderDatePicker
                value={field.value || null}
                onChange={(date: Date | null) => {
                  field.onChange(dayjs(date).format("YYYY-MM-DD"));
                }}
                error={!!errors.deliveryDate}
                helperText={errors.deliveryDate?.message}
              />
            )}
          />
          <h2 className="order__header-3 header blueText">Payments</h2>
          {isTabletOrMobile ? (
            <FormInput
              register={register("paymentMethodLast4Digits")}
              name="paymentMethodLast4Digits"
              label="Card Number"
              type="number"
              error={!!errors.paymentMethodLast4Digits}
              helperText={errors.paymentMethodLast4Digits?.message}
            />
          ) : (
            <Controller
              name="paymentMethodLast4Digits"
              control={control}
              render={({ field }) => (
                <CreditCardInput
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.paymentMethodLast4Digits}
                  helperText={errors.paymentMethodLast4Digits?.message}
                />
              )}
            />
          )}
          <div className="order__form--button">
            <Button
              type="submit"
              text="Finish Order"
              color=" rgb(103, 32, 180)"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(OrderForm);
