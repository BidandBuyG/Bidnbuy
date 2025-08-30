type CountdownDisplayProps = {
  hours: number
  minutes: number
  seconds: number
  colorClass: string
}

const CountdownDisplay = ({ hours, minutes, seconds, colorClass}: CountdownDisplayProps) => {
  return (
    <div className="mt-2">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className={`text-xl font-bold ${colorClass}`}>{hours.toString().padStart(2, "0")}</div>
            <div className="text-xs text-gray-400">H</div>
          </div>
          <div className="text-white text-xl">:</div>
          <div className="text-center">
            <div className={`text-xl font-bold ${colorClass}`}>
              {minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-400">M</div>
          </div>
          <div className="text-white text-xl">:</div>
          <div className="text-center">
            <div className={`text-xl font-bold ${colorClass}`}>
              {seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-400">S</div>
          </div>
        </div>
      </div>
   
  )
}

export default CountdownDisplay