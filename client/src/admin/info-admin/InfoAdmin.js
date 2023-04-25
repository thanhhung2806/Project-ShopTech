import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalLoading from '../common/ModalLoading';
import AdminSidebar from '../common/AdminSidebar';
import AdminHeader from '../common/AdminHeader';

const InfoAdmin = ({ socket }) => {
    const [admins, setAdmins] = useState([])
    const [adminName, setAdminName] = useState('')
    const [adminID, setAdminID] = useState('')
    const [avatarUrlAdmin, setAvatarUrlAdmin] = useState('')
    const [fullname, setFullname] = useState('')
    const [emailAdmin, setEmailAdmin] = useState('')
    const [phoneAdmin, setPhoneAdmin] = useState('')
    const [addressAdmin, setAddressAdmin] = useState('')

    const [fullnameEdit, setFullnameEdit] = useState('')
    const [emailAdminEdit, setEmailAdminEdit] = useState('')
    const [phoneAdminEdit, setPhoneAdminEdit] = useState('')
    const [addressAdminEdit, setAddressAdminEdit] = useState('')

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
            })
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        // show thông tin admin đăng nhập
        admins.map((admin, index) => {
            if (admin.adminName == window.localStorage.getItem('adminNameLogin')) {
                setAdminID(admin.adminID);
                setAdminName(admin.adminName);
                setFullname(admin.fullname);
                setAvatarUrlAdmin(admin.avatarUrl);
                setEmailAdmin(admin.email);
                setPhoneAdmin(admin.phone);
                setAddressAdmin(admin.address);
            }
        })
        handleLoadOptionSelected(5)
    })

    const handleLoadOptionSelected = (index) => {
        const optionItems = document.querySelectorAll('.sidebar__component-item')
        const optionItemActive = document.querySelector(".sidebar__component-item.sidebar__component-item--active")
        optionItems.forEach((item, i) => {
            if (optionItemActive) {
                optionItemActive.classList.remove("sidebar__component-item--active")
            }
        })
        optionItems[index].classList.add("sidebar__component-item--active")
    }

    const changeImageAdmin = () => {
        const preview = document.querySelector(".info-page__avatar-img")
        const imageAdmin = document.querySelector("#avatar-change-input").files[0]
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false)

        if (imageAdmin) {
            reader.readAsDataURL(imageAdmin)
        }
    }

    const handleConfirmChange = (e) => {
        e.preventDefault()
        const avatarUrl = document.querySelector(".info-page__avatar-img").getAttribute("src")
        if (window.confirm("Bạn có chắc muốn cập nhật lại thông tin cá nhân của mình?") === true) {
            socket.emit("editInfoAdmin", {
                avatarUrl: avatarUrl,
                adminID,
                fullname: fullnameEdit,
                email: emailAdminEdit,
                phone: phoneAdminEdit,
                address: addressAdminEdit
            })
            handLoadingPage(1)
            setTimeout(() => {
                window.location.href = window.location.href;
            })
        }
    }

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
    }

    return (
        <div className='customer__container'>
            <ModalLoading />
            <AdminSidebar />
            <div id="admin-box">
                <AdminHeader />
                <div className="admin__title">
                    <label className='admin__tilte-label'>Chào một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang thông tin quản trị viên</label>
                </div>

                <div className='info-page__group'>
                    <div className="info-page__header">CHỈNH SỬA THÔNG TIN QUẢN TRỊ VIÊN</div>

                    <div className="info-page__body">
                        <div className="info-page__col-1">
                            <div className="info-page__avatar">
                                <img className="info-page__avatar-img" src={avatarUrlAdmin}></img>
                            </div>
                            <input type='file' className="info-page__avatar-input" id="avatar-change-input" onChange={(e) => { changeImageAdmin() }} hidden></input>
                            <label className="info-page__avatar-btn" htmlFor="avatar-change-input">Thay đổi Avatar</label>
                            <label className="info-page__user-id">{adminName}</label>
                        </div>

                        <div className='info-page__col-2'>
                            <label className="info-page__title">Thông tin cá nhân</label>

                            <div className="info-page__box-info">
                                <label className="info-page__label">Mã khách hàng</label>
                                <input style={{ fontWeight: 'bold' }}
                                    readOnly
                                    className='info-page__input info-page__input--readonly'
                                    value={adminID} />

                                <label className="info-page__label">Họ và tên đầy đủ</label>
                                <input className='info-page__input' defaultValue={fullname} onChange={(e) => { setFullnameEdit(e.target.value); }} />

                                <label className="info-page__label">Email</label>
                                <input className='info-page__input' defaultValue={emailAdmin} onChange={(e) => setEmailAdminEdit(e.target.value)} />

                                <label className="info-page__label">Số điện thoại</label>
                                <input className='info-page__input' minLength="10" maxLength="10" defaultValue={phoneAdmin} onChange={(e) => setPhoneAdminEdit(e.target.value)} />

                                <label className="info-page__label">Địa chỉ</label>
                                <input className='info-page__input' defaultValue={addressAdmin} onChange={(e) => setAddressAdminEdit(e.target.value)} />

                            </div>
                        </div>
                    </div>

                    <div className="info-page__footer">
                        <button className="info-page__btn" onClick={handleConfirmChange}>Xác nhận<i className="ti-check"></i></button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default InfoAdmin;