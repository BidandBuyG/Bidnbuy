type FormActionsProps = {
  onCancel: () => void
  isSubmitting: boolean
  isFormValid: boolean
  isMobile?: boolean
}

/**
 * Form action buttons component
 *
 * Features:
 * - Cancel and Submit buttons
 * - Loading state with spinner
 * - Form validation state handling
 * - Consistent styling across devices
 *
 * @param onCancel - Handler for cancel button
 * @param isSubmitting - Whether form is currently submitting
 * @param isFormValid - Whether form has valid data
 * @param isMobile - Whether to use mobile styling
 */
export function FormActions({ onCancel, isSubmitting, isFormValid, isMobile = false }: FormActionsProps) {
  console.log('See isMobile:', isMobile)
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onCancel}
        className="w-full py-4 rounded-lg text-white font-medium border transition-all hover:bg-gray-800/20"
        style={{
          backgroundColor: "transparent",
          borderColor: "#00707B",
        }}
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full py-4 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2"
        style={{
          backgroundColor: isFormValid && !isSubmitting ? "#00707B" : "#374151",
          opacity: isFormValid && !isSubmitting ? 1 : 0.5,
        }}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  )
}
