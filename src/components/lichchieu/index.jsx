import React, {useEffect, useState} from 'react'
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next'
import { connect, useDispatch } from 'react-redux';
import * as utils from '../../utils/index'
import { getCinemaSystem, getLocationMovie, getMovieListAdminShowtime,postShowTime } from '../../services/showtimes'

const QLLichChieu = (props) => {
    const { t } = useTranslation();
    const [maPhim, setMaPhim] = useState();
    const [maRap, setMaRap] = useState();
    const [maHeThongRap, setMaHeThongRap] = useState('BHDStar');
    const [maCumRap, setMaCumRap] = useState();
    const [date, setDate] = useState();
    const [time,setTime] = useState();
    const [price, setPrice] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieListAdminShowtime());
        dispatch(getCinemaSystem());
        dispatch(getLocationMovie(maHeThongRap));
    }, [dispatch,maHeThongRap])

    const renderMovieList = () =>{
        return props.movieList && props.movieList.map((item,index)=>{
            return(
                <option key={index} value={item.maPhim}>{item.tenPhim}</option>
            )
        })
    }

    //lay ma phim
    const onChangeMaPhim = (e) =>{
        setMaPhim(e.target.value);
    }

    const renderCinemaSystem = () =>{
        return props.cynemaSystem && props.cynemaSystem.map((item,index)=>{
            return(
                <option key={index} value={item.maHeThongRap}>{item.tenHeThongRap}</option>
            )
        })
    }

    //lay ma he thong rap
    const onChangeMaHeThongRap = (e) =>{
        setMaHeThongRap(e.target.value);
    }
    const renderListTheater = () =>{
        return props.listTheater && props.listTheater.map((item,index)=>{
            return(
                <option key={index} value={item.maCumRap}>{item.tenCumRap}</option>
            )
        })
    }
    
    //lay ma cum rap
    const onChangeMaCumRap = (e) =>{
        setMaCumRap(e.target.value);
    }

    const renderListLocation = () =>{
        return props.listTheater && props.listTheater.map((item,index)=>{
            if(item.maCumRap === maCumRap){
                return item.danhSachRap.map((rap,index)=>{
                    return(
                        <option key={index} value={rap.maRap}>{rap.tenRap}</option>
                    )
                })
            }
        })
    }

    //lay ma rap
    const onChangeMaRap = (e) =>{
        setMaRap(e.target.value);
    }

    //lay ngày
    const onChangeDate = (e) =>{
        setDate(utils.ConvertDateDMY(e.target.value));
    }

    //lấy giờ
    const onChangeTime = (e) =>{
        setTime(e.target.value);
    }
    //lấy giá 
    const onChangePrice = (e) =>{
        setPrice(e.target.value);
    }

    //tạo lịch chiếu
    const onClickShowTime = () =>{
        dispatch(postShowTime(maPhim,date,time,maRap,price));
    }

    return (
        <Fragment>
            <div className="col-12">
                <div className="block-default">
                    <div className="block-header">
                        <i className="icon-grid" /> {t('global:label_global_cinema_showtimes')}
                    </div>
                    <div className="block-body">
                        <div className="row">
                            <div className="col-3">
                                <label className="form-label">{t('cinema:label_cinema_choose_movie')}</label>
                                <select className="form-control mb-3" onChange={e => onChangeMaPhim(e)}>
                                    <option value="" selected disabled hidden>{t('cinema:label_cinema_choose_movie')}</option>
                                    {renderMovieList()}
                                </select>
                            </div>
                            <div className="col-3">
                                <label className="form-label">{t('cinema:label_cinema_choose_system')}</label>
                                <select className="form-control mb-3" onChange={e => onChangeMaHeThongRap(e)}>
                                    <option value="" selected disabled hidden>{t('cinema:label_cinema_choose_system')}</option>
                                    {renderCinemaSystem()}
                                </select>
                            </div>
                            <div className="col-3">
                                <label className="form-label">{t('cinema:label_cinema_choose_cluster')}</label>
                                <select className="form-control mb-3" onChange={e => onChangeMaCumRap(e)}>
                                    <option value="" selected disabled hidden>{t('cinema:label_cinema_choose_cluster')}</option>
                                    {renderListTheater()}
                                </select>
                            </div>
                            <div className="col-3">
                                <label className="form-label">{t('cinema:label_cinema_choose_cinema')}</label>
                                <select className="form-control mb-3" onChange={e => onChangeMaRap(e)}>
                                    <option value="" selected disabled hidden>{t('cinema:label_cinema_choose_cinema')}</option>
                                    {renderListLocation()}
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="cinema-date" className="form-label">{t('cinema:label_cinema_input_date')}</label>
                                <div className="input-group mb-3">
                                    <input id="cinema-date" className="form-control" type="date" placeholder={t('cinema:label_cinema_input_date')} min={utils.setMinDate()} onChange={e => onChangeDate(e)} />
                                </div>
                            </div>
                            <div className="col-4">
                                <label htmlFor="cinema-time" className="form-label">{t('cinema:label_cinema_input_time')}</label>
                                <div className="input-group mb-3">
                                    <input id="cinema-time" className="form-control" type="time" placeholder={t('cinema:label_cinema_input_time')} onChange={e => onChangeTime(e)} />
                                </div>
                            </div>
                            <div className="col-4">
                                <label htmlFor="cinema-price" className="form-label">{t('cinema:label_cinema_input_price')}</label>
                                <div className="input-group mb-3">
                                    <input id="cinema-price" className="form-control" type="text" placeholder={t('cinema:label_cinema_input_price')} onChange={e => onChangePrice(e)} />
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button className="btn btn-success mb-3" onClick={() => onClickShowTime()}>{t('cinema:label_cinema_create')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        movieList: state.showtime.movieList,
        cynemaSystem: state.showtime.cinemaSystem,
        listTheater: state.showtime.listTheater
        // movieDetailShowTime: state.showtimeReducer.detailShowTime,
    }
}

export default connect(mapStateToProps)(QLLichChieu);
