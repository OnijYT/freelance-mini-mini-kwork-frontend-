import { useContext, useEffect, useState } from 'react'
import s from './MyJobs.module.css'
import { api } from '../../../api'
import type { Job } from '../joblist/joblist'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'


function MyJobs () {

    const [job, setJob] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [editingid, setEditingid] = useState<number | null>(null)
    const {register, handleSubmit, reset} = useForm<Job>()

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    


    useEffect(() => {
        const getmyjobs = async () => {
            setLoading(true)
            api.get('/jobs/myjobs' )
            .then(res => {
                setJob(res.data)
            })
            .catch(err => {
                if(axios.isAxiosError(err)){
                    alert(err.response?.data?.message || 'ошибка')
                }
                console.error(err)
            })
            .finally(() => setLoading(false))
        }
        getmyjobs()
    }, [])

    const handledeleteitem = async (itemId: number) => {
        const backjob = [...job]
        setJob(job.filter(item => item.id !== itemId))

        try {
            await api.delete(`/jobs/${itemId}`)
        } catch (err) {
            console.error(err)
            setJob(backjob)
            if(axios.isAxiosError(err)) {
                return alert(err.response?.data?.message || 'Ошибка сервера')
            }
        }
    }

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
            <div className={s.pageContainer}>
                <div className={s.loadingSpinner}></div>
            </div>
        )
    }

    // Проверка роли пользователя
    if (!auth?.user) {
        return (
            <div className={s.pageContainer}>
                <div className={s.authCard}>
                    <div className={s.authIcon}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
                        </svg>
                    </div>
                    <h2 className={s.authTitle}>Not Registered</h2>
                    <p className={s.authText}>Please log in to access your jobs</p>
                    <button onClick={() => navigate('/login')} className={s.authBtn}>Go to Login</button>
                </div>
            </div>
        )
    }

    if (auth?.user?.role === 'freelancer') {
        return (
            <div className={s.pageContainer}>
                <div className={s.leftSection}>
                    <div className={s.header}>
                        <h1 className={s.title}>
                            <span className={s.titleGradient}>Welcome, Freelancer!</span>
                        </h1>
                        <p className={s.subtitle}>Ready to take on new opportunities?</p>
                    </div>

                    <div className={s.freelancerCard}>
                        <div className={s.freelancerContent}>
                            <div className={s.freelancerIcon}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6h-2.18c.11-.89.08-1.74-.25-2.65C17.21 2.02 14.04 1 12 1 9.96 1 6.79 2.02 6.43 3.35 6.1 4.26 6.07 5.11 6.18 6H4c-1.1 0-1.99.9-1.99 2v13c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5-2c.85 0 1.58.41 2.04 1.04.63 1.12.89 2.32.7 3.96h-5.48c-.19-1.64.07-2.84.7-3.96C13.42 4.41 14.15 4 15 4z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div className={s.freelancerInfo}>
                                <h3 className={s.freelancerTitle}>Browse Available Jobs</h3>
                                <p className={s.freelancerDesc}>Explore thousands of projects waiting for skilled freelancers like you!</p>
                                <button onClick={() => navigate('/')} className={s.freelancerBtn}>
                                    Explore Jobs
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.rightSection}>
                    <div className={s.dashboard}>
                        <div className={s.dashboardCard}>
                            <div className={s.dashboardIcon}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-7 0c.83 0 1.5.67 1.5 1.5S9.33 14.5 8.5 14.5 7 13.83 7 13s.67-1.5 1.5-1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3 className={s.dashboardTitle}>Freelancer Stats</h3>
                            <div className={s.statItem}>
                                <span className={s.statLabel}>Profile Status</span>
                                <span className={s.statValue} style={{color: '#10B981'}}>Active</span>
                            </div>
                            <div className={s.statItem}>
                                <span className={s.statLabel}>Ready to Work</span>
                                <span className={s.statValue} style={{color: '#3B82F6'}}>Yes!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (auth?.user?.role !== 'client') {
        return (
            <div className={s.pageContainer}>
                <div className={s.authCard}>
                    <div className={s.authIcon} style={{color: '#F59E0B'}}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
                        </svg>
                    </div>
                    <h2 className={s.authTitle}>Only for Clients</h2>
                    <p className={s.authText}>This page is only available for registered clients. Please contact support if you need assistance.</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className={s.pageContainer}>
            <div className={s.leftSection}>
                <div className={s.header}>
                    <h1 className={s.title}>
                        <span className={s.titleGradient}>My Jobs</span>
                    </h1>
                    <p className={s.subtitle}>{job.length} published jobs</p>
                </div>

                {job.length === 0 ? (
                    <div className={s.emptyState}>
                        <div className={s.emptyIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h2 className={s.emptyTitle}>No Jobs Yet</h2>
                        <p className={s.emptyText}>You haven't published any jobs. Create your first job to get started!</p>
                    </div>
                ) : (
                    <div className={s.jobsList}>
                        {job.map((item) => {
                            const statusInfo = getStatusBadge(item.status);
                            return (
                                <div key={item.id} className={s.jobCard}>
                                    <div className={s.cardHeader}>
                                        <div className={s.statusBadge} style={{ borderColor: statusInfo.color, color: statusInfo.color }}>
                                            {statusInfo.label}
                                        </div>
                                        <div className={s.jobId}>ID: {item.id}</div>
                                    </div>

                                    <h2 className={s.jobTitle}>{item.title}</h2>
                                    <p className={s.jobDescription}>{item.description}</p>

                                    <div className={s.cardFooter}>
                                        <div className={s.clientInfo}>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                                            </svg>
                                            <span>Your Job</span>
                                        </div>
                                        <div className={s.price}>${item.price.toLocaleString()}</div>
                                    </div>
                                    
                                    <div className={s.cardActions}>
                                        <button className={s.editBtn}>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Z" fill="currentColor"/>
                                                <path d="m20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="currentColor"/>
                                            </svg>
                                            Edit
                                        </button>
                                        <button className={s.deleteBtn} onClick={() => handledeleteitem(item.id)}>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" fill="currentColor"/>
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className={s.rightSection}>
                <div className={s.dashboard}>
                    <div className={s.dashboardCard}>
                        <div className={s.dashboardIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 className={s.dashboardTitle}>Stats</h3>
                        <div className={s.statItem}>
                            <span className={s.statLabel}>Total Jobs</span>
                            <span className={s.statValue}>{job.length}</span>
                        </div>
                        <div className={s.statItem}>
                            <span className={s.statLabel}>Active</span>
                            <span className={s.statValue}>{job.filter(j => j.status === 'open').length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyJobs