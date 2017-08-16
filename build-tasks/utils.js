import gutil from 'gulp-util'

const getEnv = () => {
  const activeEnvs = {}
  const envs = [
    'dist',
    'dev',
    'deploy',
    'mapped',
    'stat',
  ]
  for (let i = 0; i < envs.length; i++) {
    activeEnvs[envs[i]] = gutil.env[envs[i]]
  }
  return activeEnvs
}

export {
  getEnv,
}
