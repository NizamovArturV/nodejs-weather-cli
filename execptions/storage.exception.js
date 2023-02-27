export default class StorageException extends Error {
    constructor(message) {
        super(message);
        this.name = 'StorageException';
    }
}