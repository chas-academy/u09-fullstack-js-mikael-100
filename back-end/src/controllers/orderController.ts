import { Request, Response } from "express";
import Order from "../models/Order";

// Hämta alla Order
interface OrderQuery {
  Status: string;
  Hospital?: string;
}

export const getAllOrders = async (req: Request, res: Response) => {
  const Status = req.query.Status;
  const { Hospital } = req.query;

  try {
    const query: OrderQuery = {
      Hospital: "",
      Status: "",
    };

    // Typkontroll och hantering av Hospital
    if (typeof Hospital === "string") {
      query.Hospital = decodeURIComponent(Hospital); // Dekoda strängen om nödvändigt
    }

    // Kontrollera Status
    if (Status === "Approved") {
      query.Status = Status; // Sök efter ordrar med status "Approved"
    } else if (Status === "pending") {
      query.Status = Status; // Sök efter ordrar med status "pending" om Status är tom
    }

    const order = await Order.find(query);
    console.log("Query sent to database:", query); // Logga den skickade frågan
    console.log("Found Orders:", order); // Logga de hittade beställningarna
    res.json(order); // Skicka tillbaka ordrarna som JSON
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

// export const getAllOrders = async (req: Request, res: Response) => {
//   const Status = req.query.Status;

//   console.log("sss", Status);
//   try {
//     const query: OrderQuery = {
//       Status: "pending",
//       Hospital: "",
//     };

//     const { Hospital, Status } = req.query;

//     // Typkontroll och hantering av Hospital
//     if (typeof Hospital === "string") {
//       // Kontrollera att det är en sträng
//       query.Hospital = decodeURIComponent(Hospital); // Dekoda strängen om nödvändigt
//     }

//     // // Typkontroll och hantering av Hospital
//     if (Status === "Approved") {
//       // Kontrollera att det är en sträng
//       query.Status = decodeURIComponent(Status); // Dekoda strängen om nödvändigt
//     }

//     const order = await Order.find(query);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: (error as any).message });
//   }
// };

// export const getAllOrders = async (req: Request, res: Response) => {
//   const Status = req.query.Status;

//   const { Hospital } = req.query;

//   try {
//     const query: OrderQuery = {
//       Status: "pending",
//       Hospital: "",
//     };

//     // Typkontroll och hantering av Hospital
//     if (typeof Hospital === "string") {
//       // Kontrollera att det är en sträng
//       query.Hospital = decodeURIComponent(Hospital); // Dekoda strängen om nödvändigt
//     }

//     // // Typkontroll och hantering av Hospital
//     if (Status === "Approved") {
//       // Kontrollera att det är en sträng
//       query.Status = Status;
//     }

//     const order = await Order.find(query);
//     console.log("Query sent to database:", query); // Logga den skickade frågan
//     console.log("Found Orders:", order); // Logga de hittade beställningarna    res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: (error as any).message });
//   }
// };

// Hämta en specifik Order

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error as any });
  }
};

// Skapa en Order

export const createOrder = async (req: Request, res: Response) => {
  const { Hospital, FirstName, LastName, PhoneNumber, Department, Orders } =
    req.body;

  // Validera indata (kan justeras beroende på dina krav)
  if (
    !Hospital ||
    !FirstName ||
    !LastName ||
    !PhoneNumber ||
    !Department ||
    !Orders
  ) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  const order = new Order({
    Hospital,
    FirstName,
    LastName,
    PhoneNumber,
    Department,
    Orders,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json({
      message: "A new order has been created",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error); // Logga felet för debugging
    res.status(500).json({
      message: "Something went wrong, please try again",
      error: error instanceof Error ? error.message : "Unknown error", // Mer specifik felmeddelande
    });
  }
};

// Uppdatera Order

export const updateOrder = async (req: Request, res: Response) => {
  const id = req.params.id; // Hämta ID från params
  const { Status } = req.body; // Hämta status från request body
  console.log("Order ID:", id);
  console.log("New Status:", Status);

  try {
    // Använd findByIdAndUpdate för att uppdatera Status direkt
    const updatedOrder = await Order.findByIdAndUpdate(
      id, // Använd ID direkt för att söka efter ordern
      { $set: { Status } }, // Använd $set för att uppdatera Status
      { new: true } // Returnera den uppdaterade ordern
    );

    if (!updatedOrder) {
      console.log("No order found with the provided ID");
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json(updatedOrder); // Returnera den uppdaterade ordern
  } catch (error) {
    return res.status(500).json({ message: error }); // Använd felmeddelandet för mer information
  }
};

// Ta bort en Order

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deleteOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order Deleted" });
  } catch (error) {
    res.status(500).json({ message: error as any });
  }
};
