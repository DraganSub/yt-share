import React from "react";
import { pushData } from "../../db";
import { trimVideoTxt } from "../../utils";
import { MusicWave } from "../common"
export default function PlaylistItemCard({ playlist }) {

    const addToListOfPlaylists = async () => {
        const playlistObject = {
            isPlaylistActive: false,
            playListTitle: playlist.playlistTitle,
            playlistId: playlist.playlistId,
            playlistImg: playlist.thumbnailUrl
        }
        await pushData("youtubeData/playListList", playlistObject)
    }

    return < div className="pos-rel play-hov" >
        <div key={playlist.playlistId} className={playlist.isPlaylistActive ? " video-playlist__card pl-is-active" : "video-playlist__card"} onClick={() => addToListOfPlaylists()}>
            <div className="pl-video--card pl--card__video-img pos-rel">
                <img alt="thubmnail" className="pl-video--card pl--card__img" src={playlist.thumbnailUrl} />
                <MusicWave className="inside-video--img" isPlaying={playlist.isPlaylistActive} />
            </div>
            <div className="playlist-video-txt">
                <p title={playlist.playlistTitle} className="pl-video--card card-title pl--card__title">{trimVideoTxt(playlist.playlistTitle)}</p>
                <span className="my-mix-sub-t" ><i className="my-mix-sub">{playlist.playlistTitle}</i></span>
            </div>
        </div>
    </div>
}