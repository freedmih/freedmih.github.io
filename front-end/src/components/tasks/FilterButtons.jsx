import { Constants } from "../../constants";
import { Button, Radio } from 'antd';
import { useState } from "react";

import {useTranslation} from "react-i18next";

const options = (t) => [
    { label: t('task_all'), value: Constants.FILTER_ALL },
    { label: t('task_done'), value: Constants.FILTER_DONE },
    { label: t('task_undone'), value: Constants.FILTER_UNDONE },
]

export default function FilterButtons({ setFilter }) {

    const {t} = useTranslation();
    const [value, setValue] = useState(options(t)[0].value);

    const handleOnChange = e => {
        setValue(e.target.value);
        setFilter(e.target.value);
    }

    return (
        <Radio.Group value={"large"}
            options={options(t)}
            optionType="button"
            value={value}
            onChange={e => handleOnChange(e)}
        >
        </Radio.Group>
    )
}