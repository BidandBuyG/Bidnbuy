import type React from "react"

import { useState, useCallback } from "react"
import { ImageIcon, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

type FileUploaderProps = {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  maxSizeInMB?: number
  acceptedTypes?: string[]
  error?: string
}

export function FileUploader({
  onFilesChange,
  maxFiles = 5,
  maxSizeInMB = 2,
  acceptedTypes = ["image/*", "video/*"],
  error,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState<string>("")

  const validateFile = (file: File): string | null => {
    if (file.size > maxSizeInMB * 1024 * 1024) {
      return `File ${file.name} is too large. Maximum size is ${maxSizeInMB}MB.`
    }

    const isValidType = acceptedTypes.some((type) => {
      if (type.endsWith("/*")) {
        return file.type.startsWith(type.replace("/*", "/"))
      }
      return file.type === type
    })

    if (!isValidType) {
      return `File ${file.name} is not a supported format.`
    }

    return null
  }

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles)
      const validFiles: File[] = []
      let errorMessage = ""

      for (const file of fileArray) {
        if (files.length + validFiles.length >= maxFiles) {
          errorMessage = `Maximum ${maxFiles} files allowed.`
          break
        }

        const validationError = validateFile(file)
        if (validationError) {
          errorMessage = validationError
          break
        }

        validFiles.push(file)
      }

      if (errorMessage) {
        setUploadError(errorMessage)
        return
      }

      setUploadError("")
      const updatedFiles = [...files, ...validFiles]
      setFiles(updatedFiles)
      onFilesChange(updatedFiles)
    },
    [files, maxFiles, maxSizeInMB, onFilesChange],
  )

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-500">
        {files.length}/{maxFiles}
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center bg-[#01151C] transition-colors ${
          dragActive ? "border-[#00707B] bg-[#00707B]/10" : "border-[#00707B]"
        } ${error || uploadError ? "border-red-400" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-12 h-12 mx-auto mb-3 border-2 border-[#00707B] rounded flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-[#00707B]" />
        </div>
        <p className="text-white text-sm mb-1">Drag and drop or Click to upload</p>
        <p className="text-xs text-gray-500 mb-4">Max. 3 photos and 2 videos (Max {maxSizeInMB}MB each)</p>

        <input
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            type="button"
            className="bg-[#00707B] hover:bg-[#005a66] text-white px-6 py-2 text-sm rounded-md cursor-pointer"
            asChild
          >
            <span>
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </span>
          </Button>
        </label>
      </div>

      {(error || uploadError) && <p className="text-red-400 text-xs">{error || uploadError}</p>}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <div className="border border-[#00707B] rounded-lg p-3 bg-[#01151C]">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={file.name}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                ) : (
                  <div className="w-full h-20 bg-[#00707B]/20 rounded mb-2 flex items-center justify-center">
                    <span className="text-xs text-gray-400">Video</span>
                  </div>
                )}
                <p className="text-xs text-white truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
