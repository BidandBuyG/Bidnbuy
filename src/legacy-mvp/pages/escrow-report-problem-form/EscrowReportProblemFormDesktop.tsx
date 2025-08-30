import { ProblemSelector } from "./components/ProblemSelector"
import { AdditionalDetailsInput } from "./components/AddiitionalDetailsInput"
import { PhotoUploadSection } from "./components/PhotoUploadSection"
import { FormActions } from "./components/FormActions"

import type { ReportProblemProps } from "./types/report-problem"


const EscrowReportProblemFormDesktop = ({
  form,
  uploadedPhotos,
  fileInputRef,
  onUploadClick,
  onFileChange,
  onRemovePhoto,
  onCancel,
  isSubmitting,
  isFormValid
}: ReportProblemProps) => {
  return (
    <div className="hidden lg:block">
      <ProblemSelector control={form.control} />
      <AdditionalDetailsInput control={form.control} />
      <PhotoUploadSection
        uploadedPhotos={uploadedPhotos}
        fileInputRef={fileInputRef}
        onUploadClick={onUploadClick}
        onFileChange={onFileChange}
        onRemovePhoto={onRemovePhoto}
      />
      <FormActions 
        onCancel={onCancel} 
        isSubmitting={isSubmitting} 
        isFormValid={isFormValid} 
      />
    </div>
  )
}

export default EscrowReportProblemFormDesktop