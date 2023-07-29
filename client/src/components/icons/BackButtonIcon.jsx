export default function BackButtonIcon({ navigate }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" onClick={navigate} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width={25} height={25}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
  )
}