import { VolumeFull, VolumeLow, VolumeMedium, VolumeSilenced } from "@/Icons/VolumeIcons"
import { usePlayerStore } from "@/store/playerStore"

const isVolumeSilenced = (loud) => loud < 0.01
const isVolumeLow = (loud) => loud >= 0.01 && loud < 0.5
const isVolumeMedium = (loud) => loud >= 0.5 && loud < 0.9
const isVolumeFull = (loud) => loud >= 0.9

const getVolumeIconByLouder = (loud) => {
  return (
    <>
      {isVolumeSilenced(loud) && <VolumeSilenced />}
      {isVolumeLow(loud) && <VolumeLow />}
      {isVolumeMedium(loud) && <VolumeMedium />}
      {isVolumeFull(loud) && <VolumeFull />}
    </>
  )
}

function PlayerVolumeIconComponent() {
  const volume = usePlayerStore(state => state.volume)
  return getVolumeIconByLouder(volume)
}

export default PlayerVolumeIconComponent;