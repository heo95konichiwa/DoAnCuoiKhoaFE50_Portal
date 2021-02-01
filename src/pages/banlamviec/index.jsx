import React from 'react'
import { useTranslation } from 'react-i18next'
// import LichChieuNgayMai from '../../components/lichchieu/index'
import Header from '../../parts/header'
import SidebarLeft from '../../parts/sidebar'

const BanLamViec = () => {
    const { t, i18n } = useTranslation();
    document.title = t('dashboard:label_dashboard_title_page');

    return (
        <div className="mainpage-main">
            <Header />
            <div className="contain-main">
                <SidebarLeft />
                <div className={`right-main ${window.innerWidth < 922 ? 'full' : ''}`} rel="js-right-main">
                    <ul className="breadcrumb">
                        <li>{t('global:label_global_dashboard')}</li>
                    </ul>
                    <div className="container-fluid">
                        <div className="row">
                            {/* <LichChieuNgayMai /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BanLamViec
