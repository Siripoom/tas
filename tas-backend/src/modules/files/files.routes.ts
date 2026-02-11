import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { listFilesQuerySchema, uploadFileBodySchema } from "./files.schema";
import { deleteFile, downloadFile, listFiles, uploadEvidenceFile } from "./files.service";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.use(authMiddleware);

router.get("/", validateQuery(listFilesQuerySchema), async (req, res, next) => {
  try {
    const files = await listFiles(req.user!, req.query as any);
    res.json(files);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/upload",
  upload.single("file"),
  validateBody(uploadFileBodySchema),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          code: "400_VALIDATION_ERROR",
          message: "file is required",
        });
      }

      const saved = await uploadEvidenceFile({
        actor: req.user!,
        ownerType: req.body.ownerType,
        ownerId: req.body.ownerId,
        file: req.file,
      });

      return res.status(201).json(saved);
    } catch (error) {
      return next(error);
    }
  },
);

router.get("/:id/download", async (req, res, next) => {
  try {
    const { file, stream } = await downloadFile(req.params.id);
    res.setHeader("Content-Type", file.mimeType);
    res.setHeader("Content-Disposition", `attachment; filename=\"${encodeURIComponent(file.originalName)}\"`);
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteFile(req.user!, req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router as filesRoutes };
