import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { InsertData, UpdateData, UpdateDataImage } from '../../services/movie'
import * as utils from '../../utils/index'
import { useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const InsertUpdateForm = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const dataInfor = useSelector((state) => state.movie.movieInfo);
    const [_data, setData] = useState(dataInfor);

    const handleChange = (e) => {
        let target = e.target;
        if (e.target.name === 'tenPhim') {
            setData(currentData => ({ ...currentData, [e.target.name]: e.target.value }));
            const linkSEO = utils.convertToLinkSEO(e.target.value);
            setData(currentData => ({ ...currentData, biDanh: linkSEO }));
            //document.querySelector('[rel="js-link-seo"]').value = utils.convertToLinkSEO(e.target.value);
        }
        else if (e.target.name === 'hinhAnh') {
            setData(currentData => ({ ...currentData, [e.target.name]: e.target.files[0] }));
        }
        else if (e.target.name === 'ngayKhoiChieu') {
            const convertDate = new Date(e.target.value);
            setData(currentData => ({ ...currentData, [e.target.name]: convertDate.toLocaleDateString('vi-VN', {month: '2-digit', day: '2-digit', year: 'numeric'}) }));
        }
        else {
            setData(currentData => ({ ...currentData, [e.target.name]: e.target.value }));
        }
    }

    const handleInsertData = (e) => {
        e.preventDefault();
        if (_data.tenPhim && _data.hinhAnh && _data.biDanh) {
            if (props.props?.filter(e => e.tenPhim === _data.tenPhim).length > 0) {
                alert(t('movie:label_movie_movie_exists'));
            }
            else {
                let formData = new FormData();
                for (let key in _data) {
                    formData.append(key, _data[key]);
                }
                dispatch(InsertData(formData));
                props.setRequestData(new Date());
            }
        }
        else {
            alert(t('global:label_global_row_has_null'));
        }
    }

    const handleUpdateData = (e) => {
        e.preventDefault();
        if (_data.tenPhim && _data.biDanh) {
            let formData = new FormData();
            for (let key in _data) {
                formData.append(key, _data[key]);
            }
            if (document.getElementById('hinhAnh').files.length > 0) {
                dispatch(UpdateDataImage(formData));
            }
            else {
                dispatch(UpdateData(_data));
            }
            props.setRequestData(new Date());
        }
        else {
            alert(t('global:label_global_row_has_null'));
        }
    }

    const handleResetForm = () => {
        setData({ ...dataInfor });
    }

    useEffect(() => {
        setData(dataInfor);
    }, [dataInfor]);

    return (
        <div className="popup" rel="js-popup">
            <div className="popup-body">
                <div className="card">
                    <div className="card-header">
                        <i className="icon-note" /> {t('movies:label_movie_add_new_movie')} <span className="close"><i className="icon-close" onClick={utils.closePopup}></i></span>
                    </div>
                    <form className="card-body scrollbar-y-custom" rel="js-form-insert-update">
                        <div className="form-group d-none">
                            <label htmlFor="maPhim">ID</label>
                            <input id="maPhim" name="maPhim" type="text" readOnly="readonly" className="form-control" />
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="tenPhim">{t('movies:label_movie_name')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="tenPhim" name="tenPhim" type="text" className="form-control" value={_data?.tenPhim} onChange={(e) => handleChange(e)} required placeholder={t('movies:label_movie_name_input')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="trailer">Link trailer</label>
                                    <input id="trailer" name="trailer" type="text" className="form-control" value={_data?.trailer} onChange={(e) => handleChange(e)} placeholder={t('movies:label_movie_link_trailer_input')} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="hinhAnh">{t('global:label_global_image')} <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                                    <input id="hinhAnh" name="hinhAnh" type="file" accept="image/*" className="form-control" onChange={(e) => handleChange(e)} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ngayKhoiChieu">{t('movies:label_movie_date')}</label>
                                    <input id="ngayKhoiChieu" name="ngayKhoiChieu" min={utils.setMinDate()} type="date" className="form-control" value={utils.setDate(_data?.ngayKhoiChieu)} onChange={(e) => handleChange(e)} required rel="js-movie-date" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="moTa">{t('global:label_global_description')}</label>
                            <CKEditor editor={ClassicEditor} 
                                data={_data?.moTa}
                                onChange={ ( event, editor ) => {
                                    let data = editor.getData();
                                    const e = {target: {name: 'moTa', value: data}}
                                    handleChange(e)
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="biDanh">Link SEO <span className="text-danger" title={t('global:label_global_row_not_null')}>(*)</span></label>
                            <input id="biDanh" type="text" name="biDanh" className="form-control" rel="js-link-seo" value={_data?.biDanh} onChange={(e) => handleChange(e)} required placeholder={t('global:label_global_link_seo_input')} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-success btn-insert" onClick={handleInsertData}>{t('global:label_global_save')}</button>
                            <button className="btn btn-success btn-update" onClick={handleUpdateData}>{t('global:label_global_update')}</button>
                            <button className="btn btn-danger" onClick={handleResetForm}>{t('global:label_global_reset')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InsertUpdateForm
