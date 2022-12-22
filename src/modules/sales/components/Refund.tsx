import {
  selectSearchOrderId,
  selectSetRefundOrderId,
} from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import useOrders from "@services/hooks/useOrder";
import React from "react";
import { useCart } from "react-use-cart";

const Refund: React.FC = ({}) => {
  const searchOrderId = useSalesState(selectSearchOrderId);
  const setRefundOrderId = useSalesState(selectSetRefundOrderId);
  const { setItems } = useCart();

  const { useFetchOrder } = useOrders();

  const { data, error } = useFetchOrder(searchOrderId, {
    onSuccess: (data: any) => {
      const defaultitems = data[0]?.cart.map((item: any) => {
        return {
          id: item._id,
          code: item.product?.code,
          title: item.product?.title,
          price: item.price,
          quantity: item.quantity,
          itemTotal: item.price * item.quantity,
        };
      });

      setItems(defaultitems || []);
      setRefundOrderId(data[0]?._id);
    },
  });

  if (!data) return <>Loading...</>;

  return null;
};

export default Refund;
