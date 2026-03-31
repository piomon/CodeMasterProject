import { Router, type IRouter, type Request, type Response } from "express";
import { db, projectsTable, favoritesTable } from "@workspace/db";
import { eq, ilike, or, and } from "drizzle-orm";

const router: IRouter = Router();

router.get("/projects", async (req: Request, res: Response) => {
  const { category, search } = req.query;
  
  let query = db.select().from(projectsTable);
  
  if (search && typeof search === "string") {
    query = query.where(
      or(
        ilike(projectsTable.name, `%${search}%`),
        ilike(projectsTable.description, `%${search}%`),
        ilike(projectsTable.industry, `%${search}%`)
      )
    ) as typeof query;
  } else if (category && typeof category === "string" && category !== "all") {
    query = query.where(eq(projectsTable.category, category)) as typeof query;
  }
  
  const projects = await query.orderBy(projectsTable.sortOrder, projectsTable.createdAt);
  res.json({ projects });
});

router.get("/projects/:id", async (req: Request, res: Response) => {
  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, req.params.id));
  
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  
  res.json(project);
});

router.post("/projects", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const { name, category, industry, description, features, status, featured, thumbnailUrl, demoUrl, technologies } = req.body;
  
  const [project] = await db.insert(projectsTable).values({
    id: crypto.randomUUID(),
    name,
    category,
    industry,
    description,
    features: features || [],
    status: status || "demo",
    featured: featured || false,
    thumbnailUrl: thumbnailUrl || null,
    demoUrl: demoUrl || null,
    technologies: technologies || [],
  }).returning();
  
  res.status(201).json(project);
});

router.put("/projects/:id", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const { name, category, industry, description, features, status, featured, thumbnailUrl, demoUrl, technologies } = req.body;
  
  const [project] = await db
    .update(projectsTable)
    .set({
      name,
      category,
      industry,
      description,
      features: features || [],
      status,
      featured: featured || false,
      thumbnailUrl: thumbnailUrl || null,
      demoUrl: demoUrl || null,
      technologies: technologies || [],
      updatedAt: new Date(),
    })
    .where(eq(projectsTable.id, req.params.id))
    .returning();
  
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  
  res.json(project);
});

router.delete("/projects/:id", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  await db.delete(projectsTable).where(eq(projectsTable.id, req.params.id));
  res.json({ success: true });
});

router.post("/projects/:id/favorite", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const { favoritesTable } = await import("@workspace/db");
  const { and } = await import("drizzle-orm");
  
  const existing = await db
    .select()
    .from(favoritesTable)
    .where(
      and(
        eq(favoritesTable.userId, req.user!.id),
        eq(favoritesTable.projectId, req.params.id)
      )
    );
  
  if (existing.length > 0) {
    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, req.user!.id),
          eq(favoritesTable.projectId, req.params.id)
        )
      );
    res.json({ favorited: false });
  } else {
    await db.insert(favoritesTable).values({
      userId: req.user!.id,
      projectId: req.params.id,
    });
    res.json({ favorited: true });
  }
});

export default router;
