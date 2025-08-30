import { CheckCircle } from "lucide-react"

type UploadSuccessMessageProps = {
  message: string
  onClose: () => void
}

export function UploadSuccessMessage({ message, onClose }: UploadSuccessMessageProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#01151C] border border-[#00707B] rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-white font-medium">Success!</h3>
        </div>
        <p className="text-gray-300 mb-4">{message}</p>
        <button onClick={onClose} className="w-full bg-[#00707B] hover:bg-[#005a66] text-white py-2 px-4 rounded-md">
          Close
        </button>
      </div>
    </div>
  )
}
