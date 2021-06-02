import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


const options = [
    'All',
    'Auto',
    'Bikes',
    'Boats',
    'Computers',
    'Household Items',
    'Music',
    'Sports',
    'Tools',
    'Toys',
    'Video Games'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(option, theme) {
    return {
        fontWeight:
            option.indexOf(option) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function SimpleSelect() {
    const theme = useTheme();
    const [option, setCategory] = React.useState('');
    
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div>
            <InputLabel>Category</InputLabel>
            <Select
                autowidth
                labelId="category-label"
                required
                id="select-category"
                value={option}
                onChange={handleChange}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem value={option} key={option} selected={option === 'Pyxis'} style={getStyles(option, theme)}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}

