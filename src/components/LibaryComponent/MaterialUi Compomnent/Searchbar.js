import { Box, FormControl, IconButton, InputBase, InputLabel, MenuItem, Select, styled } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';


const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '60%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding:'0px',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 120,
        backgroundColor: '#f3f3f3',
          borderRight: `1px solid ${theme.palette.divider}`,
    '& .MuiSelect-select': {
        fontSize: '14px',
    padding:'10px 12px',



    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    flex: 1,
    padding: '0px 8px',
    fontSize: '14px',
}));

export const SearchBar = () => {
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample categories
    const categories = [
        'All',
        'Electronics',
        'Books',
        'Clothing',
        'Home & Kitchen',
        'Toys & Games',
    ];

    // Handle search submission
    const handleSearch = () => {
        if (searchTerm.trim()) {
            // Add your search logic here (e.g., API call)
        }
    };

    // Handle Enter key press
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <SearchContainer>
            <StyledFormControl variant="outlined">
                <InputLabel id="category-select-label" sx={{ display: 'none' }}>
                    Category
                </InputLabel>
                <Select
                    labelId="category-select-label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label=""
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </Select>
            </StyledFormControl>
            <StyledInputBase
                placeholder={category === 'All' ? "Search products..." : `Search ${category.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <IconButton onClick={handleSearch} color="primary">
                <SearchIcon />
            </IconButton>
        </SearchContainer>
    );
};