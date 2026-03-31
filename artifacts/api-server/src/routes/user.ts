import { Router, type IRouter, type Request, type Response } from "express";
import { db, projectsTable, leadsTable, favoritesTable, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/user/favorites", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  try {
    const favorites = await db
      .select({ project: projectsTable })
      .from(favoritesTable)
      .innerJoin(projectsTable, eq(favoritesTable.projectId, projectsTable.id))
      .where(eq(favoritesTable.userId, req.user!.id));
    
    res.json({ projects: favorites.map(f => f.project) });
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/inquiries", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  try {
    const inquiries = await db
      .select()
      .from(leadsTable)
      .where(eq(leadsTable.userId, req.user!.id))
      .orderBy(leadsTable.createdAt);
    
    res.json({ inquiries: inquiries.reverse() });
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/user/profile", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const { firstName, lastName } = req.body;

    if (firstName !== undefined && (typeof firstName !== "string" || firstName.length > 100)) {
      res.status(400).json({ error: "Invalid firstName: must be a string up to 100 characters" });
      return;
    }
    if (lastName !== undefined && (typeof lastName !== "string" || lastName.length > 100)) {
      res.status(400).json({ error: "Invalid lastName: must be a string up to 100 characters" });
      return;
    }

    const updateData: Record<string, any> = { updatedAt: new Date() };
    if (firstName !== undefined) updateData.firstName = firstName.trim();
    if (lastName !== undefined) updateData.lastName = lastName.trim();

    const [updated] = await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, req.user!.id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      id: updated.id,
      email: updated.email,
      firstName: updated.firstName,
      lastName: updated.lastName,
      profileImageUrl: updated.profileImageUrl,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/user/account", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = req.user!.id;

  try {
    await db.transaction(async (tx) => {
      await tx.delete(favoritesTable).where(eq(favoritesTable.userId, userId));
      await tx.update(leadsTable).set({ userId: null }).where(eq(leadsTable.userId, userId));
      await tx.delete(usersTable).where(eq(usersTable.id, userId));
    });

    if (req.session) {
      req.session.destroy(() => {});
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

export default router;
