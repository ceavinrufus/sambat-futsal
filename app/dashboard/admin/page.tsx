import AdminSidebar from '@/components/AdminSidebar'
import AuthRoute from '@/components/AuthRoute'
import React from 'react'

function AdminDashboard() {
    return (
        <>
            <AuthRoute role='admin' />
            <AdminSidebar />
        </>
    )
}

export default AdminDashboard