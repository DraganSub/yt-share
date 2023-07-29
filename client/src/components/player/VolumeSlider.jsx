import { useEffect } from "react";

export default function VolumeSlider({ volume, setVolume, setIsMuted }) {
  const handleVolumeChange = (vol) => {
    const newVolume = parseFloat(vol);
    setIsMuted(false);
    if (newVolume * 100 < 1) {
      setIsMuted(true)
    }
    setVolume(newVolume);
    const element = document.getElementById("music-slider");
    element.style.setProperty("--before-width", `${volume * 100}% `);
  };

  useEffect(() => {
    handleVolumeChange(volume)
  }, [volume])

  return (
    <div class="slider">
      <input
        type="range"
        id="music-slider"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => handleVolumeChange(e.target.value)}
        className="volume-slider"
      />
    </div>
  );
};