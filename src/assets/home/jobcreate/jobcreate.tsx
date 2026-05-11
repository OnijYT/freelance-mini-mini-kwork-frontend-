import React, { useContext, useEffect, useState } from 'react'
import s from './jobcreate.module.css'
import { api } from '../../../api'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface CreateJob {
    title: string
    description: string
    price: number
}

function Jobcreate () {
    const {register, handleSubmit, reset} = useForm<CreateJob>()
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    

    if (!auth?.user) {
        return <p>Загрузка или нужно войти...</p>

    }

    if (auth.user.role !== 'client') {
        return <p>Доступ запрещен. Только для клиентов.</p>
    }

    const onSubmit = async (data: CreateJob) => {
        try {
            await api.post('/jobs/create', data)

            reset()
            navigate('/')
        } catch (e) {
            console.error(e)
            if(axios.isAxiosError(e)){
                alert(e.response?.data?.message || "Ошибка сервера")
            } else {
                alert("Ошибка")
            }
        }
    }


    return (
        <div className={s.pageContainer}>
            <div className={s.formWrapper}>
                <div className={s.header}>
                    <h1 className={s.title}>
                        <span className={s.titleGradient}>Create New Job</span>
                    </h1>
                    <p className={s.subtitle}>Post a new job and find the perfect freelancer</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    {/* Title Field */}
                    <div className={s.formGroup}>
                        <label htmlFor="title" className={s.label}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/>
                            </svg>
                            Job Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g. Full Stack Developer"
                            className={s.input}
                            {...register('title', { required: true })}
                        />
                    </div>

                    {/* Description Field */}
                    <div className={s.formGroup}>
                        <label htmlFor="description" className={s.label}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
                            </svg>
                            Job Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Describe the job requirements, skills needed, and project details..."
                            className={s.textarea}
                            rows={6}
                            {...register('description', { required: true })}
                        />
                    </div>

                    {/* Price Field */}
                    <div className={s.formGroup}>
                        <label htmlFor="price" className={s.label}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" fill="currentColor"/>
                            </svg>
                            Budget (USD)
                        </label>
                        <input
                            id="price"
                            type="number"
                            placeholder="e.g. 5000"
                            className={s.input}
                            min="0"
                            step="1"
                            {...register('price', { required: true, valueAsNumber: true })}
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className={s.submitBtn}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                        </svg>
                        Create Job
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </form>
            </div>

            {/* Info Cards */}
            <div className={s.infoSection}>
                <div className={s.infoCard}>
                    <div className={s.infoIcon}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <h3 className={s.infoTitle}>Quick Tips</h3>
                    <ul className={s.infoList}>
                        <li>Be clear and specific about requirements</li>
                        <li>Set a realistic budget</li>
                        <li>Include project timeline</li>
                        <li>List required skills</li>
                    </ul>
                </div>

                <div className={s.infoCard}>
                    <div className={s.infoIcon}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <h3 className={s.infoTitle}>Best Practices</h3>
                    <ul className={s.infoList}>
                        <li>Respond to proposals quickly</li>
                        <li>Provide detailed feedback</li>
                        <li>Set clear milestones</li>
                        <li>Communicate regularly</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Jobcreate