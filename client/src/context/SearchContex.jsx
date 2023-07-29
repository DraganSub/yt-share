import { createContext, useContext, useState } from "react"

const SearchFnCtx = createContext(false);

export function SearchWrapper({ children }) {
  const [isSearchActive, setIsSearchActive] = useState(false)

  const ctxValue = {
    setIsSearchActive,
    isSearchActive
  }

  return <SearchFnCtx.Provider value={ctxValue}>
    {children}
  </SearchFnCtx.Provider>
}

export const useSearch = () => {
  const searchCtx = useContext(SearchFnCtx)
  const {
    setIsSearchActive,
    isSearchActive
  } = searchCtx;

  return {
    setIsSearchActive,
    isSearchActive
  }
}