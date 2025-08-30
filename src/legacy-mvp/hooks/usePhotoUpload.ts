import type React from "react"
import { useState, useRef } from "react"
import { toast } from "sonner"

/**
 * Custom hook for handling photo upload functionality
 *
 * This hook manages:
 * - File input reference
 * - Uploaded photos state
 * - File selection and removal
 * - Toast notifications for upload feedback
 *
 * @returns Object containing photo state and handler functions
 */
export function usePhotoUpload() {
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  /**
   * Triggers the hidden file input click
   */
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  /**
   * Handles file selection from input
   * - Validates file types (images only)
   * - Updates state with new files
   * - Shows success toast
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    if (files.length > 0) {
      
      const imageFiles = files.filter((file) => file.type.startsWith("image/"))

      if (imageFiles.length !== files.length) {
        toast.warning("Only image files are allowed.")
      }

      if (imageFiles.length > 0) {
        setUploadedPhotos((prev) => [...prev, ...imageFiles])

        toast(`${imageFiles.length} photo(s) added successfully.`)
      }
    }

    if (event.target) {
      event.target.value = ""
    }
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  
  const clearAllPhotos = () => {
    setUploadedPhotos([])
  }

  return {
    uploadedPhotos,
    fileInputRef,
    triggerFileInput,
    handleFileChange,
    removePhoto,
    clearAllPhotos,
  }
}