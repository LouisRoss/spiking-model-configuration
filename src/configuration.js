class PrivateSingleton {
  constructor(callback) {
    this.configuration = null;

    var init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    
    console.log("Loading configuration file...");
    fetch("configuration/configuration.json", init)
    .then(response => response.json())
    .then(config => {
      this.configuration = config;
      console.log(this.configuration);
      if (callback) {
        callback(this.configuration);
      }
    });
  }
}

class Configuration {
  constructor() {
    throw new Error('Use Configuration.getInstance()');
  }
  
  static getInstance(callback) {
    if (!Configuration.instance) {
      Configuration.instance = new PrivateSingleton(callback);
    } else {
      if (callback) {
        callback(Configuration.instance.configuration);
      }
    }
    return Configuration.instance.configuration;
  }
}

export { Configuration };
