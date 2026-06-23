'use client';

import AdminCrudList from '@/components/admin/AdminCrudList';
import { NOTICE_TYPE_LABELS } from '@/lib/utils';

export default function Page() {
  return (
    <AdminCrudList title="Public Notices" endpoint="/api/admin/notices" newHref="/admin/notices/new"
      editHref={(id) => `/admin/notices/${id}`}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type', render: (i) => NOTICE_TYPE_LABELS[i.type as string] || String(i.type) },
        { key: 'priority', label: 'Priority' },
      ]} />
  );
}
