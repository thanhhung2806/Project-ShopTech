import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [admins, setAdmins] = useState([])
    const [admin, setAdmin] = useState([])

    useEffect(() => {
        const fetchAdmins = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setAdmins(data.admins)
            })
        }
        fetchAdmins()
    }, [])

    const navigate = useNavigate();

    const [details, setDetails] = useState({ adminName: "", password: "" })

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        admins.map((admin, index) => {
            if (details.adminName == admin.adminName &&
                details.password == admin.password) {
                navigate('/admin/dashboard');
                window.localStorage.setItem('adminNameLogin', admin.adminName);
                alert("Đăng nhập thành công");
            }
        })
        showErrorToast();
    };

    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");

            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);

            // Remove toast when clicked
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "ti-check-box",
                info: "ti-info",
                warning: "ti-close",
                error: "ti-close"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

            toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="ti-close"></i>
                      </div>
                  `;
            main.appendChild(toast);
        }
    }
    function showErrorToast() {
        toast({
            title: 'Đăng nhập thất bại',
            message: 'Tên tài khoản hoặc mật khẩu không chính xác!',
            type: 'error',
            duration: 3000
        })
    }

    return (
        <div className='login--admin-container'>
            <div id="toast"></div>
            
            <div className="login__logo"></div>
            <div className="login__box">
                <label className="login__label-login">Đăng nhập tài khoản</label>
                <form className="login__form" onSubmit={handleSubmitLogin}>
                    <label className="login__label" htmlFor="adminName">Vui lòng nhập tên tài khoản</label>
                    <input
                        class="login__input"
                        //type="text"
                        name="username"
                        onChange={e => setDetails({ ...details, adminName: e.target.value })}
                        value={details.adminName}
                        required
                        minLength={5}
                        placeholder="Admin ..."
                    />

                    <label className="login__label login__label--password" htmlFor="password">Vui lòng nhập mật khẩu</label>
                    <input
                        class="login__input"
                        type="password"
                        name="password"
                        onChange={e => setDetails({ ...details, password: e.target.value })}
                        value={details.password}
                        required
                        minLength={6}
                        placeholder="Password ..."
                    />
                    <button className="login__btn">ĐĂNG NHẬP</button>
                </form>

            </div>
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>


    );
};

export default Login;