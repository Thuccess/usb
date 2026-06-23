'use client';

import AdminCrudList from '@/components/admin/AdminCrudList';

export default function AdminCategoriesPage() {
  return (
    <AdminCrudList
      title="Categories"
      endpoint="/api/admin/categories"
      newHref="/admin/categories/new"
      editHref={(id) => `/admin/categories/${id}`}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'slug', label: 'Slug' },
        { key: 'order', label: 'Order' },
      ]}
    />
  );
}
