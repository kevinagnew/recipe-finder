/* eslint-disable @typescript-eslint/no-explicit-any */
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Button, Checkbox, Input } from '@mui/joy';
import { ListItemText } from '@mui/material';
import { useState } from 'react';

const options = ['Calories', 'Carbs'];

const AdvancedSearch = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggle = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    return (
        <>
            <Button onClick={handleClick}>
                Open Menu
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {options.map((option) => (
                    <MenuItem key={option} onClick={() => {
                        handleToggle(option)
                        handleClose();
                        }}>
                        <Checkbox checked={selectedOptions.includes(option)} />
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Menu>
            <div>
                <ul>
                {selectedOptions.map((option) => (
                    option === 'Calories' ? (
                        <>
                        <div key={option}>
                            Minimum Calories: <Input />
                            Maximum Calories: <Input />
                        </div>
                        </>
                    ) : option === 'Carbs' ? (
                        <>
                        <div key={option}>
                            Minimum Carbs: <Input />
                            Maximum Carbs: <Input />
                        </div>
                        </>
                    ) : null
                ))}
                </ul>
            </div>
        </>
    );
};

export default AdvancedSearch;
