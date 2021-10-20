class PrivateSingleton {
  constructor(callback) {
    this.configuration = null;
    this.callbacks = [];

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
      this.callbacks.forEach(callback => {
        callback(this.configuration);
      });
      this.callbacks = [];
    });
  }

  deferCallback(callback) {
    this.callbacks.push(callback);
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
      if (!Configuration.instance.configuration) {
        Configuration.instance.deferCallback(callback);
      }
      else {
        callback(Configuration.instance.configuration);
      }
    }
  }
}

export { Configuration };
