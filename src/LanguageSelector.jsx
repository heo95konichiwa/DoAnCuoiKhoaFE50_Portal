import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    let [languageDefault, changeLanguage] = useState();
    const cookiesLanguage = new Cookies();

    const handleCheckedLanguageItem = () => {        
        document.querySelectorAll(`[rel="js-language"] input`).forEach(el => {
            el.removeAttribute('checked');
        })
        document.querySelector(`[rel="js-language-${languageDefault}"]`).setAttribute('checked', '');
    }

    const handleDetectLanguage = (lang) => {
        i18n.changeLanguage(lang);
        cookiesLanguage.set('language', lang, { path: '/' });
        handleCheckedLanguageItem();
    }

    const loadLanguage = () => {
        languageDefault = cookiesLanguage.get('language') || 'vi';
        handleDetectLanguage(languageDefault);
    }

    changeLanguage = (event) => {
        languageDefault = event.target.value;
        handleDetectLanguage(languageDefault);
    }
    
    // useEffect(function () {
    //     loadLanguage();
    // }, []);
    
    useEffect(function () {
        loadLanguage();
    }, [languageDefault]);

    return (
        <div className="login-language" onChange={changeLanguage} rel="js-language">
            <input type="radio" value="vi" name="language" rel="js-language-vi" /> Vietnamese
            <input type="radio" value="en" name="language"  rel="js-language-en" /> English
        </div>
    )
}

export default LanguageSelector