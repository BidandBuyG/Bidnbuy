import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"


import { useReportProblem } from "@/hooks/useEscrowReportProblem"
import { usePhotoUpload } from "@/hooks/usePhotoUpload"

import EscrowReportProblemFormDesktop from "./EscrowReportProblemFormDesktop"
import EscrowReportProblemFormMobile from "./EscrowReportProblemFormMobile"
import { reportProblemSchema, type ReportProblemFormData } from "@/lib/validations/report-problem"
import { exploreEscrows } from "@/data/mockEscrowOrders"
import type { EscrowOrder } from "@/types/escrow"


const EscrowReportProblemForm = () =>{
  const navigate = useNavigate()
  const { orderId: paramOrderId } = useParams<{ orderId: string }>()
  const orderId = paramOrderId ?? "1"


  const escrowData = exploreEscrows.find((order: EscrowOrder) => order.id === orderId)
  if (!escrowData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#01151C] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the order you are looking for.</p>
          <button
            className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }
  
  const { isSubmitting, handleSubmit } = useReportProblem(orderId)
  const { uploadedPhotos, fileInputRef, triggerFileInput, handleFileChange, removePhoto } = usePhotoUpload()

 
  const form = useForm<ReportProblemFormData>({
    resolver: zodResolver(reportProblemSchema),
    defaultValues: {
      problem: "",
      additionalDetails: "",
      photos: [],
    },
  })

  const watchedProblem = form.watch("problem")
  const isFormValid = Boolean(watchedProblem)

  const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event)
    form.setValue("photos", uploadedPhotos)
  }

  const onSubmit = async (data: ReportProblemFormData) => {
    const formDataWithPhotos = { ...data, photos: uploadedPhotos }
    await handleSubmit(formDataWithPhotos)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const sharedReportProblemProps = {
    form,
    uploadedPhotos,
    fileInputRef,
    onUploadClick: triggerFileInput,
    onFileChange: onFileChangeHandler,
    onRemovePhoto: removePhoto,
    onCancel: handleCancel,
    isSubmitting,
    isFormValid,
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#01151C" }}>
   
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Report a problem</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <EscrowReportProblemFormMobile {...sharedReportProblemProps} />

            <EscrowReportProblemFormDesktop {...sharedReportProblemProps} />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EscrowReportProblemForm;