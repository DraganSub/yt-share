import { useState } from "react"
import Search from "./Search";
import { SearchPlaylists } from ".";
export default function SearchSection() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (!isSearchOpen) {
    return <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="3"
      stroke="white"
      class="w-6 h-6 search--section"
      style={{ width: "30px", height: "30px", background: "transparent", cursor: "pointer" }}
      onClick={() => { setIsSearchOpen(true) }}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        style={{ background: "transparent" }}
      />
    </svg>
  }

  return <div className="search--section-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24"
      stroke-width="3"
      stroke="currentColor"
      onClick={() => { setIsSearchOpen(false) }}
      class="w-6 h-6 exit-search"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <SearchContainer />
  </div>
}

function SearchContainer() {

  const [activeTab, setActiveTab] = useState(0)

  return <>
    <div className="search--input">
      <div className="search--tab-btns">
        <button className="search--tab-btn" onClick={() => setActiveTab(0)}>
          <svg
            fill={`${activeTab === 0 ? "red" : "white "}`}
            viewBox="0 0 16 16"
            height="2em"
            width="2em"
            style={{ background: "transparent" }}
          >
            <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"

            />
            <path fillRule="evenodd" d="M9 3v10H8V3h1z" />
            <path d="M8 2.82a1 1 0 01.804-.98l3-.6A1 1 0 0113 2.22V4L8 5V2.82z" />
          </svg>
        </button>
        <button className="search--tab-btn" onClick={() => setActiveTab(1)}>
          <svg
            fill={`${activeTab === 1 ? "red" : "white "}`}
            viewBox="0 0 16 16"
            height="2em"
            width="
            2em"
          >
            <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
            <path fillRule="evenodd" d="M12 3v10h-1V3h1z" />
            <path d="M11 2.82a1 1 0 01.804-.98l3-.6A1 1 0 0116 2.22V4l-5 1V2.82z" />
            <path
              fillRule="evenodd"
              d="M0 11.5a.5.5 0 01.5-.5H4a.5.5 0 010 1H.5a.5.5 0 01-.5-.5zm0-4A.5.5 0 01.5 7H8a.5.5 0 010 1H.5a.5.5 0 01-.5-.5zm0-4A.5.5 0 01.5 3H8a.5.5 0 010 1H.5a.5.5 0 01-.5-.5z"
            />
          </svg>
        </button>
      </div>
      {activeTab === 0 ? <Search /> : <SearchPlaylists />}
    </div>
  </>
}


