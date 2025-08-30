import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import type { Control } from "react-hook-form"
import type { ReportProblemFormData } from "@/lib/validations/report-problem"

interface AdditionalDetailsInputProps {
  control: Control<ReportProblemFormData>
  isMobile?: boolean
}

/**
 * Additional details textarea component
 *
 * Features:
 * - Responsive height based on device type
 * - Consistent styling with form theme
 * - Optional field with placeholder text
 *
 * @param control - React Hook Form control object
 * @param isMobile - Whether to use mobile styling
 */
export function AdditionalDetailsInput({ control, isMobile = false }: AdditionalDetailsInputProps) {
  const height = isMobile ? "h-32" : "h-40"

  return (
    <FormField
      control={control}
      name="additionalDetails"
      render={({ field }) => (
        <FormItem className={isMobile ? "mb-6" : "mb-8"}>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Additional details (optional)"
              className={`w-full ${height} p-4 rounded-lg border text-white placeholder-gray-400 resize-none bg-transparent`}
              style={{
                borderColor: "#00707B",
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
