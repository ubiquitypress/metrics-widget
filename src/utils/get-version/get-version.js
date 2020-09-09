import config from '../../../config.json';

const getVersion = () => {
  return config.app_version;
};

export default getVersion;
