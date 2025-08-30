export type ProblemOption = {
  id: string
  label: string
}

export const PROBLEM_OPTIONS: ProblemOption[] = [
  { id: "fake", label: "Fake Item" },
  { id: "inappropriate", label: "Inappropriate Content" },
  { id: "spam", label: "Spam" },
  { id: "other", label: "Other" },
]

export type ReportProblemResponse = {
  success: boolean
  message: string
  reportId?: string
}