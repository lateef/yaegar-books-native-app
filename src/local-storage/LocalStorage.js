import { AsyncStorage } from 'react-native';

let queue = Promise.resolve();

const queueSetItem = async (v) => {
  await queue;

  queue = AsyncStorage.setItem('app-data', JSON.stringify(v), e => e && console.warn('QUEUE', e));
};

class MemoryStorage {
  constructor() {
    this.obj = {};
  }

  async init() {
    await new Promise((resolve, reject) => {
      AsyncStorage.getItem('app-data', (e, r) => {
        if (e) {
          reject(e);
        } else {
          this.obj = r ? JSON.parse(r) : this.obj;
          resolve(this.obj);
        }
      });
    });
  }

  setItem(key, value) {
    console.log('SET', key);
    this.obj[key] = value;

    queueSetItem(this.obj);

    return this.obj[key];
  }

  getItem(key) {
    console.log('GET', key);
    return Object.prototype.hasOwnProperty.call(this.obj, key) ? this.obj[key] : undefined;
  }

  removeItem(key) {
    console.log('REMOVE', key);
    delete this.obj[key];

    queueSetItem(this.obj);
    return true;
  }


  clear() {
    AsyncStorage.clear('app-data', console.log);
    this.obj = {};
  }
}

export default new MemoryStorage();
