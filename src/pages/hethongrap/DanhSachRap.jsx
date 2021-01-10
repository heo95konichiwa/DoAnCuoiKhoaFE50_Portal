import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const QLDanhSachRap = (props) => {
    const { t, i18n } = useTranslation();
    let [currentSort = { key: 'tenHeThongRap', type: 'up' }, setCurentSort] = useState();
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

    const renderData = () => {
        //console.log(data, typeof sortTypes[currentSort].fn);
        return data?.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="table-item">{item.maHeThongRap}</td>
                    <td className="table-item">{item.tenHeThongRap}</td>
                    <td className="table-item table-item-image">{<img src={item.logo} alt={item.tenHeThongRap} />}</td>
                    <td className="table-item">{item.biDanh}</td>
                </tr>
            )
        })
    }
    return (
        <>
            <table className="table table-default">
                <thead>
                    <tr>
                        <th className={`table-sort ${sortTypes[currentSort.type].class}`} onClick={() => handleSort('maHeThongRap')}>{t('cinema:label_cinema_id')}</th>
                        <th className={`table-sort ${sortTypes[currentSort.type].class}`} onClick={() => handleSort('tenHeThongRap')}>{t('cinema:label_cinema_name')}</th>
                        <th>{t('global:label_global_image')}</th>
                        <th>Link SEO</th>
                    </tr>
                </thead>
                <tbody>
                    {renderData()}
                </tbody>
            </table>
        </>
    )
}

export default QLDanhSachRap
