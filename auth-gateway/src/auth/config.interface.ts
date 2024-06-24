import { AppInfo } from 'supertokens-node/types';

export const SUPERTOKENS_CONFIG_TOKEN = 'SUPERTOKENS_CONFIG_TOKEN';

export type AuthModuleConfig = {
  appInfo: AppInfo;
  connectionURI: string;
  apiKey?: string;
};
