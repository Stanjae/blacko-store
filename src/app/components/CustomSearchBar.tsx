'use client'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha, } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.info.light, 0.10),
    '&:hover': {
      backgroundColor: alpha(theme.palette.info.main, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '670px',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '200px',
      },
    },
  }));

const CustomSearchBar = () => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const searchQueryValue = searchParams.get("query")

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
       
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set('query', term);
        } else {
          params.delete('query');
        }
        replace(`/store?${params.toString()}`);
      }, 300);

  return (
    <Search className=' hidden md:block'>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              defaultValue={searchQueryValue}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
    </Search>
  )
}

export default CustomSearchBar