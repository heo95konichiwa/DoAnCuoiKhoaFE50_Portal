import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'
import './style.scss'

const SidebarLeft = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className={`left-main scrollbar-y-custom ${window.innerWidth < 922 ? 'hide' : ''}`} rel="js-left-main">
            <ul className="left-nav">
                <li className="left-nav-item">
                    <NavLink exact activeClassName={'active'} to='/ban-lam-viec'>
                        <i className="icon-speedometer" />{t('label_global_dashboard')}
                    </NavLink>
                </li>
                <li className="left-nav-title">{t('global:label_global_user_management')}</li>
                {/* <li className="left-nav-item">
                    <NavLink exact activeClassName={'active'} to='/danh-sach-nhom-tai-khoan'>
                        <i className="icon-grid" />{t('global:label_global_user_catalogs')}
                    </NavLink>
                </li> */}
                <li className="left-nav-item">
                    <NavLink exact activeClassName={'active'} to='/danh-sach-tai-khoan'>
                        <i className="icon-user" />{t('global:label_global_user_list')}
                    </NavLink>
                </li>
                <li className="left-nav-title">{t('global:label_global_movie_management')}</li>
                <li className="left-nav-item">
                    <NavLink exact activeClassName={'active'} to='/danh-sach-phim'>
                        <i className="icon-list" />{t('global:label_global_movie_list')}
                    </NavLink>
                </li>
                <li className="left-nav-item">
                    <NavLink exact activeClassName={'active'} to='/thong-tin-phim'>
                        <i className="icon-info" />{t('global:label_global_movie_infor')}
                    </NavLink>
                </li>
                <li className="left-nav-title">{t('global:label_global_cinema_management')}</li>
                <li className="left-nav-item">
                    <NavLink exact activeClassName={'active'} to='/he-thong-rap'>
                        <i className="icon-grid" />{t('global:label_global_cinema_system')}
                    </NavLink>
                </li>
                <li className="left-nav-item">
                    <NavLink exact activeClassName={'active'} to='/lich-chieu'>
                        <i className="icon-clock" />{t('global:label_global_cinema_showtimes')}
                    </NavLink>
                </li>
                <li className="left-nav-title">{t('global:label_global_ticket_management')}</li>
                <li className="left-nav-item">
                    <NavLink exact activeClassName={'active'} to='/danh-sach-phong-ve'>
                        <i className="icon-grid" />{t('global:label_global_ticket_room_list')}
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SidebarLeft
