import {AsyncStorage} from 'react-native';

export default class DeviceStorage {

    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    async getItem(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    async removeItem(key) {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
}