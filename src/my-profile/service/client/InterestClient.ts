import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {InterestService} from '../InterestService';

export class InterestClient implements InterestService {
    constructor(private http: HttpRequest) {
    }

    serviceUrl = config.myprofileUrl;

    loadData(key: string): Promise<any> {
        const url = this.serviceUrl + '/interest/' + key;
        return this.http.get<any>(url);
    }

    getAllInterest(): Promise<any> {
        return this.http.get(this.serviceUrl + '/interest');
    }
}
