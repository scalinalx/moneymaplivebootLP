import React from 'react';
import AdminDashboard from '@/components/admidash/AdminDashboard';
import './admidash.css';

export const metadata = {
    title: 'Command Centre',
    description: 'Internal admin dashboard',
    robots: 'noindex, nofollow',
};

export default function AdminDashPage() {
    return <AdminDashboard />;
}
