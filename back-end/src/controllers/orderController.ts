import { Request, Response } from "express";
import Order from "../models/Order";
import nodemailer from "nodemailer";

// Hämta alla Order
interface OrderQuery {
  Status: string | string[];
  Hospital?: string;
}

export const getAllOrders = async (req: Request, res: Response) => {
  const Status = req.query.Status;
  const { Hospital, StartDate, EndDate } = req.query;

  console.log("Hospital:", Hospital);
  console.log("Status:", Status);
  console.log("StartDate:", StartDate);
  console.log("EndDate:", EndDate);

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

    if (!Status) {
      query.Status = ["Approved", "Pending"];
    }

    // Denna if söker efter valda datum från allmenackan på statestiksidan
    // För att få fram rätt data skickas datum och hospital in för att få fram rätt ordrar från rätt sjukhus vis rätt tid
    if (
      typeof StartDate === "string" &&
      typeof EndDate === "string" &&
      typeof Hospital === "string"
    ) {
      const decodedHospital = decodeURIComponent(Hospital); // Dekoda strängen om nödvändigt

      // Här omvandlas datumen jag skickar från front end till samma format som createdAt i databasen för att kunna göra sökning
      // Det är viktigt att datumsträngen följer ett giltigt format (t.ex. ISO 8601). Om StartDate eller EndDate inte är i ett korrekt format kan det leda till ogiltiga datum.
      const startDate = new Date(StartDate);
      const endDate = new Date(EndDate);

      const orders = await Order.find({
        // Här deffineras createdAt för att söka från rätt rad i databasen
        createdAt: {
          // $gte (greater than or equal to) och $lt (less than) används tillsammans i query för att skapa ett intervall
          $gte: startDate,
          // Genom att lägga till 86400000 (antalet millisekunder i en dag) till endDate (t.ex. "2024-10-03") får du ett datum som representerar midnatt den 4 oktober.
          // så detta är bara att ta de endatet som kommer in och göra så att det blir midnatt på de endatet
          $lt: new Date(endDate.getTime() + 86400000),
        },
        // Hospital skickas med i denna queri för att enbart få försäljningen på det sjukhus som användaren loggar in ifrån
        Hospital: decodedHospital, // Inkludera dekodad Hospital i frågan
      });
      console.log("detta hittades", orders);
      return res.json(orders);
    }

    const order = await Order.find(query);

    console.log("Query sent to database:", query); // Logga den skickade frågan
    console.log("Found Orders:", order); // Logga de hittade beställningarna
    res.json(order); // Skicka tillbaka ordrarna som JSON
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

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

// Innan Create Order så skapar jag en transport-konfiguration för nodemailer som kan skicka mail till kund

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp-Connection.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "SkaraborgsSjukhus@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

// Skapa en Order

export const createOrder = async (req: Request, res: Response) => {
  const {
    Hospital,
    FirstName,
    LastName,
    PhoneNumber,
    Department,
    Orders,
    Mail,
    TotalSum,
  } = req.body;

  // Validera indata
  if (
    !Hospital ||
    !FirstName ||
    !LastName ||
    !PhoneNumber ||
    !Department ||
    !Orders ||
    !Mail ||
    !TotalSum
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
    Mail,
    Department,
    Orders,
    TotalSum,
  });

  try {
    const newOrder = await order.save();

    // Skapa ordersString genom att mappa över varje order
    // const ordersString = Orders.map((order: string, index: number) =>`Order ${index + 1}: ${order.dish} - Amount: ${order.amount}`).join("\n");

    const ordersString = Orders.map(
      (order: { dish: string; amount: number }, index: number) => {
        return `Order ${index + 1}: ${order.dish} - Antal: ${order.amount}`;
      }
    ).join("\n");

    // Skicka Mail

    await transporter.sendMail({
      from: process.env.MAIL_MAIL,
      to: Mail,
      subject: `Hej ${FirstName} ${LastName}, Här kommer din Orderbekräftelse från Skaraborgs Sjukhus\n`,
      text:
        `Hej ${FirstName} ${LastName} Här kommer din orderbekräftelse från ${Hospital}:\n` +
        `Din beställning kommer att levereras till ${Department}\n\n` +
        `Din beställning består av:\n` +
        `${ordersString}\n\n` +
        `Total summa: ${TotalSum}:-`,
    });

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
  // console.log("Order ID:", id);
  // console.log("New Status:", Status);

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
  } catch (error: any) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Internal server error" });
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
