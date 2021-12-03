import { EggRedisOptions } from 'egg-redis';

export const getRedisConfig = (): EggRedisOptions => {
  const redisSentinel = process.env.REDIS_SENTINEL && process.env.REDIS_SENTINEL === 'true';
  const redisSentinelMasterName = process.env.REDIS_SENTINEL_MASTER_NAME;
  const redisCluster = process.env.REDIS_CLUSTER && process.env.REDIS_CLUSTER === 'true';
  const redisHost = process.env.REDIS_HOST;
  const redisPort = process.env.REDIS_PORT;
  const redisPassword = process.env.REDIS_PASSWORD;
  const redisDB = process.env.REDIS_DB;

  let redisConfig: EggRedisOptions;
  if (redisSentinel) {
    const hostsArr = (redisHost || '').split(',');
    const portsArr = (redisPort || '').split(',');
    if (hostsArr.length !== portsArr.length) {
      throw new Error(`Redis sentinel config is invalid, hosts count and ports count don't match. Hosts: ${redisHost}, Ports: ${redisPort}`);
    }
    redisConfig = {
      client: {
        sentinels: hostsArr.map((host, index) => ({
          host,
          port: parseInt(portsArr[index], 10),
        })),
        name: redisSentinelMasterName,
        password: redisPassword,
        db: parseInt(redisDB || '0', 10),
      },
    };
  } else if (redisCluster) {
    const hostsArr = (redisHost || '').split(',');
    const portsArr = (redisPort || '').split(',');
    const passwordArr = (redisPassword || '').split(',');
    const dbArr = (redisDB || '0').split(',');
    if (hostsArr.length !== portsArr.length
      || (hostsArr.length !== passwordArr.length && passwordArr.length !== 1)
      || (hostsArr.length !== dbArr.length && dbArr.length !== 1)
    ) {
      throw new Error(`Redis Cluster config is invalid.`);
    }
    redisConfig = {
      client: {
        cluster: true,
        nodes: hostsArr.map((host, index) => {
          const password = passwordArr[index] || passwordArr[0];
          const db = parseInt(dbArr[index] || dbArr[0], 10);
          const port = parseInt(portsArr[index], 10);
          return { host, port, password, db };
        }),
      },
    };
  } else {
    redisConfig = {
      client: {
        port: parseInt(redisPort || '6379', 10),
        host: redisHost,
        password: redisPassword,
        db: parseInt(redisDB || '0', 10),
      },
    };
  }

  return redisConfig;
};
