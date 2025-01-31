import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../navigation/Navigation";
import './css/home.css'
import { BookClipSvg, CollectionSvg, DashboardSvg, PlusSvg, SearchSvg } from "../../../svgs/CustomSvgs";
import { formatDate1, monthStrings } from "../../../globals/globals";
import { useDispatch, useSelector } from 'react-redux'
import noEntryImg from '../../../../assets/images/home/noEntryImg.png'
import { getUserDetailsState, setUserDetails } from "../../../redux/slices/userDetailsSlice";
import { BsFeather } from "react-icons/bs";
import AddEntryModal from '../../../entries/AddEntryModal'
import UpdateEntryModal from "../../../entries/UpdateEntryModal";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { appLoadStart, appLoadStop } from "../../../redux/slices/appLoadingSlice";
import { onRequestApi } from "../../../apiRequests/requestApi";
import { showAlertMsg } from "../../../redux/slices/alertMsgSLice";



const DisplayActiveEntry = ({ entry }) => {
    if(!entry){
        return <></>
    }

    const { title, entry_text, id, written_date } = entry

    return (
        <div className="p-4 m-3">
            <h1 className="m-0 p-0 font-family-Sacramento fw-500 txt-35 txt-3A5B22 mb-4">
                { title }
            </h1>
            <p className="m-0 p-0 font-family-SourceCodePro fw-300 txt-18 txt-000">
                { entry_text }
            </p>
        </div>
    )
}



