import { useParams, useNavigate } from 'react-router-dom'
import s from './OneJob.module.css'
import { useEffect, useState } from 'react'
import { api } from '../../../api'
import type { Job } from '../joblist/joblist'


function OneJob() { 
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        api.get(`/jobs/${id}`)
            .then(res => {
                setJob(res.data)
                setError(null)
            })
            .catch(err => {
                console.error(err)
                setError('Не удалось загрузить заказ')
            })
            .finally(() => setLoading(false))
    }, [id])

    const getStatusBadge = (status: Job['status']) => {
        const statusConfig = {
            open: { label: 'Open', color: '#10B981', icon: '🟢' },
            in_progress: { label: 'In Progress', color: '#F59E0B', icon: '🔄' },
            completed: { label: 'Completed', color: '#6366F1', icon: '✅' }
        };
        return statusConfig[status];
    };

    if (loading) {
        return (
            <div className={s.container}>
                <div className={s.loadingContainer}>
                    <div className={s.loadingSpinner}></div>
                    <p className={s.loadingText}>Загрузка заказа...</p>
                </div>
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className={s.container}>
                <div className={s.errorCard}>
                    <div className={s.errorIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className={s.errorText}>{error || 'Заказ не найден'}</p>
                    <button className={s.backButton} onClick={() => navigate('/')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Вернуться к списку
                    </button>
                </div>
            </div>
        )
    }

    const statusInfo = getStatusBadge(job.status)
    const createdDate = new Date(job.createdAt).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className={s.container}>
            <div className={s.topBar}>
                <button className={s.backButton} onClick={() => navigate(-1)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Назад
                </button>
                <div className={s.shareButton}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Поделиться
                </div>
            </div>

            <div className={s.jobCard}>
                {/* Заголовок */}
                <div className={s.header}>
                    <div className={s.headerTop}>
                            <span
                            className={s.statusBadge}
                            style={{ backgroundColor: statusInfo.color }}
                        >
                            <span className={s.statusIcon}>{statusInfo.icon}</span>
                            {statusInfo.label}
                        </span>
                    </div>
                    <h1 className={s.title}>{job.title}</h1>
                    <div className={s.metaInfo}>
                        <div className={s.metaItem}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Опубликовано {createdDate}
                        </div>
                    </div>
                </div>

                <div className={s.mainContent}>
                    <div className={s.leftColumn}>
                        {/* Информация о клиенте */}
                        {job.User && (
                            <div className={s.clientCard}>
                                <div className={s.clientHeader}>
                                    <h3 className={s.clientCardTitle}>Заказчик</h3>
                                </div>
                                <div className={s.clientInfo}>
                                    <div className={s.clientAvatar}>
                                        {job.User.fullname.charAt(0)}
                                    </div>
                                    <div className={s.clientDetails}>
                                        <p className={s.clientName}>{job.User.fullname}</p>
                                        <p className={s.clientEmail}>{job.User.email}</p>
                                    </div>
                                </div>
                                <button className={s.contactButton}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Связаться
                                </button>
                            </div>
                        )}

                        {/* Бюджет */}
                        <div className={s.priceCard}>
                            <div className={s.priceHeader}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Бюджет проекта</span>
                            </div>
                            <p className={s.price}>${job.price}</p>
                            <div className={s.priceNote}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Фиксированная цена
                            </div>
                        </div>

                    </div>

                    <div className={s.rightColumn}>
                        {/* Описание */}
                        <div className={s.descriptionSection}>
                            <h2 className={s.sectionTitle}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Описание заказа
                            </h2>
                            <p className={s.description}>{job.description}</p>
                        </div>


                        {/* Кнопки действий */}
                        <div className={s.actions}>
                            <button className={s.primaryButton}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Откликнуться на заказ
                            </button>
                            <button className={s.secondaryButton}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Декоративные элементы */}
            <div className={s.backgroundDecoration}>
                <div className={s.circle1}></div>
                <div className={s.circle2}></div>
                <div className={s.circle3}></div>
            </div>
        </div>
    )
}

export default OneJob
