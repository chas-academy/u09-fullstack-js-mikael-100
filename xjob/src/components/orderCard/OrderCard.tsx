import React from "react";
import { Button } from "../button/button";

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
          {order.Orders.map((o) => (
            <div className="text-center text-sm mt-3 mb-10" key={o._id}>
              <hr className="bg-black" />
              <p className="mt-10">{o.dish}</p>
              <div className="flex justify-center space-x-1 mt-1">
                <p className="font-bold">Antal:</p>
                <p>{o.amount}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center justify-between">
          <Button type="" appliedColorClass="blue" appliedSizeClass="medium">
            Skriv Ut
          </Button>
          <Button type="" appliedColorClass="green" appliedSizeClass="medium">
            Skickad
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneralCard;
