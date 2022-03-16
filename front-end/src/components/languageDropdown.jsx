import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const languages = {
    "ru": "Russian",
    "en": "English"
}

function handleMenuClick(key, i18n) {
    i18n.changeLanguage(key);
}

export default function LanguageDropdown() {

    const { t, i18n } = useTranslation();

    const menu = (
        <Menu onClick={handleMenuClick}>
            {
                Object.keys(languages).map((item) => (
                    <Menu.Item key={item} icon={<UserOutlined />} onClick={() => handleMenuClick(item, i18n)}>
                        {languages[item]}
                    </Menu.Item>
                ))
            }
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <Button style={{ margin: '10px' }}>
                {t('choose_language')} <DownOutlined />
            </Button>
        </Dropdown>
    )
}