"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { PROBLEM_OPTIONS } from "@/lib/types/problem-report"
import type { Control } from "react-hook-form"
import type { ReportProblemFormData } from "@/lib/validations/report-problem"

interface ProblemSelectorProps {
  control: Control<ReportProblemFormData>
  isMobile?: boolean
}

/**
 * Problem selection component with radio buttons
 *
 * Features:
 * - Radio button group for problem types
 * - Visual feedback for selected option
 * - Responsive design for mobile/desktop
 * - Form validation integration
 *
 * @param control - React Hook Form control object
 * @param isMobile - Whether to use mobile styling
 */
export function ProblemSelector({ control, isMobile = false }: ProblemSelectorProps) {
  const titleSize = isMobile ? "text-base" : "text-lg"
  const spacing = isMobile ? "mb-4" : "mb-6"

  return (
    <FormField
      control={control}
      name="problem"
      render={({ field }) => (
        <FormItem className={isMobile ? "mb-6" : "mb-6"}>
          <h2 className={`${titleSize} font-medium ${spacing}`}>
            {isMobile ? "What is the problem with the item?" : "What is the problem with this item?"}
          </h2>
          <FormControl>
            <div className={isMobile ? "space-y-3" : "space-y-4"}>
              {PROBLEM_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-800/10"
                  style={{
                    borderColor: "#00707B",
                    backgroundColor: field.value === option.id ? "rgba(0, 112, 123, 0.1)" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    value={option.id}
                    checked={field.value === option.id}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${isMobile ? "mr-3" : "mr-4"} flex items-center justify-center`}
                    style={{
                      borderColor: field.value === option.id ? "#00707B" : "#6B7280",
                    }}
                  >
                    {field.value === option.id && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#00707B" }}></div>
                    )}
                  </div>
                  <span className={`text-white ${isMobile ? "" : "text-base"}`}>{option.label}</span>
                </label>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
