class StorageService {
  constructor() {
    this.storage = localStorage;
  }

  getItem(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

export default new StorageService();
