import React from "react";
import s from './header.module.css'

function Header() {

    

    return (
        <header className={s.header}>
            <div className={s.container}>
                {/* Логотип / Название платформы */}
                <div className={s.logo}>
                    <svg className={s.logoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#3B82F6" />
                        <path d="M2 17L12 22L22 17" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={s.logoText}>Freelance Platform</span>
                </div>

                {/* Навигация */}
                <nav className={s.nav}>
                    <a href="#" className={`${s.navLink} ${s.active}`}>Find Jobs</a>
                    <a href="#" className={s.navLink}>My Jobs</a>
                    <a href="#" className={s.navLink}>Messages</a>
                </nav>
                {/* Профиль пользователя */}
                <div className={s.userSection}>
                    <img 
                        className={s.avatar} 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" 
                        alt="Avatar" 
                    />
                    <span className={s.userName}>Client (Alex)</span>
                    <svg className={s.dropdownArrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Иконка уведомлений */}
                <button className={s.notificationBtn}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header