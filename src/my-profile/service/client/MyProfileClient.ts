import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {User} from '../../model/User';
import {UserSettings} from '../../model/UserSettings';
import {MyProfileService} from '../MyProfileService';

export class MyProfileClient implements MyProfileService {
  constructor(private http: HttpRequest) {
  }

  serviceUrl = config.myprofileUrl;

  getMyProfile(userId: string): Promise<User> {
    const url = this.serviceUrl + '/myprofile/' + userId;
    return this.http.get<User>(url);
  }

  saveMyProfile(userId: string, user: User): Promise<boolean> {
    const url = this.serviceUrl + '/saveMyProfile/' + userId;
    return this.http.put(url, user);
  }

  getMySettings(userId): Promise<UserSettings> {
    const url = this.serviceUrl + '/mysettings/' + userId;
    return this.http.get<UserSettings>(url);
  }

  saveMySettings(userId: string, settings: UserSettings): Promise<boolean> {
    const url = this.serviceUrl + '/mysettings/' + userId;
    return this.http.put(url, settings);
  }

  changeEmail(currentEmail: string, newEmail: string, password: string): Promise<boolean> {
    const url = this.serviceUrl + '/changeEmail';
    const obj = {currentEmail, newEmail, password};
    return this.http.put(url, obj);
  }

  addEmail(email: string, password: string): Promise<boolean> {
    const url = this.serviceUrl + '/addEmail';
    const obj = {email, password};
    return this.http.put(url, obj);
  }
}
