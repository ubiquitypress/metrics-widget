import { GraphEmptyMessage } from '@/components/common';
import { useIntl } from '@/i18n';
import type { Citations as ICitations } from '@/types';
import { cx, formatNumber } from '@/utils';
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  FileText,
  Info
} from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import styles from './citations.module.scss';

export interface CitationRecord {
  title: string;
  authors?: string;
  editors?: string;
  year?: number;
  source?: string;
  volume?: string | null;
  issue?: string | null;
  page?: string | null;
  doi?: string | null;
  url?: string | null;
  type?: string | null;
}

export interface CitationsProps {
  id: string;
  data: CitationRecord[];
  total: number;
  graph: ICitations;
}

const TypeIcon = ({ type }: { type: string }) => {
  const normalized = type.toLowerCase();
  const common = normalized.replace(/[-_]/g, '');

  const icon = (() => {
    if (common.includes('journal') || common.includes('article')) {
      return <FileText aria-hidden='true' />;
    }
    if (common.includes('book')) {
      return <Book aria-hidden='true' />;
    }
    if (common.includes('dataset') || common.includes('data')) {
      return <Database aria-hidden='true' />;
    }
    return <Info aria-hidden='true' />;
  })();

  return <span className={styles.icon}>{icon}</span>;
};

const formatMeta = (item: CitationRecord) => {
  const parts: string[] = [];
  if (item.source) {
    parts.push(item.source);
  }
  const volIssue: string[] = [];
  if (item.volume) {
    volIssue.push(item.volume);
  }
  if (item.issue) {
    volIssue.push(item.issue);
  }
  if (volIssue.length > 0) {
    parts.push(volIssue.join('(') + (item.issue ? ')' : ''));
  }
  if (item.page) {
    parts.push(item.page);
  }
  return parts.join(', ');
};

export const Citations = (props: CitationsProps) => {
  const { id, data, total, graph } = props;
  const { t } = useIntl();
  const pageSize = graph.config?.page_size || 5;
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement | null>(null);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const showInlineTitle = graph.config?.show_inline_title ?? true;

  const viewAllLink =
    graph.config?.view_all_url ||
    (() => {
      const doi = data.find(item => item.doi)?.doi;
      if (!doi) {
        return undefined;
      }
      return `https://search.crossref.org/search/works?q=${encodeURIComponent(
        doi
      )}&from_ui=yes`;
    })();

  const pageSlice = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, page, pageSize]);

  if (data.length === 0) {
    return <GraphEmptyMessage />;
  }

  const startIdx = (page - 1) * pageSize + 1;
  const endIdx = Math.min(page * pageSize, total);

  return (
    <div id={id} className={styles.citations}>
      <div className={styles.header}>
        {showInlineTitle && (
          <div className={styles.title}>{t('graphs.citations.title')}</div>
        )}
        <div className={styles.meta}>
          {t('graphs.citations.showing', {
            start: formatNumber(startIdx),
            end: formatNumber(endIdx),
            total: formatNumber(total)
          })}
        </div>
      </div>

      <div className={styles.listArea}>
        <div className={styles.list}>
          {pageSlice.map((item, idx) => {
            const rank = startIdx + idx;
            const meta = formatMeta(item);
            const doiLink = item.doi ? `https://doi.org/${item.doi}` : item.url;
            const typeLabel = item.type
              ? item.type.replace('-', ' ').replace('_', ' ')
              : 'Citation';

            return (
              <div key={`${id}-${rank}`} className={styles.card}>
                <div className={styles.badge}>{rank}</div>
                <div className={styles.content}>
                  <div className={styles.type}>
                    <TypeIcon type={typeLabel} />
                    <span>{typeLabel}</span>
                  </div>
                  <div className={styles.title}>{item.title}</div>
                  {(item.authors || item.editors || item.year) && (
                    <div className={styles.byline}>
                      {item.authors || item.editors || ''}
                      {item.authors || item.editors ? ' ' : ''}
                      {item.year ? `(${item.year})` : ''}
                    </div>
                  )}
                  {meta && <div className={styles.meta}>{meta}</div>}
                  {doiLink && (
                    <div className={styles.links}>
                      <a href={doiLink} target='_blank' rel='noreferrer'>
                        {t('graphs.citations.doi_prefix')} {item.doi || doiLink}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.pagination}>
          <button
            type='button'
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label={t('graphs.citations.prev_page')}
          >
            <ChevronLeft aria-hidden='true' />
          </button>
          {Array.from({ length: pageCount }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                type='button'
                key={p}
                className={cx({ [styles.active]: p === page })}
                onClick={() => {
                  setPage(p);
                  listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label={t('graphs.citations.go_to_page', { page: p })}
              >
                {p}
              </button>
            );
          })}
          <button
            type='button'
            onClick={() => {
              setPage(Math.min(pageCount, page + 1));
              listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={page === pageCount}
            aria-label={t('graphs.citations.next_page')}
          >
            <ChevronRight aria-hidden='true' />
          </button>
        </div>
        {viewAllLink && (
          <a
            className={styles.viewAll}
            href={viewAllLink}
            target='_blank'
            rel='noreferrer'
          >
            <span>{t('graphs.citations.view_all')}</span>
            <ExternalLink aria-hidden='true' />
          </a>
        )}
      </div>
    </div>
  );
};
