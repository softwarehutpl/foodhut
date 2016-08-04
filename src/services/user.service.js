import BaseService from './base.service.js';

export default class UserService extends BaseService {
    /*
     * constructor
     */
    constructor() {
        super();
    }

    /**
     * fetches user by id
     * @return {Promise}
     */
    getUser(id) {
        var query = {
            id: id,
            className: this.constant.userClass,
        };

        return this.fetch(query);
    }
}
