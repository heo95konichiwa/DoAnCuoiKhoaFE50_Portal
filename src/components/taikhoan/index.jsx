import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as utils from '../../utils/index'
import InsertUpdateForm from '../../pages/taikhoan/InsertUpdateForm'
import DanhSachTaiKhoan from '../../pages/taikhoan/DanhSachTaiKhoan'
import Axios from 'axios'
import Pagination from "react-js-pagination"
import { useDispatch } from 'react-redux'
import { getUserListSuccess } from '../../services/users'

const QLDanhSachTaiKhoan = () => {
    const { t } = useTranslation();
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState();

    let [totalPerPage = 12, setTotalPerPage] = useState();
    let [totalPages = 1, setTotalPages] = useState();
    let [activePage = 1, setCurrentPage] = useState();
    let [totalCount = 1, setTotalCount] = useState();
    const [requestData, setRequestData] = useState(new Date());

    const handleInsertUser = () => {
        document.querySelectorAll('[rel="js-popup"] input').forEach(el => {
            el.value = '';
        })
        utils.showPopup();
    }

    useEffect(async () => {
        const fetchData = async () => {
            let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?maNhom=GP05`;
            if (searchKey) url += `&tuKhoa=${searchKey}`;
            if (activePage) url += `&soTrang=${activePage}`;
            if (totalPerPage) url += `&soPhanTuTrenTrang=${totalPerPage}`;
            try {
                const res = await Axios.get(url);
                if (res.status === 200 || res.status === 201) {
                    dispatch(getUserListSuccess(res.data));
                    setData(res.data.items);
                    setTotalPages(res.data.totalPages);
                    setTotalCount(res.data.totalCount);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        await fetchData();
    }, [searchKey, totalPerPage, totalPages, activePage, totalCount, requestData, setData]);

    return (
        <Fragment>
            <div className="col-12">
                <div className="block-default">
                    <div className="block-header">
                        <i className="icon-grid" /> {t('global:label_global_user_list')}
                    </div>
                    <div className="block-body">
                        <div className="block-actions-top">
                            <div className="btn-groups">
                                <button className="btn btn-success" onClick={handleInsertUser}><i className="icon-plus" /> {t('global:label_global_add')}</button>
                            </div>
                            <div className="search">
                                {t('global:label_global_search')}
                                <input className="form-control search-input" type="text" placeholder={t('global:label_global_enter_keyword')} onChange={e => setSearchKey(e.target.value)} />
                            </div>
                        </div>
                        <DanhSachTaiKhoan props={data} setRequestData={setRequestData} />
                        <div className="block-actions-bottom">
                            <div className="show-per-page">{t('global:label_global_show')}
                                <select onChange={e => {setTotalPerPage(e.target.value); setCurrentPage(1)}}>
                                    <option value="12">12</option>
                                    <option value="24">24</option>
                                    <option value="48">48</option>
                                    <option value="96">96</option>
                                </select>
                            </div>
                            <Pagination activePage={activePage} itemsCountPerPage={parseInt(totalPerPage)} totalItemsCount={totalCount} pageRangeDisplayed={totalPages} onChange={setCurrentPage} />
                        </div>
                    </div>
                </div>
            </div>
            <InsertUpdateForm props={data} setRequestData={setRequestData} />
        </Fragment>
    )
}

export default QLDanhSachTaiKhoan
