import { allOrders } from "@/actions/Order";
import OrderTable from "@/components/Module/Dashboard/Admin/Table/OrderTable";
import React from "react";

const OrderManagePage = async () => {
  const { data } = await allOrders();

  return (
    <div>
      <OrderTable orders={data} />
    </div>
  );
};

export default OrderManagePage;
