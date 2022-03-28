import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {SkillService} from '../SkillService';

export class SkillClient implements SkillService {
    constructor(private http: HttpRequest) {
    }

    serviceUrl = config.myprofileUrl;

    loadData(key: string): Promise<any> {
        const url = this.serviceUrl + '/skill/' + key;
        return this.http.get<any>(url);
    }

    getAllSkill(): Promise<any> {
        return this.http.get(this.serviceUrl + '/skill');
    }
}
