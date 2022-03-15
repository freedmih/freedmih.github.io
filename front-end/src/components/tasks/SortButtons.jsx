import upArrow from './../../svg/upArrow.svg';
import downArrow from './../../svg/downArrow.svg';

import { Constants } from '../../constants';

import { Typography, Space } from 'antd';

import { ArrowUpOutlined } from '@ant-design/icons'

import {useTranslation} from "react-i18next";

const { Text, Link } = Typography;


export default function SortButtons( { setSortType } ) {

    const {t} = useTranslation();

    return (
        <div className="sort-buttons">
             <Text>{t('sort_by_date')}</Text>
             <ArrowUpOutlined onClick={() => setSortType(Constants.DATE_FILTER_DIRECTION_DOWN)} style={{color: '#f5222d', fontSize: '24px'}} />
             <ArrowUpOutlined onClick={() => setSortType(Constants.DATE_FILTER_DIRECTION_UP)} style={{color: '#1890ff', fontSize: '24px'}} rotate={180} />
        </div>
    )
}