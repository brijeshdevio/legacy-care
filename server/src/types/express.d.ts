type Role = "planner" | "provider" | "admin";

declare namespace Express {
  interface Request {
    user?: { id: string; role: Role; isActive: boolean };
  }
}
