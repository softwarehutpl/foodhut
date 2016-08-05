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

        return apiUser.please().create(user);
    }

    getUsers() {
        return this.connection.Instance().users().list();
    }

    updateUser(user) {
        let apiUser = this.connection.User;

        var query = {instanceName: this.constant.instanceName, id: user.id};
        var update = {
            username: user.username, 
            password: user.password, 
            profile: {
                balance: user.profile.balance,
                is_admin: user.profile.is_admin,
            }

        };

        return apiUser.please().update(query, update);
    }
}
