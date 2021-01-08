import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DeleteUser, GetUser } from '../../services/users'
import * as utils from '../../utils/index'

const DanhSachTaiKhoan = (props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let [currentSort = { key: 'hoTen', type: 'up' }, setCurentSort] = useState();
    const [user, selectedUser] = useState();

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

    const handleSelectedUser = (taiKhoan) => {
        selectedUser(taiKhoan);
        utils.showPopup();
        document.querySelector('[rel="js-popup"]').classList.add('popup-update');
        document.querySelectorAll('[rel="js-popup-update-not-change"]').forEach(el => {
            el.classList.add('popup-update-not-change');
        });
    }

    const handleDeleteUser = (taiKhoan) => {
        const textConfirm = `${t('users:label_users_delete_confirm')} ${taiKhoan}`;
        if (window.confirm(textConfirm)) {
            dispatch(DeleteUser(taiKhoan));
            props.setRequestData(new Date());
        }
    }

    useEffect(() => {
        if (user) {
            dispatch(GetUser(user));
        }
    }, [user]);

    const renderData = () => {
        //console.log(data, typeof sortTypes[currentSort].fn);
        return data?.map((item, index) => {
            if (item.maLoaiNguoiDung === 'QuanTri') {
                return (
                    <tr key={index}>
                        <td className="table-item">{item.taiKhoan}</td>
                        <td name="hoTen" className="table-item">{item.hoTen}</td>
                        <td className="table-item">{item.email}</td>
                        <td className="table-item">{item.soDt}</td>
                        <td name="maLoaiNguoiDung" className="table-item">{item.maLoaiNguoiDung}</td>
                        <td className="table-item">
                            <button className="btn btn-success" onClick={() => handleSelectedUser(item.taiKhoan)}><i className="icon-pencil"></i> {t('global:label_global_edit')}</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteUser(item.taiKhoan)}><i className="icon-trash"></i> {t('global:label_global_delete')}</button>
                        </td>
                    </tr>
                )
            }
            else {
                return (
                    <tr key={index}>
                        <td className="table-item">{item.taiKhoan}</td>
                        <td className="table-item">{item.hoTen}</td>
                        <td className="table-item">{item.email}</td>
                        <td className="table-item">{item.soDt}</td>
                        <td className="table-item">{item.maLoaiNguoiDung}</td>
                        <td className="table-item">
                        </td>
                    </tr>
                )
            }
        })
    }
    return (
        <>
            <table className="table table-default">
                <thead>
                    <tr>
                        <th style={{ width: "160px" }}>{t('users:label_users_name')}</th>
                        <th className={`table-sort ${sortTypes[currentSort.type].class}`} onClick={() => handleSort('hoTen')}>{t('users:label_users_full_name')}</th>
                        <th>{t('global:label_global_email')}</th>
                        <th>{t('users:label_users_phone_number')}</th>
                        <th className={`table-sort ${sortTypes[currentSort.type].class}`} onClick={() => handleSort('maLoaiNguoiDung')}>{t('users:label_users_type')}</th>
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

export default DanhSachTaiKhoan
