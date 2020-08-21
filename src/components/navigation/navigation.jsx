import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './navigation.module.scss';
import PropTypes from 'prop-types';

const Navigation = ({ events, activeType, onItemClick }) => {
  const [mergedEvents, setMergedEvents] = useState({});

  // Handler for when a button is clicked to change tab
  const onButtonClick = type => {
    onItemClick(type);
  };

  // When the list of events changes (or component mounts),
  // let's first filter by the events specified in `metrics_config,`
  // and then summate ones that are specified in the same config
  // useEffect() prevents this running every time the component is re-rendered
  useEffect(() => {
    // Get all event categories as keys in `metrics_config`
    const categories = Object.keys(metrics_config.tabs);

    // Remove from {events} ones that are not in `metrics_config`
    const filteredEvents = events.filter(
      event => categories.indexOf(event.type) !== -1
    );

    // Loop through all `metrics_config` keys to find
    // the ones we should be displaying counts for
    const summatedValues = {};
    categories.forEach(category => {
      const counts = metrics_config.tabs[category].nav_counts;

      // Loop through each, finding its match
      counts.forEach(measure_uri => {
        filteredEvents.forEach(fe => {
          if (
            fe.type === category &&
            (fe.measure_uri === measure_uri || measure_uri === '*')
          ) {
            summatedValues[category] = summatedValues[category]
              ? summatedValues[category] + fe.value
              : fe.value;
          }
        });
      });
    });

    // Finally, update the state with these values
    setMergedEvents(summatedValues);
  }, [events]);

  // Return the navigation component
  return (
    <nav className={styles.navigation}>
      <ul>
        {Object.keys(mergedEvents).map(type => (
          <li key={type}>
            <button
              onClick={() => onButtonClick(type)}
              className={classnames({
                [styles.active]: activeType === type
              })}
            >
              <div className={styles.count}>
                {mergedEvents[type].toLocaleString()}
              </div>
              <div className={styles.label}>{type}</div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      namespace: PropTypes.string,
      version: PropTypes.string,
      type: PropTypes.string,
      measure_uri: PropTypes.string,
      value: PropTypes.number,
      source: PropTypes.string
    })
  ).isRequired,
  activeType: PropTypes.string,
  onItemClick: PropTypes.func.isRequired
};

Navigation.defaultProps = {
  activeType: null
};

export default Navigation;
