import React from "react";

interface OrderArray {
  dish: string;
  amount: number;
  _id: string;
}

// Gör om och gör klart en generell komonent som får fram alla ordrar

interface Orders {
  Department: string;
  FirstName: string;
  LastName: string;
  Hospital: string;
  PhoneNumber: string;
  createdAt: string;
  Orders: OrderArray[];
  _id: string;
  OrderApprovedBy: string;
}

interface orderProp {
  order: Orders;
}
const GeneralCard: React.FC<orderProp> = ({ order }) => {
  return (
    <div className="flex justify-center mb-5">
      <div className="border p-4 rounded-md shadow-md font-roboto w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%]">
        <div className="font-bold text-center text-xl">
          <h1>{order.Department}</h1>
        </div>
        <div className="text-center mt-3">
          <p className="text-base font-bold">Beställare:</p>
          <div className="text-sm">
            <div className="flex justify-center space-x-2">
              <p className="mt-1">{order.FirstName}</p>
              <p className="mt-1">{order.LastName}</p>
            </div>
            <p>{order.PhoneNumber}</p>
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-center font-bold">Beställning:</h1>
          {order.Orders.map((o) => {
            return (
              <div key={o._id}>
                <div className="text-center text-sm mt-3 mb-10">
                  <hr className="bg-black" />
                  <p className="mt-10">{o.dish}</p>
                  <div className="flex justify-center space-x-1 mt-1">
                    <p className="font-bold">Antal:</p>
                    <p>{o.amount}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <hr className="bg-black" />
          <div className="mt-10 mb-7">
            <p className="text-center font-bold">Order godkänd av:</p>
            <p className="text-center mt-2">{order.OrderApprovedBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralCard;
