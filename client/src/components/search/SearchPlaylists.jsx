import React, { useState } from "react";
import axios from "axios";
import { playlistSearchToPlaylistObject } from "../../utils/utils";
import { PlaylistSearchCard } from "../cards";
import { SearchbarSearchIcon } from "../icons/SearchbarSearchIcon";

const API_KEY = 'AIzaSyAX9r_Id8dEmOFAF2MPpFhim-Trf4vGdco';

export default function SearchPlaylists() {
    const [searchTerm, setSearchTerm] = useState('');
    const [playlists, setPlaylists] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        searchPlaylists();
    };

    const searchPlaylists = async () => {
        try {
            const response = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTerm)}&type=playlist&key=${API_KEY}`
            );
            setPlaylists(response.data.items.map((playlist) => playlistSearchToPlaylistObject(playlist)));
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="search--form">
                <input className="serach--input" type="text" value={searchTerm} placeholder="Search Playlists" onChange={handleChange} />
                <button className="search--btn" type="submit"> <SearchbarSearchIcon /></button>
            </form>
            <div className="search--videos search--bottom" style={{ marginTop: "20px" }}>
                {playlists.map(playlist => <PlaylistSearchCard playlist={playlist} />)}
            </div>
        </div>
    );
}