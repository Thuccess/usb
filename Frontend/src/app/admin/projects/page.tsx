'use client';

import AdminCrudList from '@/components/admin/AdminCrudList';
import { PROJECT_CATEGORY_LABELS, STATUS_COLORS } from '@/lib/utils';

export default function Page() {
  return (
    <AdminCrudList title="Development Projects" endpoint="/api/admin/projects" newHref="/admin/projects/new"
      editHref={(id) => `/admin/projects/${id}`}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category', render: (i) => PROJECT_CATEGORY_LABELS[i.category as string] || String(i.category) },
        { key: 'county', label: 'County' },
        { key: 'status', label: 'Status', render: (i) => <span className={`text-xs px-2 py-0.5 rounded ${STATUS_COLORS[i.status as string]}`}>{i.status as string}</span> },
      ]} />
  );
}
