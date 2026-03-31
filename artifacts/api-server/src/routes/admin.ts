import { Router, type IRouter, type Request, type Response } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: Request, res: Response): boolean {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.get("/admin/users", async (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;
  
  const users = await db.select().from(usersTable).orderBy(usersTable.createdAt);
  res.json({ users: users.reverse() });
});

router.put("/admin/users/:id/role", async (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;
  
  const { role } = req.body;
  
  if (!["user", "admin"].includes(role)) {
    res.status(400).json({ error: "Invalid role" });
    return;
  }
  
  const [user] = await db
    .update(usersTable)
    .set({ role, updatedAt: new Date() })
    .where(eq(usersTable.id, req.params.id))
    .returning();
  
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  
  res.json(user);
});

export default router;
