import React, { useState } from "react";
import { IoMdMenu, IoMdSettings } from "react-icons/io";
import './css/navigation.css'
import logoIcon from '../../../assets/images/logos/logo-icon-only.png'
import { Offcanvas } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { CollectionSvg, DashboardSvg, FileSvg } from "../../svgs/CustomSvgs";
import { useLocation, useNavigate } from "react-router-dom";
import AddEntryModal from "../../entries/AddEntryModal";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../redux/slices/userDetailsSlice";
import { appLoadStart, appLoadStop } from "../../redux/slices/appLoadingSlice";



const navLinks = [
    {
        title: 'Dashboard',
        Icon: ({ width, color, height }) => <DashboardSvg width={width} color={color} height={height} />,
        path: '/dashboard'
    },
    {
        title: 'New Entry',
        Icon: ({ width, color, height }) => <FileSvg width={width} color={color} height={height} />,
        type: 'newEntry'
    },        
    {
        title: 'Settings',
        Icon: ({ width, color }) => <IoMdSettings size={width} color={color} />,
        path: '/settings'
    },
    {
        title: 'Logout',
        Icon: ({ width, color }) => <CiLogout size={width} color={color} />,
        type: 'logout'
    }
]




export default function Navigation(){
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)

    const { pathname } = useLocation()

    const [offCanvasNav, setOffCanvasNav] = useState({ visible: false })
    const [addEntryModal, setAddEntryModal] = useState({ visible: false, hide: null })

    const logout = () => {
        dispatch(appLoadStart())

        const logoutTimer = setTimeout(() => {
            localStorage.clear()
            
            dispatch(clearUserDetails())
            dispatch(appLoadStop())
            
            navigateTo('/')

            dispatch(showAlertMsg({ msg: 'User logged out' }))

            clearTimeout(logoutTimer)
        }, 3000)
    }

    const openOffCanvasNav = () => setOffCanvasNav({ visible: true })
    const hideOffCanvasNav = () => setOffCanvasNav({ visible: false })

    const openAddEntryModal = () => setAddEntryModal({ visible: true, hide: hideAddEntryModal })
    const hideAddEntryModal = () => setAddEntryModal({ visible: false, hide: null })

    const displayNavLinks = navLinks.map((nav_link, i) => {
        const { title, Icon, path, type } = nav_link

        const isActive = path ? pathname.includes(path) ? true : false : false

        const handleNavClick = () => {
            if(type == 'newEntry'){
                openAddEntryModal()
            }

            if(type == 'logout'){
                logout()
            }

            if(path){
                navigateTo(path)
                hideOffCanvasNav()
            }

            return;
        }

        return (
            <div
                key={i}
                onClick={handleNavClick}
                style={{
                    gap: '15px'
                }}
                className="clickable d-flex align-items-center justify-content-start mb-4"
            >
                <Icon 
                    width={'23'}
                    height={'23'}
                    color={
                        isActive
                        ?
                            '#3A5B22'
                        :
                            '#221824'
                    }
                />
                <p className="m-0 p-0 txt-000 fw-500 font-family-OpenSans fw-300 txt-13">
                    { title }
                </p>
            </div>
        )
    })

    return (
        <>
            <div className="navigation-container px-3 py-2 d-flex align-items-center justify-content-between">
                <div className="col-lg-2">
                    <IoMdMenu color="rgba(0, 0, 0, 0.47)" size={30} className="clickable" onClick={openOffCanvasNav} />
                </div>
                <div className="col-lg-4 d-lg-flex d-md-none d-none align-items-center justify-content-center">
                    <h1 className="m-0 p-0 text-center font-family-Sacramento txt-000 fw-400 txt-30">
                        Your thoughts ?
                    </h1>
                </div>
                <div className="col-lg-2 col-md-4 col-4 d-flex align-items-center justify-content-end">
                    <img src={logoIcon} className="col-lg-3 col-md-3 col-3" />
                </div>
            </div>
        
            <Offcanvas
                show={offCanvasNav.visible} 
                onHide={hideOffCanvasNav}
            >
                <div className="d-flex align-items-center justify-content-between py-2 mb-5">
                    <div className="col-lg-3 col-md-3 col-3 d-flex align-items-center justify-content-center">
                        <img src={logoIcon} className="col-lg-5 col-md-5 col-5" />
                    </div>                    
                    <div className="col-lg-4 col-md-4 col-4 d-flex align-items-center justify-content-center">
                        <h1 className="m-0 p-0 txt-000 fw-400 font-family-Sacramento txt-31 text-center">
                            Serene Self
                        </h1>
                    </div>
                    <div className="d-flex align-items-center justify-content-end px-4 mx-1">
                        <IoCloseOutline size={30} color="#3A5B22" className="clickable" onClick={hideOffCanvasNav} />
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex flex-column align-items-start justify-content-center">
                        { displayNavLinks } 
                    </div>
                </div>
            </Offcanvas>

            <AddEntryModal 
                modalProps={addEntryModal}
            />            
        </>
    )
}