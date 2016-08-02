import Syncano from 'syncano';

export default class BaseService {
    /**
     * constructor
     */
    constructor() {
        this.connection = Syncano({ accountKey: 'f105d32a319e87a61c349e5ee2ec5dbec3d7b7f8' });
    }
}
