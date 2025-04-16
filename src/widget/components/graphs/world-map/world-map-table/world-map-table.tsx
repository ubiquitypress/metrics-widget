import { useConfig } from '@/config';
import { useIntl } from '@/i18n';
import { formatNumber } from '@/utils';
import type { WorldMapProps } from '../world-map';
import styles from './world-map-table.module.scss';

export const WorldMapTable: React.FC<WorldMapProps> = ({ id, graph, data }) => {
  const { config } = useConfig();
  const { locale } = config.settings;
  const { t } = useIntl();

  // Sort the data by value
  const sortedData = Object.entries(data).sort(([, a], [, b]) => b - a);

  return (
    <table key={id} className={styles['world-map-table']}>
      <caption>{graph.title}</caption>
      <thead>
        <tr>
          <th scope='col'>{t('graphs.world_map.country_label')}</th>
          <th scope='col'>{t('graphs.world_map.value_label')}</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(([key, value]) => {
          const regionNames = new Intl.DisplayNames([locale], {
            type: 'region'
          });

          return (
            <tr key={key}>
              <th scope='row'>{regionNames.of(key)}</th>
              <td>{formatNumber(value || 0, locale)}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th scope='row'>{t('graphs.world_map.total_label')}</th>
          <td>{Object.values(data).reduce((a, b) => a + b, 0)}</td>
        </tr>
      </tfoot>
    </table>
  );
};
