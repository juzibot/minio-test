import * as dotenv from 'dotenv';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

import { getMongoConfig } from './mongodb';
import { getRedisConfig } from './redis';
import { getTypeORMConfig } from './typeorm';

dotenv.config();

export default (appInfo: EggAppInfo): any => {
  const config: PowerPartial<EggAppConfig> = {};

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545364598591_2678';

  // add your egg config in here
  config.middleware = [
    'errorHandler',
  ];

  config.mongo = getMongoConfig();

  config.typeorm = getTypeORMConfig();

  config.redis = getRedisConfig();

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
