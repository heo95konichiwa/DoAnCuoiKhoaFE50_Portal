import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './style.scss'
import logo from '../../assets/images/logo-film.png'
import avatar from '../../assets/images/avatar.png'
import { useHistory } from "react-router-dom"
import Cookies from 'universal-cookie'

const Header = () => {
    const { t, i18n } = useTranslation();
    let [languageDefault, changeLanguage] = useState();
    let [darkLight, changeDarkLight] = useState();
    const history = useHistory();
    const cookies = new Cookies();

    const handleSettingAccount = () => {
        document.querySelector('[rel="js-hd-nav-sub"]').classList.toggle('active');
    }

    const handleFullPage = () => {
        document.querySelector('[rel="js-left-main"]').classList.toggle('hide');
        document.querySelector('[rel="js-right-main"]').classList.toggle('full');
    }

    const handleChangeDarkLightMode = (darkMode) => {
        const mode = darkMode === 'light' ? 'dark' : 'light';
        document.querySelector('[rel="js-dark-light-mode"]').classList.add(darkMode);
        document.querySelector('[rel="js-dark-light-mode"]').classList.remove(mode);
        cookies.set('darkmode', darkMode, { path: '/' });
        darkLight = document.querySelector('[rel="js-darklight-mode"]').setAttribute('data-darklight', mode);
    }

    changeDarkLight = () => {
        darkLight = document.querySelector('[rel="js-darklight-mode"]').getAttribute('data-darklight');
        handleChangeDarkLightMode(darkLight);
    }

    const loadDarkLightMode = () => {
        darkLight = cookies.get('darkmode') || 'dark';
        // document.querySelector('[rel="js-dark-light-mode"]').classList.add(darkLight);
        handleChangeDarkLightMode(darkLight);
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        history.push("/dang-nhap");
    }

    const handleDetectLanguage = (lang) => {
        i18n.changeLanguage(lang);
        cookies.set('language', lang, { path: '/' });
    }

    const loadLanguage = () => {
        languageDefault = cookies.get('language') === 'vi' ? 'vi' : 'en';
        handleDetectLanguage(languageDefault);
    }

    changeLanguage = () => {
        const languageCode = document.querySelector('[rel="js-language-code"]').getAttribute('data-language');
        languageDefault = languageCode === 'vi' ? 'en' : 'vi';
        handleDetectLanguage(languageDefault);
    }

    useEffect(function () {
        loadDarkLightMode();
        loadLanguage();
    }, []);

    useEffect(function () {
        loadDarkLightMode();
        loadLanguage();
    }, [languageDefault, darkLight]);

    return (
        <div className="hd-menu">
            <div className="hd-logo">
                <NavLink exact to="/ban-lam-viec"><img src={logo} alt="logo" /></NavLink>
            </div>

            <div className="hd-toggler-icon" onClick={handleFullPage}>
                <i className="icon-menu"></i>
            </div>

            <ul className="hd-nav">
                <li><NavLink exact to="/ban-lam-viec">{t('global:label_global_dashboard')}</NavLink></li>
                <li><NavLink exact to="/nguoi-dung">{t('global:label_global_user')}</NavLink></li>
                <li><NavLink exact to="/cai-dat">{t('global:label_global_setting')}</NavLink></li>
            </ul>

            <ul className="hd-user-setting">
                <li className="hd-avatar">
                    <span className="has-sub" onClick={handleSettingAccount}><img className="hd-avatar-src" src={avatar} alt="avatar" /></span>
                    <ul className="hd-nav-sub" rel="js-hd-nav-sub">
                        <li className="hd-nav-group">{t('global:label_global_setting')}</li>
                        <li className="hd-sub-item hd-mode" onClick={changeDarkLight}><i className="icon-equalizer"></i>{cookies.get('darkmode') === 'light' ? <span rel="js-darklight-mode" data-darklight="dark">{t('label_global_mode_dark')}</span> : <span rel="js-darklight-mode" data-darklight="light">{t('label_global_mode_light')}</span>}</li>
                        <li className="hd-sub-item hd-language" onClick={changeLanguage}><i className="icon-flag"></i>{cookies.get('language') === 'en' ? <span rel="js-language-code" data-language="en">{t('label_global_language_en')}</span> : <span rel="js-language-code" data-language="vi">{t('label_global_language_vi')}</span>}</li>
                        <li>
                            <NavLink exact to="/doi-mat-khau"><i className="icon-settings"></i>{t('global:label_global_change_password')}</NavLink>
                        </li>
                        <li className="hd-sub-item" onClick={handleLogout}>
                            <i className="icon-logout"></i>{t('global:label_global_logout')}
                        </li>
                    </ul>
                </li>
            </ul>            
        </div>
    )
}

export default Header
