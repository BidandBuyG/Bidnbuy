// TODO: Fix data mapping once API schema aligns with Figma UI


import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { UploadProductFormField, UploadProductFormInput, UploadProductFormTextarea, UploadProductFormSelect, PriceInput } from "@/components/upload-product-form-field/UploadProductFormField"
import { FileUploader } from "@/components/file-uploader/FileUploader"
import { UploadSuccessMessage } from "@/components/upload-success-message/UploadSuccessMessage"
import { SearchInput } from "@/components/search-input/SearchInput"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"


type FormData = {
  itemName: string
  category: string
  condition: string
  description: string
  startingBidPrice: string
  buyItNowPrice: string
  reservePrice: string
  quantity: string
  deliveryType: string
  handlingTime: string
  length: string
  width: string
  height: string
  weight: string
  files: File[]
}

const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports" },
]

const deliveryOptions = [
  { value: "standard", label: "Standard Shipping" },
  { value: "express", label: "Express Shipping" },
  { value: "overnight", label: "Overnight Shipping" },
]

const handlingOptions = [
  { value: "1-day", label: "1 business day" },
  { value: "3-days", label: "3 business days" },
  { value: "5-days", label: "5 business days" },
  { value: "7-days", label: "7 business days" },
]

export default function VendorUploadProductForm() {
  // --- Step 0: State ---
  const [files, setFiles] = useState<File[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingData, setPendingData] = useState<FormData | null>(null)
  const navigate = useNavigate()

  // --- Step 0: Form Setup ---
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      condition: "new",
      deliveryType: "standard",
      handlingTime: "3-days",
    },
  })

  // Get token (adjust as needed for your auth)
  const userToken = localStorage.getItem("userToken") || ""

  // --- Step 1: Confirmation Modal Before Final Submission ---
  // onSubmit: open modal and store data
  const onSubmit = (data: FormData) => {
    setPendingData(data)
    setShowConfirm(true)
  }

  // --- Step 2: Actually submit to backend if confirmed ---
  const handleConfirm = () => {
    if (pendingData) handleFinalSubmit(pendingData)
  }

  // --- Step 3: Submit to backend, handle loading, errors, success, 401 ---
  const handleFinalSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "files" && value) {
          formData.append(key, value.toString())
        }
      })
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file)
      })
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${userToken}`
          // 'Content-Type' is NOT set for FormData
        },
        body: formData,
      })
      if (response.status === 401) {
        toast.error("Session expired. Please log in again.")
        navigate("/login")
        return
      }
      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to upload product.")
        return
      }
      toast.success("Product listed successfully!")
      setShowSuccess(true)
      reset()
      setFiles([])
      setTimeout(() => navigate("/seller-dashboard"), 1500)
    } catch (error) {
      toast.error("Submission error. Please try again.")
    } finally {
      setIsSubmitting(false)
      setShowConfirm(false)
      setPendingData(null)
    }
  }

  const description = watch("description", "")
  const maxChars = 2000

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles)
    setValue("files", newFiles)
  }

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#01151C] text-white">
    
      <div className="desktop-header hidden md:block">
       
        <div className="bg-[#01151C] px-4 py-4">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 xl:px-32 flex justify-center">
            <div className="relative max-w-md w-full">
              <SearchInput placeholder="Find everything you have been looking for" className="mb-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 pb-24 max-w-4xl mx-auto">
        <h1 className="text-lg md:text-xl font-medium mb-6 text-white mt-6">List a new item</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <UploadProductFormField label="Item name" error={errors.itemName?.message} required>
            <UploadProductFormInput
              {...register("itemName", {
                required: "Item name is required",
                minLength: { value: 3, message: "Item name must be at least 3 characters" },
              })}
              placeholder="e.g. What are you selling"
              error={!!errors.itemName}
            />
          </UploadProductFormField>

          <UploadProductFormField label="Category" error={errors.category?.message} required>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Please select a category" }}
              render={({ field }) => (
                <UploadProductFormSelect
                  placeholder="Select a category"
                  options={categoryOptions}
                  onValueChange={field.onChange}
                  error={!!errors.category}
                />
              )}
            />
          </UploadProductFormField>

          <UploadProductFormField label="Condition of your item" required>
            <Controller
              name="condition"
              control={control}
              rules={{ required: "Please select item condition" }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="md:flex md:gap-8 space-y-3 md:space-y-0"
                >
                  {[
                    { value: "new", label: "New" },
                    { value: "fairly-used", label: "Fairly Used" },
                    { value: "refurbished", label: "Refurbished" },
                    { value: "parts-not-working", label: "Some parts not working" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="border-[#00707B] text-white w-4 h-4 data-[state=checked]:bg-[#00707B] data-[state=checked]:border-[#00707B]"
                      />
                      <Label htmlFor={option.value} className="text-white text-sm font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </UploadProductFormField>

          <UploadProductFormField label="Item description" error={errors.description?.message} required>
            <div className="relative">
              <UploadProductFormTextarea
                {...register("description", {
                  required: "Item description is required",
                  minLength: { value: 10, message: "Description must be at least 10 characters" },
                  maxLength: { value: maxChars, message: `Description cannot exceed ${maxChars} characters` },
                })}
                placeholder="Describe your item in detail..."
                error={!!errors.description}
                maxLength={maxChars}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {maxChars - description.length} words maximum
              </div>
            </div>
          </UploadProductFormField>

          <UploadProductFormField label="Photos and Videos of your item" error={errors.files?.message}>
            <FileUploader
              onFilesChange={handleFilesChange}
              maxFiles={5}
              maxSizeInMB={2}
              error={errors.files?.message}
            />
          </UploadProductFormField>

          <div className="space-y-4">
            <h3 className="text-white text-sm font-normal">Pricing and Quantity</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UploadProductFormField label="Starting bid price" error={errors.startingBidPrice?.message} required>
                <Controller
                  name="startingBidPrice"
                  control={control}
                  rules={{
                    required: "Starting bid price is required",
                    pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Please enter a valid price" },
                    min: { value: 1, message: "Price must be at least ₦1" },
                  }}
                  render={({ field }) => (
                    <PriceInput
                      value={field.value || ""}
                      onChange={field.onChange}
                      error={!!errors.startingBidPrice}
                      placeholder="0.00"
                    />
                  )}
                />
              </UploadProductFormField>

              <UploadProductFormField label="Buy It Now (Optional)" error={errors.buyItNowPrice?.message}>
                <Controller
                  name="buyItNowPrice"
                  control={control}
                  rules={{
                    pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Please enter a valid price" },
                  }}
                  render={({ field }) => (
                    <PriceInput
                      value={field.value || ""}
                      onChange={field.onChange}
                      error={!!errors.buyItNowPrice}
                      placeholder="0.00"
                    />
                  )}
                />
              </UploadProductFormField>

              <UploadProductFormField label="Quantity" error={errors.quantity?.message} required>
                <UploadProductFormInput
                  {...register("quantity", {
                    required: "Quantity is required",
                    pattern: { value: /^\d+$/, message: "Please enter a valid quantity" },
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                  type="number"
                  min="1"
                  placeholder="1"
                  error={!!errors.quantity}
                />
              </UploadProductFormField>

              <UploadProductFormField label="Reserve price (Optional)" error={errors.reservePrice?.message}>
                <Controller
                  name="reservePrice"
                  control={control}
                  rules={{
                    pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Please enter a valid price" },
                  }}
                  render={({ field }) => (
                    <PriceInput
                      value={field.value || ""}
                      onChange={field.onChange}
                      error={!!errors.reservePrice}
                      placeholder="0.00"
                    />
                  )}
                />
              </UploadProductFormField>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-sm font-normal">Shipping</h3>

            <UploadProductFormField label="Category" error={errors.deliveryType?.message} required>
              <Controller
                name="deliveryType"
                control={control}
                rules={{ required: "Please select delivery type" }}
                render={({ field }) => (
                  <UploadProductFormSelect
                    placeholder="Standard Shipping"
                    options={deliveryOptions}
                    onValueChange={field.onChange}
                    error={!!errors.deliveryType}
                  />
                )}
              />
            </UploadProductFormField>

            <UploadProductFormField label="Handling Time" error={errors.handlingTime?.message} required>
              <Controller
                name="handlingTime"
                control={control}
                rules={{ required: "Please select handling time" }}
                render={({ field }) => (
                  <UploadProductFormSelect
                    placeholder="3 business days"
                    options={handlingOptions}
                    onValueChange={field.onChange}
                    error={!!errors.handlingTime}
                  />
                )}
              />
            </UploadProductFormField>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-sm font-normal">Weight and dimensions (Optional)</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "length", label: "Length", unit: "cm" },
                { name: "width", label: "Width", unit: "cm" },
                { name: "height", label: "Height", unit: "cm" },
                { name: "weight", label: "Weight", unit: "kg" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label className="text-white text-xs font-normal">{field.label}</Label>
                  <div className="flex">
                    <UploadProductFormInput
                      {...register(field.name as keyof FormData, {
                        pattern: { value: /^\d+(\.\d+)?$/, message: "Please enter a valid number" },
                      })}
                      type="number"
                      min="0"
                      step="0.1"
                      defaultValue="0"
                      className="rounded-r-none h-10 text-sm"
                    />
                    <div className="bg-[#01151C] border-[#00707B] border-l-0 px-3 py-2 text-gray-500 text-xs rounded-r flex items-center border">
                      {field.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00707B] hover:bg-[#005a66] text-white py-3 text-base font-medium h-12 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? "Listing Item..." : "List Item"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#00707B] text-white hover:bg-[#00707B]/10 py-3 text-base font-medium bg-[#01151C] h-12 rounded-md"
            >
              Preview
            </Button>
          </div>
        </form>
        {/* Confirmation Modal */}
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Listing</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to list this item for sale?</p>
            <DialogFooter>
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? "Listing..." : "Yes, List Item"}
              </Button>
              <Button variant="outline" onClick={() => setShowConfirm(false)} disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Success Message Modal */}
        {showSuccess && (
          <UploadSuccessMessage
            message="Your item has been successfully listed! It will be reviewed and published shortly."
            onClose={() => setShowSuccess(false)}
          />
        )}
      </div>
     
    </div>
  )
}
