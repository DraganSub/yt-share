import { createContext, useState, useContext } from "react";


const PlaylistContext = createContext(false);

export function PlaylistWrapper({ children }) {
  const [isPlaylistActive, setIsPlaylistActive] = useState(false);

  const ctxValue = {
    setIsPlaylistActive,
    isPlaylistActive
  }

  return <PlaylistContext.Provider value={ctxValue}>
    {children}
  </PlaylistContext.Provider>
}

export const usePlaylist = () => {
  const playlistCtx = useContext(PlaylistContext)

  const {
    setIsPlaylistActive,
    isPlaylistActive
  } = playlistCtx

  return {
    setIsPlaylistActive,
    isPlaylistActive
  }
}
