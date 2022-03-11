import { Constants } from "../../constants";
import { Button, Radio } from 'antd';
import { useState } from "react";

const options = [
    { label: 'All', value: Constants.FILTER_ALL },
    { label: 'Done', value: Constants.FILTER_DONE },
    { label: 'Undone', value: Constants.FILTER_UNDONE },
]

export default function FilterButtons({ setFilter }) {

    const [value, setValue] = useState(options[0].value);

    const handleOnChange = e => {
        setValue(e.target.value);
        setFilter(e.target.value);
    }

    return (
        <Radio.Group value={"large"}
            options={options}
            optionType="button"
            value={value}
            onChange={e => handleOnChange(e)}
        >
        </Radio.Group>
    )
}