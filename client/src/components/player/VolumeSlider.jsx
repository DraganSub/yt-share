export default function VolumeSlider({ volume, setVolume, setIsMuted }) {
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setIsMuted(false);
    if (newVolume * 100 < 1) {
      setIsMuted(true)
    }
    setVolume(newVolume);
    const element = document.getElementById("music-slider");
    element.style.setProperty("--before-width", `${volume * 100}% `);
  };

  return (
    <div class="slider">
      <input
        type="range"
        id="music-slider"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
    </div>
  );
};