import { z } from 'zod';

export const reportProblemSchema = z.object({
  problem: z.string().min(1, "Please select a problem type"),
  additionalDetails: z.string().optional(),
  photos: z.array(z.instanceof(File)).optional(),
})

export type ReportProblemFormData = z.infer<typeof reportProblemSchema>
