'use client';
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface SearchContextType {
  openSearch: boolean;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
  return (
    <SearchContext.Provider
      value={{
        openSearch,
        setOpenSearch,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
