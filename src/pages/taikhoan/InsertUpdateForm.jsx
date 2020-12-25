import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { InsertUser } from '../../services/users'
import * as utils from '../../utils/index'

const InsertUpdateForm = (props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const initData = { taiKhoan: '', matKhau: '', email: '', soDt: '', maNhom: 'GP05', maLoaiNguoiDung: 'QuanTri', hoTen: ''};
    const [data, setData] = useState(initData);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        //console.log(data);
    }

    const handleInsertData = (e) => {
        e.preventDefault();
        if (data.taiKhoan && data.matKhau) {
            //console.log(data);
            if (props.props?.filter(e => e.taiKhoan === data.taiKhoan).length > 0) {
                alert(t('users:label_users_user_exists'));
            }
            else {
                dispatch(InsertUser(data));
            }
        }
        else {
            alert('Lỗi');
        }
    }

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
                                    <input id="taiKhoan" name="taiKhoan" type="text" className="form-control" onChange={handleChange} required placeholder={t('users:label_users_user_input')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="matKhau">{t('users:label_users_password')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="matKhau" name="matKhau" type="password" className="form-control" onChange={handleChange} required placeholder={t('users:label_users_password_input')} />
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="matKhauXacNhan">{t('users:label_users_password_repeat')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="matKhauXacNhan" name="matKhauXacNhan" type="password" className="form-control" onChange={handleChange} required placeholder={t('users:label_users_password_input_repeat')} />
                                </div> */}
                                <div className="form-group">
                                    <label htmlFor="hoTen">{t('users:label_users_full_name')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="hoTen" name="hoTen" type="text" className="form-control" onChange={handleChange} required placeholder={t('users:label_users_name_input')} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="soDt">{t('users:label_users_phone_number')}</label>
                                    <input id="soDt" name="soDt" type="text" className="form-control" onChange={handleChange} placeholder={t('users:label_users_phone_number_input')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" name="email" type="text" className="form-control" onChange={handleChange} placeholder={t('users:label_users_email_input')} />
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-success" onClick={handleInsertData}>{t('global:label_global_save')}</button>
                            <input className="btn btn-danger" type="reset" value={t('global:label_global_reset')} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InsertUpdateForm
