import React from 'react'
import { useTranslation } from 'react-i18next'
import QLDanhSachTaiKhoan from '../../components/taikhoan'
import Header from '../../parts/header'
import SidebarLeft from '../../parts/sidebar'

const TaiKhoan = () => {
    const { t, i18n } = useTranslation();
    document.title = t('global:label_global_user_management');

    return (
        <div className="mainpage-main">
            <Header />
            <div className="contain-main">
                <SidebarLeft />
                <div className={`right-main ${window.innerWidth < 922 ? 'full' : ''}`} rel="js-right-main">
                    <ul className="breadcrumb">
                    <li><a href="/ban-lam-viec">{t('global:label_global_dashboard')}</a></li>
                    <li>{t('global:label_global_user_list')}</li>
                </ul>
                    <div className="container-fluid">
                        <div className="row">
                            <QLDanhSachTaiKhoan />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaiKhoan
