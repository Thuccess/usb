import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { formatDate, NOTICE_TYPE_LABELS, NOTICE_TYPE_COLORS } from '@/lib/utils';
import type { HomeNotice } from '@/components/home/types';

interface NoticesListProps {
  notices: HomeNotice[];
}

export default function NoticesList({ notices }: NoticesListProps) {
  const display = notices.slice(0, 5);

  return (
    <div>
      <SectionHeader title="Public Notices" href="/notices" />
      {display.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm">
          <p className="text-muted text-sm">No active notices at this time.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[320px] overflow-y-auto">
          {display.map((notice) => (
            <Link
              key={notice._id}
              href={`/notices?type=${notice.type}`}
              className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 shadow-sm hover:border-primary hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 ${
                  NOTICE_TYPE_COLORS[notice.type] || NOTICE_TYPE_COLORS.general
                }`}
              >
                {NOTICE_TYPE_LABELS[notice.type] || notice.type}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {notice.title}
                </h4>
                {notice.createdAt && (
                  <time className="text-xs text-muted">{formatDate(notice.createdAt)}</time>
                )}
              </div>
              <ChevronRight size={16} className="text-muted shrink-0 group-hover:text-primary" aria-hidden />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
