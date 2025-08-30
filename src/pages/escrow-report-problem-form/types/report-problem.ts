export type ReportProblemProps = {
  form: any
  uploadedPhotos: File[]
  fileInputRef: any
  onUploadClick: () => void
  onFileChange: (event: any) => void
  onRemovePhoto: (index: number) => void
  onCancel: () => void
  isSubmitting: boolean
  isFormValid: boolean
}

