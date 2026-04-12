type Role = "planner" | "provider" | "admin";

declare namespace Express {
  interface Request {
    validated?: {
      body?: any;
      query?: any;
      params?: any;
    };
    user?: { id: string; role: Role; isActive: boolean };
  }
}
