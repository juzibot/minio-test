import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mongo: {
    enable: true,
    package: 'egg-mongo-native',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  typeorm: {
    enable: true,
    package: '@juzibot/egg-typeorm',
  },
};

export default plugin;
