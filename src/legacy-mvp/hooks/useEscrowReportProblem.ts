import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import type { ReportProblemResponse } from "@/lib/types/problem-report"

import type { ReportProblemFormData } from "@/lib/validations/report-problem"

/**
 * Custom hook for handling problem reporting logic
 *
 * This hook encapsulates:
 * - Form submission state management
 * - API call simulation
 * - Toast notifications
 * - Navigation after successful submission
 *
 * @param orderId - The order ID for the problem report
 * @returns Object containing submission state and handler function
 */

export function useReportProblem(orderId: string) {
  console.log('Find the real order id:', orderId)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  
  const submitProblemReport = async (data: ReportProblemFormData): Promise<ReportProblemResponse> => {
    console.log('Submit Problem Report', data)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    
    const success = Math.random() > 0.1 

    if (!success) {
      throw new Error("Submission failed")
    }

    return {
      success: true,
      message: "Problem reported successfully",
      reportId: `RPT-${Date.now()}`,
    }
  }

  /**
   * Handles the form submission process
   * - Sets loading state
   * - Calls API
   * - Shows appropriate toast messages
   * - Redirects on success
   */
  const handleSubmit = async (data: ReportProblemFormData) => {
    setIsSubmitting(true)

    try {
      const response = await submitProblemReport(data)

      console.log("Problem report response:", response)
    
      toast("Our team will contact you shortly to resolve this issue.")

      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (error) {

      toast("There was an error reporting your problem. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    handleSubmit,
  }
}