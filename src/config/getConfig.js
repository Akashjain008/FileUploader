import configJSON from './config.json';
const Config = {
    setEnv: 'dev',
    getConfig() {
        return configJSON[this.setEnv];
    }
};

export default Config;