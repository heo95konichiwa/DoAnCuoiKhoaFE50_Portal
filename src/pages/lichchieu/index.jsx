import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../parts/header';
import SidebarLeft from '../../parts/sidebar';
import { connect, useDispatch } from 'react-redux';
import { getCinemaSystem, getInforMovieShowtime, getLocationMovie, getMovieListAdminShowtime, postShowTime } from '../../services/showtimes';
import moment from 'moment';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const Lichchieu = (props) => {

    const { t, i18n } = useTranslation();
    document.title = t('global:label_global_cinema_system');
    const dispatch = useDispatch();
    const [maPhim, setMaPhim] = useState('');
    const [maRap, setMaRap] = useState('');
    const [maHeThongRap, setMaHeThongRap] = useState('');
    const [maCumRap, setMaCumRap] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    useEffect(() => {
        dispatch(getMovieListAdminShowtime());
        dispatch(getCinemaSystem());
        if (maHeThongRap) {
            dispatch(getLocationMovie(maHeThongRap));
        }
        setMaCumRap('')
        setMaRap('')
    }, [dispatch, maHeThongRap])

    useEffect(() => {
        if (maPhim) {
            dispatch(getInforMovieShowtime(maPhim))
        }
        setMaHeThongRap('')
        setMaCumRap('')
        setMaRap('')
    }, [dispatch, maPhim])

    useEffect(() => {
        setMaRap('')
    }, [dispatch, maCumRap])

    const renderMovieList = () => {
        return props.movieList && props.movieList.map((item, index) => {
            return (
                <option key={index} value={item.maPhim}>{item.tenPhim}</option>
            )
        })
    }

    //lay ma phim
    const onChangeMaPhim = (e) => {
        setMaPhim(e.target.value);
    }

    const renderCinemaSystem = () => {
        return props.cynemaSystem && props.cynemaSystem.map((item, index) => {
            return (
                <option key={index} value={item.maHeThongRap}>{item.tenHeThongRap}</option>
            )
        })
    }

    //lay ma he thong rap
    const onChangeMaHeThongRap = (e) => {
        setMaHeThongRap(e.target.value);
    }
    const renderListTheater = () => {
        return props.listTheater && props.listTheater.map((item, index) => {
            return (
                <option key={index} value={item.maCumRap}>{item.tenCumRap}</option>
            )
        })
    }

    //lay ma cum rap
    const onChangeMaCumRap = (e) => {
        setMaCumRap(e.target.value);
    }

    const renderListLocation = () => {
        return props.listTheater && props.listTheater.map((item, index) => {
            if (item.maCumRap === maCumRap) {
                return item.danhSachRap.map((rap, index) => {
                    return (
                        <option key={index} value={rap.maRap}>{rap.tenRap}</option>
                    )
                })
            }
        })
    }

    //lay ma rap
    const onChangeMaRap = (e) => {
        setMaRap(e.target.value);
    }

    //lay ngày
    const onChangeDate = (e) => {
        setDate(e.target.value);
    }

    //lấy giờ
    const onChangeTime = (e) => {
        setTime(e.target.value);
    }
    //lấy giá 
    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    //tạo lịch chiếu
    const onClickShowTime = () => {
        dispatch(postShowTime(maPhim, date, time, maRap, price));
    }

    const renderHeThong = () => {
        if (maHeThongRap) {
            return props.movieInforShowtime && props.movieInforShowtime.heThongRapChieu.map((item, index) => {
                if (item.maHeThongRap === maHeThongRap) {
                    return (
                        <div key={index} className='col-12'>
                            <img style={{ width: '100px' }} src={item.logo} alt='' />
                        </div>
                    )
                }
            })
        } else {
            return props.movieInforShowtime && props.movieInforShowtime.heThongRapChieu.map((item, index) => {
                return (
                    <div key={index} className='col-2'>
                        <img style={{ width: '100px' }} src={item.logo} alt='' />
                    </div>
                )
            })
        }
    }

    const renderCumRap = () => {
        return props.movieInforShowtime && props.movieInforShowtime.heThongRapChieu.map((item, index) => {
            if (item.maHeThongRap === maHeThongRap) {
                if (maCumRap) {
                    return item.cumRapChieu.map((rapChieu, index) => {
                        if (rapChieu.maCumRap === maCumRap) {
                            return (
                                <div className='col-12'>{rapChieu.tenCumRap}</div>
                            )
                        }
                    })
                } else {
                    return item.cumRapChieu.map((product, index) => {
                        return (
                            <div className='col-12' key={index}>
                                <div>{product.tenCumRap}</div>
                            </div>
                        )
                    })
                }
            }
        })
    }

    const renderRap = () => {
        let rap = '';
        let rap2 = '';
        return props.movieInforShowtime && props.movieInforShowtime.heThongRapChieu.map((item, index) => {
            if (item.maHeThongRap === maHeThongRap) {
                return item.cumRapChieu.map((rapChieu, index) => {
                    if (rapChieu.maCumRap === maCumRap) {
                        if (maRap) {
                            return rapChieu.lichChieuPhim.map((lichChieu, index) => {
                                if (lichChieu.maRap === maRap) {
                                    console.log('lichChieu', lichChieu);
                                    if (lichChieu.tenRap !== rap2) {
                                        rap2 = lichChieu.tenRap;
                                        return (
                                            <div className='col-12'>{lichChieu.tenRap}</div>
                                        )
                                    }
                                }
                            })
                        }
                        else {
                            return rapChieu.lichChieuPhim.map((lichChieu, index) => {
                                if (lichChieu.tenRap !== rap) {
                                    rap = lichChieu.tenRap;
                                    return (
                                        <div className='col-12'>{lichChieu.tenRap}</div>
                                    )
                                }

                            })
                        }
                    }
                })
            }
        })
    }

    const renderNgay = () => {
        let date = '';
        return props.movieInforShowtime && props.movieInforShowtime.heThongRapChieu.map((item, index) => {
            if (item.maHeThongRap === maHeThongRap) {
                return item.cumRapChieu.map((rapChieu, index) => {
                    if (rapChieu.maCumRap === maCumRap) {
                        if (maRap) {
                            return rapChieu.lichChieuPhim.map((lichChieu, index) => {
                                if (lichChieu.maRap === maRap) {
                                    if ((new Date(lichChieu.ngayChieuGioChieu).toLocaleDateString()) !== date) {
                                        date = new Date(lichChieu.ngayChieuGioChieu).toLocaleDateString();
                                        return (
                                            <div className='col-12'>
                                                {new Date(lichChieu.ngayChieuGioChieu).toLocaleDateString('vi-VN', { weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    const [value, setvalue] = useState('');
    console.log('value',value);
    return (
        <div className="mainpage-main">
            <Header />
            <div className="contain-main">
                <SidebarLeft />
                <div className={`right-main ${window.innerWidth < 922 ? 'full' : ''}`} rel="js-right-main">
                    <ul className="breadcrumb">
                        <li><a href="/ban-lam-viec">{t('global:label_global_dashboard')}</a></li>
                        <li>{t('global:label_global_cinema_system')}</li>
                    </ul>
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-3'>
                                <div>
                                    <div>
                                        <DayPicker onDayClick = {day => setvalue(moment(day).format('YYYY-MM-DD'))} />;
                                    </div>
                                    <select onChange={e => onChangeMaPhim(e)}>
                                        <option value="none" selected disabled hidden>Chọn phim</option>
                                        {renderMovieList()}
                                    </select>
                                </div>
                                <div>
                                    <select onChange={e => onChangeMaHeThongRap(e)}>
                                        <option value="none" selected disabled hidden>Chọn hệ thống rạp</option>
                                        {renderCinemaSystem()}
                                    </select>
                                </div>
                                <div>
                                    <select onChange={e => onChangeMaCumRap(e)}>
                                        <option value="none" selected disabled hidden>Chọn mã cụm rạp</option>
                                        {renderListTheater()}
                                    </select>
                                </div>
                                <div>
                                    <select onChange={e => onChangeMaRap(e)}>
                                        <option value="none" selected disabled hidden>Chọn rap</option>
                                        {renderListLocation()}
                                    </select>
                                </div>
                                <div>
                                    <input type='text' placeholder='Chọn ngày chiếu' onChange={e => onChangeDate(e)} />
                                </div>
                                <div>
                                    <input type='text' placeholder='Chọn giờ chiếu' onChange={e => onChangeTime(e)} />
                                </div>
                                <div>
                                    <input type='text' placeholder='Giá vé' onChange={e => onChangePrice(e)} />
                                </div>
                                <div>
                                    <button onClick={() => onClickShowTime()}>Tạo Lịch Chiếu</button>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div>
                                    {
                                        props.movieInforShowtime ?
                                            <img style={{ width: '200px' }} src={props.movieInforShowtime.hinhAnh} alt='' />
                                            : null
                                    }
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    {renderHeThong()}
                                    {renderCumRap()}
                                    {renderRap()}
                                    {renderNgay()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        movieList: state.showtime.movieList,
        cynemaSystem: state.showtime.cinemaSystem,
        listTheater: state.showtime.listTheater,
        movieInforShowtime: state.showtime.movieInforShowtime
    }
}

export default connect(mapStateToProps)(Lichchieu);