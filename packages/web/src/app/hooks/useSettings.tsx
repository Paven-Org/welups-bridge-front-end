import { useContext } from 'react';
import SettingsContext, {
  SettingContextProps,
} from '../contexts/SettingsContext';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSettings = () => useContext<SettingContextProps>(SettingsContext);

export default useSettings;
