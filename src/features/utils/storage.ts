export class StorageOver {
    static isStorage(key: string) {
        return (sessionStorage.getItem(key) !== null || localStorage.getItem(key) !== null )
    }
    static setItem(key: string, value:string, useLocalStorage: boolean) {
        const storage = useLocalStorage? localStorage : sessionStorage
        storage.setItem(key, value)
    }

    static getItem(key: string) {
        let storage = sessionStorage.getItem(key)
        if (storage === null) {
            storage = localStorage.getItem(key)
        }
        return storage
    }

    static clear() {
        sessionStorage.clear()
        localStorage.clear()
    }
}   