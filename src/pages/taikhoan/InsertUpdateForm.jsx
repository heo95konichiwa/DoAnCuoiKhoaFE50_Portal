import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { InsertUser, UpdateUser } from '../../services/users'
import * as utils from '../../utils/index'
import { useEffect } from 'react'

const InsertUpdateForm = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userInfor = useSelector((state) => state.users.userInfo);
    const [data, setData] = useState(userInfor);



    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleInsertData = (e) => {
        e.preventDefault();
        if (data.taiKhoan && data.matKhau && data.hoTen) {
            if (props.props?.filter(e => e.taiKhoan === data.taiKhoan).length > 0) {
                alert(t('users:label_users_user_exists'));
            }
            else {
                dispatch(InsertUser(data));
                props.setRequestData(new Date());
            }
        }
        else {
            alert(t('global:label_global_row_has_null'));
        }
    }
    const handleUpdateData = (e) => {
        e.preventDefault();
        if (data.matKhau && data.hoTen) {
            data.maNhom = 'GP05';
            //console.log(data);
            dispatch(UpdateUser(data));
            props.setRequestData(new Date());
        }
        else {
            alert(t('global:label_global_row_has_null'));
        }
    }
    useEffect(() => {
        setData(userInfor);
        //console.log(data?.taiKhoan);
    }, [userInfor]);
    return (
        <div className="popup" rel="js-popup">
            <div className="popup-body">
                <div className="card">
                    <div className="card-header">
                        <i className="icon-note" /> {t('users:label_users_add_new_user')} <span className="close"><i className="icon-close" onClick={utils.closePopup}></i></span>
                    </div>
                    <form className="card-body scrollbar-y-custom">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="taiKhoan">{t('users:label_users_name')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="taiKhoan" name="taiKhoan" type="text" className="form-control" rel="js-popup-update-not-change" value={data?.taiKhoan} onChange={(e) => handleChange(e)} required placeholder={t('users:label_users_user_input')} autoFocus />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="matKhau">{t('users:label_users_password')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="matKhau" name="matKhau" type="password" className="form-control" value={data?.matKhau} onChange={(e) => handleChange(e)} required placeholder={t('users:label_users_password_input')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hoTen">{t('users:label_users_full_name')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="hoTen" name="hoTen" type="text" className="form-control" value={data?.hoTen} onChange={(e) => handleChange(e)} required placeholder={t('users:label_users_name_input')} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="soDt">{t('users:label_users_phone_number')}</label>
                                    <input id="soDt" name="soDt" type="text" className="form-control" value={data?.soDt} onChange={(e) => handleChange(e)} placeholder={t('users:label_users_phone_number_input')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" name="email" type="text" className="form-control" value={data?.email} onChange={(e) => handleChange(e)} placeholder={t('users:label_users_email_input')} />
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-success btn-insert" onClick={handleInsertData}>{t('global:label_global_save')}</button>
                            <button className="btn btn-success btn-update" onClick={handleUpdateData}>{t('global:label_global_update')}</button>
                            <input className="btn btn-danger" type="reset" value={t('global:label_global_reset')} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InsertUpdateForm
