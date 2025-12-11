import { useConfig } from '@/config';
import type React from 'react';
import { createContext, useContext, useEffect } from 'react';
import { createDictionary, getLang } from '../utils';
import { interpolate } from './interpolate';

interface IntlProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const IntlContext = createContext<ContextProps>({
  t: (key: string, vars?: Record<string, string | number>) => {
    if (!vars) {
      return key;
    }
    return interpolate(key, vars);
  }
});

export const IntlProvider = (props: IntlProviderProps) => {
  const { children } = props;
  const { config, setConfig } = useConfig();

  // Create a dictionary of every translation
  const dictionary = createDictionary(config);

  // Get the language the widget will be localised in
  const lang = getLang(dictionary, config);

  // Some localisations done by the browser rely on the `config` object's locale,
  // as the components don't have access to the `lang` variable. If the `lang`
  // variable is different to what the config is set to, then we have two choices:
  //  1. Display all localisations in the fallback language ('supported')
  //  2. Display browser localisations in the language set in the config,
  //     and everything else in the fallback language ('mixed')
  // The `locale_fallback_type` config option determines which of these two options is used
  useEffect(() => {
    const { locale_fallback_type } = config.options;
    if (
      lang !== config.settings.locale &&
      locale_fallback_type === 'supported'
    ) {
      setConfig({
        ...config,
        settings: { ...config.settings, locale: lang }
      });
    }
  }, [lang, config, setConfig]);

  // Create a function to get a translation
  const t = (path: string, vars?: Record<string, string | number>) => {
    const template =
      dictionary[lang][path] || dictionary['en-US'][path] || path;

    if (!vars) {
      return template;
    }

    return interpolate(template, vars);
  };

  return <IntlContext.Provider value={{ t }}>{children}</IntlContext.Provider>;
};

export const useIntl = () => useContext(IntlContext);
