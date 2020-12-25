import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { GetMovieList } from '../../services/movie'
import { useTranslation } from 'react-i18next'
import * as utils from '../../utils/index'
import InsertUpdateForm from '../../pages/danhsachphim/InsertUpdateForm'

const QLDanhSachPhim = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const dataList = useSelector((state) => state.movie.movieList);
    const cookies = new Cookies();

    const convertToLocaleDateString = (time) => {
        const convertDate = new Date(time);
        const getLang = cookies.get('language');
        const locationLang = (getLang === 'en') ? 'en-US' : 'vi-VN';
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return convertDate.toLocaleDateString(locationLang, options)
    }

    useEffect(() => {
        dispatch(GetMovieList());
    }, []);

    useEffect(() => {
        dispatch(GetMovieList());
    }, [dispatch]);


    const renderData = () => {
        return dataList?.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="table-item">{item.maPhim}</td>
                    <td className="table-item">{item.tenPhim}</td>
                    <td className="table-item table-item-image">{<img src={item.hinhAnh} alt={item.tenPhim} />}</td>
                    <td className="table-item">{convertToLocaleDateString(item.ngayKhoiChieu)}</td>
                    <td className="table-item">{item.biDanh}</td>
                    <td className="table-item">
                        <button className="btn btn-info"><i className="icon-eye"></i> {t('global:label_global_view')}</button>
                        <button className="btn btn-success"><i className="icon-pencil"></i> {t('global:label_global_edit')}</button>
                        <button className="btn btn-danger"><i className="icon-trash"></i> {t('global:label_global_delete')}</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <div className="col-12">
                <div className="block-default">
                    <div className="block-header">
                        <i className="icon-grid" /> {t('global:label_global_movie_list')}
                    </div>
                    <div className="block-body">
                        <div id="ContentMain_ctl00_UpdatePanel1">
                            <div className="btn-groups">
                                <button className="btn btn-success" onClick={utils.showPopup}><i className="icon-plus" /> {t('global:label_global_add')}</button>
                            </div>
                            <table className="table table-default">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>{t('movies:label_movie_name')}</th>
                                        <th>{t('global:label_global_image')}</th>
                                        <th>{t('movies:label_movie_date')}</th>
                                        <th>Link SEO</th>
                                        <th>{t('global:label_global_actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <InsertUpdateForm />
        </>
    )
}

export default QLDanhSachPhim
