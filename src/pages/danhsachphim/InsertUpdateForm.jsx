import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useTranslation } from 'react-i18next'
import { InsertMovie } from '../../services/movie'
import * as utils from '../../utils/index'

const InsertUpdateForm = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const initData = { tenPhim: '', biDanh: '', trailer: '', hinhAnh: '', moTa: 'user.accessToken', maNhom: 'GP05', ngayKhoiChieu: '', danhGia: 0 };
    const [data, setData] = useState(initData);

    const handleChange = (e) => {
        let target = e.target;
        if (target.name === 'tenPhim') {
            setData({ ...data, [data.biDanh]: e.target.value });
            document.querySelector('[rel="js-link-seo"]').value = utils.convertToLinkSEO(e.target.value);
        }
        if (target.name === 'hinhAnh') {
            setData({ ...data, [e.target.name]: e.target.files[0] });
        }
        else if (target.name === 'ngayKhoiChieu') {
            const convertDate = new Date(e.target.value);
            const options = {month: 'short', day: 'short', year: 'short' };
            setData({ ...data, [e.target.name]: convertDate.toLocaleDateString(options) });
        }
        else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
        //console.log(data);
    }

    const handleInsertData = (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
            console.log(key, formData.get(key));
        }
        if (data.tenPhim && data.hinhAnh && data.biDanh) {
            dispatch(InsertMovie(formData));
        }
        else {
            console.log('error');
        }
    }

    return (
        <div className="popup" rel="js-popup">
            <div className="popup-body">
                <div className="card">
                    <div className="card-header">
                        <i className="icon-note" /> {t('movies:label_movie_add_new_movie')} <span className="close"><i className="icon-close" onClick={utils.closePopup}></i></span>
                    </div>
                    <div className="card-body scrollbar-y-custom">
                        <div className="form-group d-none">
                            <label htmlFor="maPhim">ID</label>
                            <input id="maPhim" name="maPhim" type="text" readOnly="readonly" className="form-control" />
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="tenPhim">{t('movies:label_movie_name')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="tenPhim" name="tenPhim" type="text" className="form-control" onChange={handleChange} required placeholder={t('movies:label_movie_name_input')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="trailer">Link trailer</label>
                                    <input id="trailer" name="trailer" type="text" className="form-control" onChange={handleChange} placeholder="Nhập link trailer" />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="hinhAnh">{t('global:label_global_image')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="hinhAnh" name="hinhAnh" type="file" accept="image/*" className="form-control" onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ngayKhoiChieu">{t('movies:label_movie_date')}</label>
                                    <input id="ngayKhoiChieu" name="ngayKhoiChieu" min={utils.setMinDate()} type="date" className="form-control" onChange={handleChange} required rel="js-movie-date" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="moTa">{t('global:label_global_description')}</label>
                            <CKEditor editor={ClassicEditor} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="biDanh">Link SEO <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                            <input id="biDanh" type="text" name="biDanh" className="form-control" rel="js-link-seo" onChange={handleChange} required placeholder={t('global:label_global_link_seo_input')} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-success" onClick={handleInsertData}>{t('global:label_global_save')}</button>
                            <button className="btn btn-danger">{t('global:label_global_reset')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InsertUpdateForm
