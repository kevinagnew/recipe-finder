/* eslint-disable @typescript-eslint/no-explicit-any */
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Button, Checkbox, Input } from '@mui/joy';
import { ListItemText } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const filters = ['Calories', 'Carbs', 'Cuisine', ];

const AdvancedSearch = ({
    advancedSearchValues,
    setAdvancedSearchValues,
}: {
    advancedSearchValues: Record<string, string>;
    setAdvancedSearchValues: (values: Record<string, string>) => void;
}) => {

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

    const handleInputChange = (key: string, value: string) => {
        setAdvancedSearchValues({
            ...advancedSearchValues,
            [key]: value,
        });
    };

    return (
        <>
            <Button className="defaultButton" onClick={handleClick}>
                Filters
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {filters.map((option) => (
                    <MenuItem key={option} onClick={() => {
                        handleToggle(option)
                        handleClose();
                    }}>
                        <Checkbox checked={selectedOptions.includes(option)} />
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Menu>
            {selectedOptions.length > 0 ?
                <div>
                    <form>
                    {selectedOptions.map((option) => (
                        option === 'Calories' ? (
                            <div key={option}>
                                <div key={`${option}-min`}>
                                    Minimum Calories:
                                    <div className="input-box">
                                        <Input
                                            size="sm"
                                            type="number"
                                            value={advancedSearchValues['minCalories'] || ''}
                                            onChange={(e) => handleInputChange('minCalories', e.target.value)}
                                        />
                                        <IconButton
                                            size="sm"
                                            onClick={() => {
                                                setAdvancedSearchValues({
                                                    ...advancedSearchValues,
                                                    minCalories: '',
                                                });
                                            }}
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                                <div key={`${option}-max`}>
                                    Maximum Calories:
                                    <div className="input-box">
                                        <Input
                                            size="sm"
                                            type="number"
                                            value={advancedSearchValues['maxCalories'] || ''}
                                            onChange={(e) => handleInputChange('maxCalories', e.target.value)}
                                        />
                                        <IconButton
                                            size="sm"
                                            onClick={() => {
                                                setAdvancedSearchValues({
                                                    ...advancedSearchValues,
                                                    maxCalories: '',
                                                });
                                            }}
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        ) : option === 'Carbs' ? (
                            <div key={option}>
                                <div key={`${option}-min`}>
                                    Minimum Carbs:
                                    <div className="input-box">
                                        <Input
                                            size="sm"
                                            type="number"
                                            value={advancedSearchValues['minCarbs'] || ''}
                                            onChange={(e) => handleInputChange('minCarbs', e.target.value)}
                                        />
                                        <IconButton
                                            size="sm"
                                            onClick={() => {
                                                setAdvancedSearchValues({
                                                    ...advancedSearchValues,
                                                    minCarbs: '',
                                                });
                                            }}
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                                <div key={`${option}-max`}>
                                    Maximum Carbs:
                                    <div className="input-box">
                                        <Input
                                            size="sm"
                                            type="number"
                                            value={advancedSearchValues['maxCarbs'] || ''}
                                            onChange={(e) => handleInputChange('maxCarbs', e.target.value)}
                                        />
                                        <IconButton
                                            size="sm"
                                            onClick={() => {
                                                setAdvancedSearchValues({
                                                    ...advancedSearchValues,
                                                    maxCarbs: '',
                                                });
                                            }}
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        ) : option === 'Cuisine' ? (
                            <div key={option}>
                                <div key={`${option}`}>
                                    Cuisine:
                                    <div className="input-box">
                                        <Input
                                            size="sm"
                                            type="text"
                                            value={advancedSearchValues['cuisine'] || ''}
                                            onChange={(e) => handleInputChange('cuisine', e.target.value)}
                                        />
                                        <IconButton
                                            size="sm"
                                            onClick={() => {
                                                setAdvancedSearchValues({
                                                    ...advancedSearchValues,
                                                    cuisine: '',
                                                });
                                            }}
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}
                    </form>
                </div>
                : null
            }
        </>
    );
};

export default AdvancedSearch;
