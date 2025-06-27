import { useEffect, useRef } from "react"
import { Pause, Play } from "@icons/PlayerIcons.tsx";
import { usePlayerStore } from "@/store/playerStore";
import PlayerVolumeControl from "./PlayerVolumeContro";
import PlayerSoundControl from "./PlayerSoundControl";
import { PlayerCurrentSong } from "./PlayerCurrentSong";

function Player() {

  const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(state => state)
  const audioRef = useRef()

  useEffect(() => {
    if (!currentMusic.song) {
      return;
    }
    isPlaying ? play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song) {
      audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
      play();
    }
  }, [currentMusic])

  const play = () => {
    audioRef.current.play()
      .catch((e) => console.log('error playing: ', e))
  }

  const handleClick = () => {
    if (!currentMusic.song) return
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex flex-row justify-between w-full  z-50">
      <div className="w-[280px]">
        <PlayerCurrentSong {...currentMusic.song} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <button className="bg-white rounded-full p-2 cursor-pointer text-black" onClick={handleClick}>
            {
              isPlaying ? <Pause /> : <Play />
            }
          </button>
          <PlayerSoundControl audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>
      <div className="grid place-content-center px-2">
        <PlayerVolumeControl />
      </div>
    </div>
  )
}

export default Player