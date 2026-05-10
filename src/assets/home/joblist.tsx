import { useContext, useEffect, useState } from 'react';
import s from './joblist.module.css'
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export interface Job {
    id: number;
    title: string;
    description: string;
    price: number;
    status: 'open' | 'in_progress' | 'completed';
    clientId: number;
}

function Joblist() {
    const [jobs, setJob] = useState<Job[]>([])
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    useEffect(() => {
        api.get<Job[]>('/jobs/')
            .then(res => setJob(res.data))
            .catch(e => console.error(e))
    }, [])

    const getStatusBadge = (status: Job['status']) => {
        const statusConfig = {
            open: { label: 'Open', color: '#10B981' },
            in_progress: { label: 'In Progress', color: '#F59E0B' },
            completed: { label: 'Completed', color: '#6366F1' }
        };
        return statusConfig[status];
    };

    return (
        <div className={s.pageContainer}>
            {/* Левая сторона - Список заданий */}
            <div className={s.leftSection}>
                <div className={s.header}>
                    <h1 className={s.title}>
                        <span className={s.titleGradient}>Available Jobs</span>
                    </h1>
                    <p className={s.subtitle}>{jobs.length} active projects</p>
                </div>

                <div className={s.jobsList}>
                    {jobs.map((job) => {
                        const statusInfo = getStatusBadge(job.status);
                        return (
                            <div key={job.id} className={s.jobCard}>
                                <div className={s.cardHeader}>
                                    <div className={s.statusBadge} style={{ borderColor: statusInfo.color, color: statusInfo.color }}>
                                        {statusInfo.label}
                                    </div>
                                    <div className={s.jobId}>ID: {job.id}</div>
                                </div>

                                <h2 className={s.jobTitle}>{job.title}</h2>
                                <p className={s.jobDescription}>{job.description}</p>

                                <div className={s.cardFooter}>
                                    <div className={s.clientInfo}>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                                        </svg>
                                        <span>Client ID: {job.clientId}</span>
                                    </div>
                                    <div className={s.price}>${job.price.toLocaleString()}</div>
                                </div>

                                <button className={s.applyBtn}>
                                    Apply Now
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Правая сторона - Dashboard */}
            <div className={s.rightSection}>
                <div className={s.dashboard}>
                    {/* Post a Job */}
                    <div className={s.dashboardCard}>
                        <div className={s.dashboardIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 className={s.dashboardTitle}>Post a Job</h3>
                        <p className={s.dashboardText}>Create a new job posting and find the perfect freelancer</p>
                        <button className={s.dashboardBtn} onClick={() => {
                            if(!auth?.user) {
                                return alert('Авторизуйтесь')
                            }
                            if(auth?.user?.role !== 'client'){
                                return alert('Вы не клиент')
                            }
                            navigate('/create-job')
                        }}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/>
                            </svg>
                            Create Job
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={s.dashboardCard}>
                        <div className={s.dashboardIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM18 14H6V12H18V14ZM18 11H6V9H18V11ZM18 8H6V6H18V8Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 className={s.dashboardTitle}>Messages</h3>
                        <p className={s.dashboardText}>Chat with clients and manage your conversations</p>
                        <div className={s.messageStats}>
                            <div className={s.statItem}>
                                <span className={s.statNumber}>5</span>
                                <span className={s.statLabel}>Unread</span>
                            </div>
                            <div className={s.statItem}>
                                <span className={s.statNumber}>12</span>
                                <span className={s.statLabel}>Total</span>
                            </div>
                        </div>
                    </div>

                    {/* My Proposals */}
                    <div className={s.dashboardCard}>
                        <div className={s.dashboardIcon}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 className={s.dashboardTitle}>My Proposals</h3>
                        <p className={s.dashboardText}>Track your submitted proposals and their status</p>
                        <button className={s.dashboardBtn}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                            </svg>
                            View Proposals
                        </button>
                        <div className={s.proposalStats}>
                            <div className={s.proposalStatItem}>
                                <span className={s.proposalDot} style={{background: '#10B981'}}></span>
                                <span>3 Active</span>
                            </div>
                            <div className={s.proposalStatItem}>
                                <span className={s.proposalDot} style={{background: '#F59E0B'}}></span>
                                <span>2 Pending</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className={s.statsCard}>
                        <h3 className={s.statsTitle}>Quick Stats</h3>
                        <div className={s.statsGrid}>
                            <div className={s.statBox}>
                                <div className={s.statBoxIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className={s.statBoxContent}>
                                    <span className={s.statBoxNumber}>{jobs.length}</span>
                                    <span className={s.statBoxLabel}>Total Jobs</span>
                                </div>
                            </div>
                            <div className={s.statBox}>
                                <div className={s.statBoxIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className={s.statBoxContent}>
                                    <span className={s.statBoxNumber}>8</span>
                                    <span className={s.statBoxLabel}>In Progress</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Joblist