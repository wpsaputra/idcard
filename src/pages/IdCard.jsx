import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
const axios = require('axios');

export default function IdCard({match, location}) {
    const [state, setState] = useState({
        isLoading: true,
        pegawai: {},
        isNotFound: false,
        jabatan: {},
        tmt: "",
        nm_satker:"",
        alamat: "",
        pangkat: "",
        nm_golongan: "",
    });

    const loadPegawaiDetail = () => {
        // setState({ count: state.count + 1 });
        // axios.get(url_api+'/records/anime/'+match.params.animeId+'?join=genre')
        // axios.get(url_api+'/records/anime?filter=link,eq,'+match.params.animeId+'&join=genre&join=rating&join=source&join=status&join=studio&join=type')
        
        // axios.get('https://webapps.bps.go.id/sultra/idcard/api.php/records/idcard/'+match.params.niplama+'?join=instansi')
        axios.get(`https://sultradata.com/project/idcard-api/api.php/records/users?filter=niplama,eq,${match.params.niplama}&join=users_jabatan,master_satker&join=users_golongan,master_golongan`)
            .then(function (response) {
                // handle success
                console.log(response.data.records[0]);
                let jabatan = response.data.records[0].users_jabatan[response.data.records[0].users_jabatan.length-1];
                let tmt = jabatan.tmt.split("-");
                tmt = tmt[2]+"-"+tmt[1]+"-"+tmt[0];
                let nm_satker = jabatan.id_satker.nm_satker;
                let alamat = jabatan.id_satker.alamat;

                let golongan = response.data.records[0].users_golongan[response.data.records[0].users_golongan.length-1].id_golongan;
                let pangkat = golongan.pangkat;
                let nm_golongan = golongan.nm_golongan;

                console.log("golongan", golongan);
                console.log("pangkat", pangkat);
                console.log("nm_golongan", nm_golongan);


                setState({ ...state, pegawai: response.data.records[0], isLoading: false,  jabatan: jabatan, tmt: tmt, nm_satker: nm_satker, alamat: alamat, 
                    pangkat: pangkat, 
                    nm_golongan: nm_golongan
                });
                // console.log(response.data.records[0]);
                // console.log(response.data.records.length);
                // if (typeof response.data.records[0] === 'undefined') {
                //     setState({ ...state, isNotFound: true });
                // }else{
                //     setState({ ...state, anime: response.data.records[0], isLoading: false });
                // }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setState({ ...state, isNotFound: true });
            })

    }

    useEffect(() => {
        loadPegawaiDetail();
    }, [match.params.episodeId]);
    
    return (
        <div>
            <header className="header_area">
                <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container box_1620">
                    <a className="navbar-brand logo_h" href="#"><img
                        src="./files/logo.webp" alt=""/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{visibility: "hidden"}}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    </div>
                </nav>
                </div>
            </header>
            <section className="home_banner_area">
                <div className="container box_1620" style={{marginBottom: "50px"}}>
                    <div className="banner_inner d-flex align-items-center">
                        <div className="banner_content">
                        <div className="media">
                            <div className="d-flex">
                            {/* <img src="./images/edy.png" alt=""/> */}
                            <img src={"https://webapps.bps.go.id/sultra/idcard/images/"+state.pegawai.niplama+".png"} alt=""/>
                            </div>
                            <div className="media-body">
                            <div className="personal_text">
                                <h6>Hello Everybody, i am</h6>
                                {/* <h3>Moh Edy Mahmud, S.Si, M.P</h3> */}
                                <h3>{state.pegawai.nama_lengkap+", "+state.pegawai.gelar_belakang}</h3>
                                {/* <h4>Kepala BPS Provinsi Sulawesi Tenggara</h4> */}
                                <h4>{state.jabatan.nm_jabatan} (TMT {state.tmt})</h4>
                                {/* <h4>{state.pegawai.users_jabatan}</h4> */}
                                <br/>
                                <ul className="list basic_info">
                                    {/* <li><a href="#"><i className="lnr lnr-calendar-full"></i> 196902151991121001</a></li> */}
                                    <li><a href="#"><i className="lnr lnr-calendar-full"></i> {state.pegawai.nipbaru}</a></li>
                                    {/* <li><a href="#"><i className="lnr lnr-license"></i> IV/c</a></li> */}
                                    {/* <li><a href="#"><i className="lnr lnr-license"></i> {state.pegawai.pangkat}</a></li> */}
                                    <li><a href="#"><i className="lnr lnr-license"></i> {state.pangkat+" ("+state.nm_golongan+")"}</a></li>
                                    {/* <li><a href="#"><i className="lnr lnr-phone-handset"></i> +62 813-5128-9800</a></li> */}
                                    {/* <li><a href="#"><i className="lnr lnr-envelope"></i>edimahmud@bps.go.id</a></li> */}
                                    <li><a href="#"><i className="lnr lnr-envelope"></i>{state.pegawai.email}</a></li>
                                    {/* <li><a href="#"><i className="lnr lnr-home"></i> BPS Provinsi Sulawesi Tenggara, </a></li> */}
                                    {/* <li style={{marginTop: "-20px"}}><a href="#"><i className="lnr lnr-home" style={{visibility: "hidden"}}></i> Jl. Boulevard No 1 Mokoau, Kambu, Kendari, Sulawesi Tenggara </a></li> */}
                                    {/* <li><a href="#"><i className="lnr lnr-home"></i> {state.pegawai.id_satker.instansi+","} </a></li> */}
                                    
                                    {/* {typeof state.pegawai.id_satker!=='undefined' ? (
                                        <li><a href="#"><i className="lnr lnr-home"></i> {state.pegawai.id_satker.instansi} </a></li>
                                    ) : (
                                        <></>
                                    )} */}
                                    <li><a href="#"><i className="lnr lnr-home"></i> {state.nm_satker} </a></li>


                                    {/* {typeof state.pegawai.id_satker!=='undefined' ? (
                                        // <li><a href="#"><i className="lnr lnr-home"></i> {state.pegawai.id_satker.instansi} </a></li>
                                        <li style={{marginTop: "-20px"}}><a href="#" style={{display: "inline-block"}}><i className="lnr lnr-home" style={{visibility: "hidden"}}></i> {state.pegawai.id_satker.alamat} </a></li>
                                    ) : (
                                        <></>
                                    )} */}
                                    <li style={{marginTop: "-20px"}}><a href="#" style={{display: "inline-block"}}><i className="lnr lnr-home" style={{visibility: "hidden"}}></i> {state.alamat} </a></li>
                                </ul>
                                {state.isNotFound ? (
                                    // <Redirect to={{pathname: '/404'}} />
                                    <Redirect to={{pathname: '/'}} />
                                ) : (
                                    <div/>
                                )}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
