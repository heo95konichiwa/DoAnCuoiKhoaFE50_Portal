import React, { useEffect, useState } from 'react'
import './login.scss'
import LanguageSelector from '../../LanguageSelector'
import { useTranslation } from 'react-i18next'
import { useDispatch } from "react-redux"
import { LoginRequest } from "../../services/users"
import { useHistory } from "react-router-dom"
import Cookies from 'universal-cookie'

const Login = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    document.title = t('login:label_login_title_page');
    const cookies = new Cookies();

    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
    });
    let [darkLight, changeDarkLight] = useState();

    changeDarkLight = () => {
        darkLight = cookies.get('darkmode') || 'dark';
        cookies.set('darkmode', darkLight, { path: '/' });
        document.querySelector('[rel="js-dark-light-mode"]').classList.add(darkLight);
    }

    const loadDarkLightMode = () => {
        changeDarkLight();
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!user.taiKhoan || !user.matKhau) {
            alert(t('login:label_login_error_empty'));
            return;
        }
        dispatch(LoginRequest(user, history));
    }
    useEffect(function () {
        loadDarkLightMode();
    }, [darkLight]);

    return (
        <div className="login">
            <div className="container">
                <LanguageSelector />
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card-group">
                            <div className="card p-4">
                                <form noValidate onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <h1>{t('login:label_login')}</h1>
                                        <p className="text-muted">{t('login:label_login_summary_content')}</p>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-user" />
                                                </span>
                                            </div>
                                            <input id="taiKhoan" className="form-control" type="text" placeholder={t('login:label_login_username')} label="taiKhoan" name="taiKhoan" autoComplete="taiKhoan" autoFocus={true} onChange={handleChange} />
                                        </div>
                                        <div className="input-group mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-lock" />
                                                </span>
                                            </div>
                                            <input id="matKhau" className="form-control" type="password" placeholder={t('login:label_login_password')} label="matKhau" name="matKhau" autoComplete="matKhau" onChange={handleChange} />
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="submit" name="btnLogin" value={t('login:label_login')} id="btnLogin" className="btn btn-primary px-4" />
                                            </div>
                                            <div className="col-6 text-right">
                                                <button className="btn btn-link px-0" type="button">{t('login:label_login_password_lost')}</button>
                                            </div>
                                            <div className="col-12">
                                                <span id="lblError" className="text-error" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card text-white bg-primary py-5 p-4" style={{ width: '44%' }}>
                                <div className="card-body text-center">
                                    <div>
                                        <h2>{t('global:label_global_companyname')}</h2>
                                        <p>{t('login:label_login_description')}</p>
                                        <button className="btn btn-primary active mt-3" type="button">{t('login:label_login_contact_now')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
