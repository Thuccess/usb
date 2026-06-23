'use client';

import AdminCrudList from '@/components/admin/AdminCrudList';

export default function Page() {
  return (
    <AdminCrudList title="Documents" endpoint="/api/admin/documents" newHref="/admin/documents/new"
      editHref={(id) => `/admin/documents/${id}`}
      columns={[{ key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }]} />
  );
}
