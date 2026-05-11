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
            open: { label: 'Open', color: '#10B981' },
            in_progress: { label: 'In Progress', color: '#F59E0B' },
            completed: { label: 'Completed', color: '#6366F1' }
        };
        return statusConfig[status];
    };

    if (loading) {
        return (
            <div className={s.container}>
                <div className={s.loadingSpinner}></div>
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className={s.container}>
                <div className={s.errorCard}>
                    <p className={s.errorText}>{error || 'Заказ не найден'}</p>
                    <button className={s.backButton} onClick={() => navigate('/')}>
                        ← Вернуться к списку
                    </button>
                </div>
            </div>
        )
    }

    const statusInfo = getStatusBadge(job.status)

    return (
        <div className={s.container}>
            <button className={s.backButton} onClick={() => navigate(-1)}>
                ← Назад
            </button>

            <div className={s.jobCard}>
                {/* Заголовок */}
                <div className={s.header}>
                    <div className={s.headerContent}>
                        <h1 className={s.title}>{job.title}</h1>
                        <span 
                            className={s.statusBadge}
                            style={{ backgroundColor: statusInfo.color }}
                        >
                            {statusInfo.label}
                        </span>
                    </div>
                </div>

                {/* Информация о клиенте */}
                {job.User && (
                    <div className={s.clientInfo}>
                        <div className={s.clientAvatar}>
                            {job.User.fullname.charAt(0)}
                        </div>
                        <div>
                            <p className={s.clientName}>{job.User.fullname}</p>
                            <p className={s.clientEmail}>{job.User.email}</p>
                        </div>
                    </div>
                )}

                {/* Основная информация */}
                <div className={s.infoSection}>
                    <div className={s.priceBox}>
                        <label className={s.label}>Бюджет</label>
                        <p className={s.price}>${job.price}</p>
                    </div>
                </div>

                {/* Описание */}
                <div className={s.descriptionSection}>
                    <h2 className={s.sectionTitle}>Описание заказа</h2>
                    <p className={s.description}>{job.description}</p>
                </div>

                {/* Кнопки действий */}
                <div className={s.actions}>
                    <button className={s.primaryButton}>Взять заказ</button>
                    <button className={s.secondaryButton}>Сообщить</button>
                </div>
            </div>
        </div>
    )
}

export default OneJob