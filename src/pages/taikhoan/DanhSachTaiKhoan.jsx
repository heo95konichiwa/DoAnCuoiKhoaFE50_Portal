import React from 'react'
import { useTranslation } from 'react-i18next';

const DanhSachTaiKhoan = (props) => {
    const { t, i18n } = useTranslation();

    const renderData = () => {
        return props.props?.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="table-item">{item.taiKhoan}</td>
                    <td className="table-item">{item.hoTen}</td>
                    <td className="table-item">{item.email}</td>
                    <td className="table-item">{item.soDt}</td>
                    <td className="table-item">{item.maLoaiNguoiDung}</td>
                    <td className="table-item">
                        <button className="btn btn-success"><i className="icon-pencil"></i> {t('global:label_global_edit')}</button>
                        <button className="btn btn-danger"><i className="icon-trash"></i> {t('global:label_global_delete')}</button>
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
                        <th>{t('users:label_users_name')}</th>
                        <th>{t('users:label_users_full_name')}</th>
                        <th>{t('global:label_global_email')}</th>
                        <th>{t('users:label_users_phone_number')}</th>
                        <th>{t('users:label_users_type')}</th>
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
