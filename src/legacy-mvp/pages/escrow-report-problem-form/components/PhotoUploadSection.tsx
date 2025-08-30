import type React from "react"
import type { RefObject } from "react"

import { Button } from "@/components/ui/button"

import AddPhotoIconSvg from "@/assets/escrow/add-photo-icon.svg"

interface PhotoUploadSectionProps {
  uploadedPhotos: File[]
  fileInputRef: RefObject<HTMLInputElement>
  onUploadClick: () => void
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemovePhoto: (index: number) => void
  isMobile?: boolean
}

/**
 * Photo upload section component
 *
 * Features:
 * - Drag and drop area with upload button
 * - Photo preview grid with remove functionality
 * - Responsive layout for mobile/desktop
 * - File type validation (images only)
 *
 * @param uploadedPhotos - Array of uploaded File objects
 * @param fileInputRef - Reference to hidden file input
 * @param onUploadClick - Handler for upload button click
 * @param onFileChange - Handler for file input change
 * @param onRemovePhoto - Handler for removing a photo
 * @param isMobile - Whether to use mobile styling
 */

export function PhotoUploadSection({
  uploadedPhotos,
  fileInputRef,
  onUploadClick,
  onFileChange,
  onRemovePhoto,
  isMobile = false,
}: PhotoUploadSectionProps) {
  const titleSize = isMobile ? "text-base" : "text-lg"
  const padding = isMobile ? "p-8" : "p-12"
  const iconSize = isMobile ? { width: 21, height: 21 } : { width: 21, height: 21 }
  const buttonPadding = isMobile ? "px-6 py-2" : "px-8 py-3"
  const gridCols = isMobile ? "grid-cols-2" : "grid-cols-4"
  const photoHeight = isMobile ? "h-24" : "h-32"

  return (
    <div className={isMobile ? "mb-8" : "mb-12"}>
      <h3 className={`${titleSize} font-medium ${isMobile ? "mb-4" : "mb-6"}`}>Photos of the item</h3>

  
      <div
        className={`border-2 border-dashed rounded-lg ${padding} text-center cursor-pointer hover:bg-gray-800/20 transition-colors`}
        style={{ borderColor: "#00707B" }}
        onClick={onUploadClick}
      >
        <img
          src={AddPhotoIconSvg}
          alt="Add Photos"
          {...iconSize}
          className={`mx-auto ${isMobile ? "mb-3" : "mb-4"}`}
        />
        <p className={`text-white font-medium mb-2 ${isMobile ? "" : "text-lg"}`}>Add Photos</p>
        <p className={`text-gray-400 ${isMobile ? "text-sm mb-4" : "mb-6"}`}>
          Add photos to help us understand the problem
        </p>
        <Button
          type="button"
          onClick={onUploadClick}
          className={`${buttonPadding} rounded-lg text-white font-medium`}
          style={{ backgroundColor: "#00707B" }}
        >
          Upload
        </Button>
      </div>

      <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={onFileChange} className="hidden" />


      {uploadedPhotos.length > 0 && (
        <div className={`${isMobile ? "mt-4" : "mt-6"} grid ${gridCols} gap-${isMobile ? "2" : "4"}`}>
          {uploadedPhotos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(photo) || "/placeholder.svg"}
                alt={`Upload ${index + 1}`}
                className={`w-full ${photoHeight} object-cover rounded-lg`}
              />
              <button
                type="button"
                onClick={() => onRemovePhoto(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                aria-label={`Remove photo ${index + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
