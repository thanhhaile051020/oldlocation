import {User} from '../model/User';
import {UserSettings} from '../model/UserSettings';

export interface MyProfileService {
  getMyProfile(userId: string): Promise<User>;
  saveMyProfile(userId: string, user: User): Promise<boolean>;

  getMySettings(userId): Promise<UserSettings>;
  saveMySettings(userId: string, settings: UserSettings): Promise<boolean>;
  changeEmail(currentEmail: string, newEmail: string, password: string): Promise<boolean>;
  addEmail(email: string, password: string): Promise<boolean>;
}