export default function Home(){
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const navigateTo = (path, data) => navigate(path, { state: data })
    const goToAnalytics = (data) => navigateTo('/analytics', data)

    const { pathname } = useLocation()

    const entryPreviewDiv = useRef(null);

    const entries = useSelector(state => getUserDetailsState(state).entries)
    const userDetails = useSelector(state => getUserDetailsState(state).details)
    const accessToken = useSelector(state => getUserDetailsState(state).accessToken)

    const [activeEntry, setActiveEntry] = useState(entries[0])
    const [searchFilter, setSearchFilter] = useState('')
    const [filteredEntries, setFilteredEntries] = useState(entries)
    const [addEntryModal, setAddEntryModal] = useState({ visible: false, hide: null })
    const [updateEntryModal, setUpdateEntryModal] = useState({ visible: false, hide: null })
    const [entryUpdate, setEntryUpdate] = useState()
    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading){
            dispatch(appLoadStart())
        
        } else{
            dispatch(appLoadStop())
        }

        if(isLoading && data){
            const { type, requestInfo } = data

            if(type == 'deleteEntry'){
                onRequestApi({
                    requestInfo,
                    successCallBack: deleteEntrySuccess,
                    failureCallback: deleteEntryFailure
                })
            }
        }
    }, [apiReqs])

    useEffect(() => {
        setFilteredEntries(entries)

        if(entries){
            setActiveEntry(entries[0])
        }
    }, [entries])

    useEffect(() => {
        if(entryUpdate){
            const { _title, _entryText, _entryId, _entryWrittenDate } = entryUpdate
        
            if(_title && _entryText && _entryId){
                openUpdateEntryModal()
            }            
        }
    }, [entryUpdate])

    const deleteEntrySuccess = ({ requestInfo }) => {
        try {

            const { data } = requestInfo
            const { entry_id } = data

            const updatedEntries = entries.filter(entry => entry.entry_id != entry_id)

            if(activeEntry){
                if(activeEntry.entry_id == entry_id){
                    setActiveEntry(updatedEntries[0])
                }
            }

            dispatch(setUserDetails({
                entries: updatedEntries
            }))

            setApiReqs({ isLoading: false, data: null, errorMsg: null })

            dispatch(showAlertMsg({ msg: 'Entry deleted!', type: 'success' }))

            return;
            
        } catch (error) {
            console.error(error)
            return deleteEntryFailure({ errorMsg: "Something went wrong! Try again." })
        }
    }

    const deleteEntryFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })
        dispatch(showAlertMsg({ msg: errorMsg, type: 'error' }))
    }

    const openAddEntryModal = () => setAddEntryModal({ visible: true, hide: hideAddEntryModal })
    const hideAddEntryModal = () => setAddEntryModal({ visible: false, hide: null })

    const openUpdateEntryModal = () => setUpdateEntryModal({ visible: true, hide: hideUpdateEntryModal })
    const hideUpdateEntryModal = () => {
        // setEntryUpdate({ _title: '', _entryText: '', _entryId })
        setUpdateEntryModal({ visible: false, hide: null })

        return;
    }

    const handleSearchFilterChange = e => {
        if(e){
            setSearchFilter(e.target.value)            
        
            if(!e.target.value){
                setFilteredEntries(entries)
            }
        }

        return;
    }

    const handleSearchBtnClick = () => {
        if(searchFilter){
            const _filtered = entries.filter(entry => {
                const { text, title, written_date } = entry
                const dateStr = formatDate1({ date: written_date })
            
                return(
                    //text
                    searchFilter.toLowerCase().includes(text)
                    ||
                    text.toLowerCase().includes(searchFilter)

                    ||

                    //title
                    searchFilter.toLowerCase().includes(title)
                    ||
                    title.toLowerCase().includes(searchFilter)

                    ||

                    //date
                    searchFilter.toLowerCase().includes(dateStr)
                    ||
                    dateStr.toLowerCase().includes(searchFilter)                    
                )
            })

            setFilteredEntries(_filtered)

        } else{
            setFilteredEntries(entries)
        }
        
        
        return;
    }

    const displayEntries = filteredEntries.map((entry, i) => {

        const { entry_id, title, entry_text, written_date } = entry

        const dateStr = formatDate1({ _date: written_date })

        const isActive = activeEntry ? activeEntry.entry_id == entry_id ? true : false : false

        const selectEntry = () => {
            if(entryPreviewDiv.current){
                entryPreviewDiv.current.scrollIntoView({ behavior: "smooth" });
            }

            setActiveEntry(entry)

            return;
        }

        const handleEditEntryBtn = (e) => {
            if(e){
                e.stopPropagation()
                setEntryUpdate({ 
                    _title: title, 
                    _entryText: entry_text, 
                    _entryId: entry_id,
                    _entryWrittenDate: written_date
                })
            }

            return;
        }

        const deleteEntry = (e) => {
            if(e){
                e.stopPropagation()
            }

            return setApiReqs({
                isLoading: true,
                errorMsg: null,
                data: {
                    type: 'deleteEntry',
                    requestInfo: {
                        url: 'users/entries/delete-entry',
                        method: 'POST',
                        data: {
                            entry_id,
                            user_id: userDetails.user_id
                        },
                        token: accessToken
                    }
                }
            })
        }

        const viewAnalysis = (e) => {
            if(e){
                e.stopPropagation()
            }

            setActiveEntry(entry)
            goToAnalytics({ entry })
        }

        return (
            <div
                key={i}
                onClick={selectEntry}
                style={{
                    borderRight: isActive ? '6px solid #22180E63' : 'none',
                    position: 'relative'
                }}
                className="home-single-entry-container p-4 clickable"
            >
                <div className="home-book-clip-container">
                    <BookClipSvg />
                </div>
                <div style={{ gap: '5px' }} className="mb-1 d-flex align-items-center justify-content-between">
                    <h2 className="m-0 p-0 txt-000 fw-500 font-family-Sacramento txt-20">
                        { title }
                    </h2>     
                    <div style={{ gap: '3px' }} className="d-flex align-items-center">
                        <BsFeather onClick={handleEditEntryBtn} size={20} className="clickable" color="#22180E" />                    
                        <MdDelete onClick={deleteEntry} size={20} className="clickable" color="#3A5B22" />
                    </div>               
                </div>
                <p className="m-0 p-0 txt-5A4282 fw-300 txt-13 font-family-OpenSans mb-3">
                    { dateStr }
                </p>
                <p className="m-0 p-0 mb-3 txt-000 fw-300 txt-15 font-family-OpenSans">
                    { 
                        entry_text.length <= 200
                        ?
                            entry_text
                        :
                            entry_text.slice(0, 200) + '...'
                    }
                </p>
                <button
                    onClick={viewAnalysis}
                    style={{
                        border: '1px solid #3A5B22'
                    }}
                    className="px-3 py-2 txt-center txt-11 fw-600 font-family-SourceCodePro txt-000 bg-transparent rounded-3"
                >
                    View anaylsis
                </button>
            </div>
        )
    })

    return (
        <div style={{ minHeight: '100vh' }} className="bg-FDFBFF">
            <Navigation />

            <div className="home-filter-container px-lg-5 px-md-2 px-2 py-2 d-flex align-items-center justify-content-between">
                <div style={{ gap: '10px' }} className="col-lg-6 col-md-6 col-6 d-flex align-items-center">
                    <input
                        type="text"
                        value={searchFilter}
                        onChange={handleSearchFilterChange}
                        className="home-input-filter col-lg-9 col-md-9 col-9 p-2 txt-5A4282 fw-500 font-family-OpenSans txt-18"
                        placeholder="Search entry..."
                    />
                    <div 
                        onClick={handleSearchBtnClick}
                        className="p-2 clickable home-input-search-icon-container"
                    >
                        <SearchSvg />
                    </div>
                </div>

                <div className="col-lg-5 col-md-5 col-5 d-flex align-items-center justify-content-end">
                    <div className="clickable mx-2 mx-md-3 mx-lg-4">
                        <DashboardSvg 
                            color={
                                pathname.includes('dashboard') 
                                ?
                                    '#3A5B22'
                                :
                                    '#221824'
                            } 
                            width={'23'} 
                            height={"22"} 
                        />
                    </div>
                    <div onClick={openAddEntryModal} className="clickable mx-2 mx-md-3 mx-lg-4">
                        <PlusSvg width={'30'} height={'25'} />
                    </div>                                       
                </div>
            </div>

            {
                activeEntry
                ?
                    <div className="writing-bg">
                        <div className="d-lg-flex d-md-block d-block px-lg-5 px-md-3 px-3 align-items-start justify-content-between">
                            <div className="col-lg-5 col-md-12 col-12 mb-lg-0 mb-md-4 mb-4">
                                { displayEntries }
                            </div>
                            <div 
                                ref={entryPreviewDiv}
                                className="col-lg-7 col-md-12 col-12 px-lg-3 px-md-3 px-0"
                            >
                                <div 
                                    style={{
                                        position: 'relative',
                                        padding: '2%'
                                    }}
                                    className="home-entry-preview-container"
                                >
                                    <div
                                        className=""
                                        style={{
                                            height: '1px',
                                            top: '36.5px',
                                            width: '98%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.37)',
                                            position: 'absolute'
                                        }}
                                    />
                                    <div 
                                        className=""
                                        style={{
                                            width: '1px',
                                            height: '95.7%',
                                            left: '36.5px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.37)',
                                            position: 'absolute'
                                        }}
                                    />
                                    <DisplayActiveEntry entry={activeEntry} />
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                        <img src={noEntryImg} className="col-lg-12 col-md-12 col-12" />
                    </div>
            }

            <AddEntryModal 
                modalProps={addEntryModal}
            />

            <UpdateEntryModal 
                modalProps={updateEntryModal}
                entryUpdate={entryUpdate}
            />
        </div>
    )
}