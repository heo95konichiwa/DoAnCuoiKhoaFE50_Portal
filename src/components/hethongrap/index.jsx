import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as utils from '../../utils/index'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { getDataListSuccess } from '../../services/cinema'
import QLDanhSachRap from '../../pages/hethongrap/DanhSachRap'

const QLHeThongRap = () => {
    const { t } = useTranslation();
    const [data, setData] = useState();
    const dispatch = useDispatch();

    useEffect(async () => {
        const fetchData = async () => {
            let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`;
            try {
                const res = await Axios.get(url);
                if (res.status === 200 || res.status === 201) {
                    dispatch(getDataListSuccess(res.data));
                    setData(res.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        await fetchData();
        console.log(data);
    }, [setData]);

    return (
        <Fragment>
            <div className="col-12">
                <div className="block-default">
                    <div className="block-header">
                        <i className="icon-grid" /> {t('global:label_global_cinema_system')}
                    </div>
                    <div className="block-body">
                        <QLDanhSachRap props={data} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default QLHeThongRap