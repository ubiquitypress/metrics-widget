/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphPropTypes } from '../../proptypes';
import { useMetrics } from '../../contexts/metrics';
import Loading from '../loading';
import GraphWrapper from '../graph-wrapper';
import { useTranslation } from '../../contexts/i18n';
import methods from './methods';
import { useConfig } from '../../contexts/config';
import KeyValueTable from '../graphs/key-value-table';

const Graph = ({ type, tab, options }) => {
  const [data, setData] = useState(null);
  const { fetchMetric } = useMetrics();
  const { t } = useTranslation();
  const config = useConfig();

  useEffect(() => {
    const getData = async () => {
      // Fetch all URIs
      let uris = [];
      await Promise.all(
        options.uris.map(async uri => {
          uris.push(await fetchMetric(`,measure_uri:${uri}`));
        })
      );
      uris = uris.reduce((acc, curr) => [...acc, ...curr], []);

      // Manipulate the graph data by calling its helper method
      if (methods[type]) uris = methods[type]({ t, uris, config });

      // Set the data
      setData(uris);
    };

    getData();
  }, []);

  if (!data) return <Loading />;
  return (
    <GraphWrapper
      width={options.width}
      label={t(`labels.${type.toLowerCase()}`, {
        name: t(`tabs.${tab.toLowerCase()}`)
      })}
      hideLabel={options.hide_label}
    >
      {type === 'country_table' && <KeyValueTable {...data} />}
    </GraphWrapper>
  );
};

Graph.propTypes = {
  type: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  options: PropTypes.shape(graphPropTypes).isRequired
};

export default Graph;
