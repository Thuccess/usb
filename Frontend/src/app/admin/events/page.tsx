'use client';

import AdminCrudList from '@/components/admin/AdminCrudList';
import { formatDate } from '@/lib/utils';

export default function Page() {
  return (
    <AdminCrudList title="Events" endpoint="/api/admin/events" newHref="/admin/events/new"
      editHref={(id) => `/admin/events/${id}`}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'date', label: 'Date', render: (i) => formatDate(i.date as string) },
        { key: 'location', label: 'Location' },
      ]} />
  );
}
