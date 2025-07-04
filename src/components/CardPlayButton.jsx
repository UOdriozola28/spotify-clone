import { usePlayerStore } from "@/store/playerStore";
import { Pause, Play } from "@icons/PlayerIcons";
// import { getPlayListInfoById } from "@/services/ApiService";

function CardPlayButton({ id, size = 'small' }) {

  const {
    isPlaying,
    currentMusic,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  const handleClick = () => {

    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data
        setIsPlaying(true)
        setCurrentMusic({
          songs,
          playlist,
          song: songs[0]
        })
      })

    // setCurrentMusic({
    //   playlist: {
    //     id
    //   }
    // })
    // setIsPlaying(!isPlaying)
  }


  return (
    <button onClick={handleClick}
      className="card-play-button rounded-full text-black bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400">
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  )
}

export default CardPlayButton