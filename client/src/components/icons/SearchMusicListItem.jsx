export function SearchMusicListItem({ activeTab }) {
  return (
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
  )
}