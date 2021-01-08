import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DeleteData, GetData } from '../../services/movie'
import * as utils from '../../utils/index'
import Cookies from 'universal-cookie'

const QLDanhSachPhim = (props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let [currentSort = { key: 'tenPhim', type: 'up' }, setCurentSort] = useState();
    const [_data, selectedData] = useState();
    const cookies = new Cookies();
    const getLang = cookies.get('language');

    const sortTypes = {
        up: {
            class: 'table-sort-asc',
            fn: (a, b) => {
                if (a[currentSort.key] > b[currentSort.key]) return 1;
                if (a[currentSort.key] < b[currentSort.key]) return -1;
                return 0;
            }
        },
        down: {
            class: 'table-sort-desc',
            fn: (a, b) => {
                if (a[currentSort.key] < b[currentSort.key]) return 1;
                if (a[currentSort.key] > b[currentSort.key]) return -1;
                return 0;
            }
        },
        default: {
            class: 'table-sort-asc',
            fn: (a, b) => a
        }
    };

    const data = props.props?.sort(sortTypes[currentSort.type].fn);

    const handleSort = (key) => {
        let curent = '';
        if (currentSort.type === 'down') curent = 'up';
        else if (currentSort.type === 'up') curent = 'down';
        else if (currentSort.type === 'default') curent = 'up';

        setCurentSort({ key: key, type: curent });
    }

    const handleSelected = (maPhim) => {
        selectedData(maPhim);
        utils.showPopup();
        document.querySelector('[rel="js-popup"]').classList.add('popup-update');
        document.querySelectorAll('[rel="js-popup-update-not-change"]').forEach(el => {
            el.classList.add('popup-update-not-change');
        });
    }

    const handleDelete = (maPhim, tenPhim) => {
        const textConfirm = `${t('movies:label_movie_delete_confirm')} ${tenPhim}`;
        if (window.confirm(textConfirm)) {
            dispatch(DeleteData(maPhim, tenPhim));
            props.setRequestData(new Date());
        }
    }

    useEffect(() => {
        if (_data) {
            dispatch(GetData(_data));
        }
    }, [_data]);

    const renderData = () => {
        //console.log(data, typeof sortTypes[currentSort].fn);
        return data?.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="table-item">{item.maPhim}</td>
                    <td className="table-item">{item.tenPhim}</td>
                    <td className="table-item table-item-image">{<img src={item.hinhAnh} alt={item.tenPhim} />}</td>
                    <td className="table-item">{utils.convertToLocaleDateString(item.ngayKhoiChieu, getLang)}</td>
                    <td className="table-item">{item.biDanh}</td>
                    <td className="table-item">
                        <button className="btn btn-success" onClick={() => handleSelected(item.maPhim)}><i className="icon-pencil"></i> {t('global:label_global_edit')}</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(item.maPhim, item.tenPhim)}><i className="icon-trash"></i> {t('global:label_global_delete')}</button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
            <table className="table table-default">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className={`table-sort ${sortTypes[currentSort.type].class}`} onClick={() => handleSort('tenPhim')}>{t('movies:label_movie_name')}</th>
                        <th>{t('global:label_global_image')}</th>
                        <th className={`table-sort ${sortTypes[currentSort.type].class}`} onClick={() => handleSort('ngayKhoiChieu')}>{t('movies:label_movie_date')}</th>
                        <th>Link SEO</th>
                        <th>{t('global:label_global_actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {renderData()}
                </tbody>
            </table>
        </>
    )
}

export default QLDanhSachPhim
