type DesktopCategoryCardProps = {
  image: string
  title: string
}

export function DesktopCategoryCard({ image, title }: DesktopCategoryCardProps) {
  return (
    <div className="relative rounded-lg overflow-hidden h-32 bg-[#004755] hover:opacity-90 transition-opacity cursor-pointer">
      <img
        src={image || "/placeholder.svg?height=150&width=200"}
        alt={title}
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-opacity-40 flex items-end">
        <div className="p-3 w-full">
          <h3 className="text-white font-semibold text-sm text-center">{title}</h3>
        </div>
      </div>
    </div>
  )
}
