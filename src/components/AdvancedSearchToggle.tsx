/* eslint-disable @typescript-eslint/no-explicit-any */
import Switch from '@mui/joy/Switch';

const AdvancedSearchToggle = ({ checked, setChecked }: { checked: boolean; setChecked: (value: boolean) => void }) => {
    let currentChecked = false;
    return (
        <div className="advanced-search-toggle">
            <div className=''>
                <p>Advanced Search</p>
            </div>
            <div className="advanced-search-switch">
                <Switch variant="solid" 
                    checked={checked}
                    onChange={() => {
                        currentChecked = !checked;
                        setChecked(currentChecked);
                }}/>
            </div>
        </div>
    );
};

export default AdvancedSearchToggle;
