'use client';

import AdminCrudList from '@/components/admin/AdminCrudList';

export default function Page() {
  return (
    <AdminCrudList title="Ministries" endpoint="/api/admin/ministries" newHref="/admin/ministries/new"
      editHref={(id) => `/admin/ministries/${id}`}
      columns={[{ key: 'name', label: 'Name' }, { key: 'slug', label: 'Slug' }]} />
  );
}
