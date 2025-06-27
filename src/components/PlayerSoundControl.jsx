import { useEffect, useState } from "react";
import { Slider } from "./ui/slider";

function PlayerSoundControl({ audio }) {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime)
  }

  const formatTime = time => {
    if (time == null) return `0:00`

    // redondear (la extracción del resto del time. Ejem: 182.6 -> 6.03423)
    const seconds = Math.floor(time % 60)
    // redondear (la extracción de la división del time entr 60. Ejem: 182.6 -> 3.0321 ya que 60+60+60)
    const minutes = Math.floor(time / 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const duration = audio?.current?.duration ?? 0

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>

      <Slider
        value={[currentTime]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-[400px] cursor-pointer"
        onValueChange={(value) => {
          const [newCurrentTime] = value
          audio.current.currentTime = newCurrentTime
        }}
      />

      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}

export default PlayerSoundControl;