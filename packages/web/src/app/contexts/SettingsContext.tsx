/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';
import { merge } from 'lodash';
import { LayoutSettings } from '../components/layout/settings';

export interface SettingContextProps {
  settings: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  updateSettings?: (newSetting: unknown) => void;
}
const SettingsContext = createContext<SettingContextProps>({
  settings: LayoutSettings,
  updateSettings: undefined,
});

interface SettingsProps {
  settings?: unknown;
  children?: React.ReactNode;
}
export const SettingsProvider: React.FunctionComponent<
  SettingsProps
> = (props: { settings?: unknown; children?: React.ReactNode }) => {
  const [currentSettings, setCurrentSettings] = useState<unknown>(
    props.settings || LayoutSettings
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateSettings = (update: any = {}) => {
    const marged = merge({}, currentSettings, update);
    setCurrentSettings(marged);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleUpdateSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
