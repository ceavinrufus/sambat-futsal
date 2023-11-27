import AuthRoute from '@/components/AuthRoute'
import OwnerSidebar from '@/components/OwnerSidebar'
import React from 'react'

function OwnerDashboard() {
    return (
        <>
            <AuthRoute role='field-owner' />
            <OwnerSidebar />
        </>
    )
}

export default OwnerDashboard