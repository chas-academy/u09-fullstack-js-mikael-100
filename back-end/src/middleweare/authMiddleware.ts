import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Definiera en typ för det anpassade Request-objektet
interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string; hospital: string }; // Definiera user-egenskapen
}

export const authenticateAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Hämta token från cookien

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Här tas token och den hemliga nyckeln (JWT_SECRET) tillsammans för att dekryptera och verifiera informationen som finns i JWT-tokenen
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
      hospital: string;
    };

    // Kontrollera om användaren är admin
    if (decoded.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have permission." });
    }

    // Sätt användarens ID i request-objektet
    req.user = {
      id: decoded.id,
      role: decoded.role,
      hospital: decoded.hospital,
    };
    next(); // Fortsätt till nästa middleware eller route handler
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

export const authenticateSuperAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Hämta token från cookien

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Här tas token och den hemliga nyckeln (JWT_SECRET) tillsammans för att dekryptera och verifiera informationen som finns i JWT-tokenen
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
      hospital: string;
    };

    // Kontrollera om användaren är admin
    if (decoded.role !== "Super Admin") {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have permission." });
    }

    // Sätt användarens ID i request-objektet
    req.user = {
      id: decoded.id,
      role: decoded.role,
      hospital: decoded.hospital,
    };
    next(); // Fortsätt till nästa middleware eller route handler
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

export const authenticateAdminSuperAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Hämta token från cookien

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Här tas token och den hemliga nyckeln (JWT_SECRET) tillsammans för att dekryptera och verifiera informationen som finns i JWT-tokenen
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
      hospital: string;
    };

    // Kontrollera om användaren är admin
    if (decoded.role !== "Super Admin" && decoded.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have permission." });
    }

    // Sätt användarens ID i request-objektet
    req.user = {
      id: decoded.id,
      role: decoded.role,
      hospital: decoded.hospital,
    };
    next(); // Fortsätt till nästa middleware eller route handler
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};
