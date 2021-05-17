import config from '../../../../config.json';

const getAsset = name => {
  const path = `/assets/${name}`;

  if (process.env.NODE_ENV === 'development') return path;
  return `https://storage.googleapis.com/operas/metrics-widget-${config.app_version}${path}`;
};

export default getAsset;
