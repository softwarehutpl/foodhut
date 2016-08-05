import BaseService from './base.service.js';
import Syncano from 'syncano';

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

    addUser(user) {
        let apiUser = this.connection.User;
        var options = {
            username: user.username,
            password: user.password,
            profile: {
                is_admin: user.is_admin,
                balance: user.balance
            }
        };

        return apiUser.please().create(options);
    }

    getUsers() {
        return this.connection.Instance().users().list();
    }
}
