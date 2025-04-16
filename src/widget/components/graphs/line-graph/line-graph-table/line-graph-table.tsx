import { useConfig } from '@/config';
import { useIntl } from '@/i18n';
import { formatNumber } from '@/utils';
import type { LineGraphProps } from '../line-graph';
import styles from './line-graph-table.module.scss';

export const LineGraphTable: React.FC<LineGraphProps> = ({
  id,
  graph,
  datasets,
  labels
}) => {
  const { config } = useConfig();
  const { t } = useIntl();

  return (
    <table key={id} className={styles['line-graph-table']}>
      <caption>{graph.title}</caption>
      <thead>
        <tr>
          <th scope='col'>{t('graphs.line_graph.date_label')}</th>
          {datasets.map(dataset => (
            <th key={dataset.label} scope='col'>
              {dataset.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {labels.map((label, index) => (
          <tr key={label}>
            <th scope='row'>{label}</th>
            {datasets.map(dataset => (
              <td key={dataset.label}>
                {formatNumber(dataset.data[index], config.settings.locale)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope='row'>{t('graphs.line_graph.total_label')}</th>
          {datasets.map(dataset => (
            <td key={dataset.label}>
              {formatNumber(
                dataset.data.reduce((a, b) => a + b, 0),
                config.settings.locale
              )}
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};
