import BaseService from './base.service.js';
import Syncano from 'syncano';

export default class UserService extends BaseService {
    /*
     * constructor
     */
    constructor() {
        super();
        this.account = new Syncano({
            accountKey: "7f1adc626650d02b996dc0be0fb82a9a6ffbc8ae",
            defaults: {
                instanceName: "autumn-field-2134"
            }
        });
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
        user.className = this.constant.userClass;
        return this.add(user);
    }

    getUsers() {
        return this.account.Instance().users().list();
    }
}
