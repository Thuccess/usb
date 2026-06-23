'use client';

import AdminCrudList from '@/components/admin/AdminCrudList';

export default function Page() {
  return (
    <AdminCrudList title="Galleries" endpoint="/api/admin/galleries" newHref="/admin/galleries/new"
      editHref={(id) => `/admin/galleries/${id}`}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type' },
        { key: 'items', label: 'Items', render: (i) => String((i.items as unknown[])?.length || 0) },
      ]} />
  );
}
