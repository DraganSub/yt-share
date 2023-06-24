import { useState } from "react"
import Search from "./Search";

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
    <div className="search--input">
      <Search />
    </div>
  </div>
}