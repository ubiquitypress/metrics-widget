import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './panel.module.scss';
import { useConfig } from '../../contexts/config';
import deepFind from '../../utils/deep-find';
import Graph from '../graph';
import LinkWrapper from '../link-wrapper';
import { useTranslation } from '../../contexts/i18n';

const Panel = ({ name, active }) => {
  const config = useConfig();
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [data] = useState({
    graphs: deepFind(config, `tabs.${name}.graphs`),
    definition: deepFind(config, `tabs.${name}.operas_definition`)
  });

  useEffect(() => {
    if (active && !opened) setOpened(true);
  }, [active]);

  return (
    <div
      className={`${styles.panel}${!active ? ' hidden' : ''}`}
      tabIndex='0'
      role='tabpanel'
      id={`mw-tabpanel-${name}`}
      aria-labelledby={`mw-tab-${name}`}
    >
      {(active || opened) && (
        <>
          {/* Render each graph for this panel */}
          {Object.entries(data.graphs).map(([type, options]) => (
            <Graph key={type} type={type} tab={name} options={options} />
          ))}

          {/* OPERAS Definition */}
          {data.definition && (
            <LinkWrapper href={data.definition}>
              {t('other.operas')}
            </LinkWrapper>
          )}
        </>
      )}
    </div>
  );
};

Panel.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default Panel;
