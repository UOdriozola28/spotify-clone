import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "@icons/PlayerIcons.tsx";

function Player() {

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const audioRef = useRef()

  useEffect(() => {
    audioRef.current.src = `/music/1/01.mp3`
    audioRef.current.volume = 0.5
  }, [])

  const handleClick = () => {

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(prev => !prev)
  }

  const handleChangeVolume = (e) => {
    audioRef.current.volume = (e.target.value / 100)
  }

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>
        CurrentSong...
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2 cursor-pointer text-black" onClick={handleClick}>
            {
              isPlaying ? <Pause /> : <Play />
            }
          </button>
          <audio ref={audioRef} />

        </div>
      </div>
      <div className="grid place-content-center">
        <input type="range" onChange={(e) => handleChangeVolume(e)} />
      </div>


    </div>
  )
}

export default Player