import PropTypes from 'prop-types';

export const configPropTypes = {
  settings: PropTypes.shape({
    base_url: PropTypes.string.isRequired,
    work_uri: PropTypes.string.isRequired,
    language: PropTypes.string,
    default_tabs: PropTypes.arrayOf(PropTypes.string),
    localise_country_codes: PropTypes.bool,
    one_per_column_width: PropTypes.number
  })
};
