class PrivateSingleton {
  constructor() {
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
    });
  }
}

class Configuration {
  constructor() {
    throw new Error('Use Configuration.getInstance()');
  }
  
  static getInstance() {
    if (!Configuration.instance) {
      Configuration.instance = new PrivateSingleton();
    }
    return Configuration.instance.configuration;
  }
}

export { Configuration };
