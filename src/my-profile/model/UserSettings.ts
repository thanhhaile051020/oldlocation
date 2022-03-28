export class UserSettings {
  constructor() { }
  public defaultLanguage?: string;
  public dateTimeFormat?: string;
  public timeFormat?: string;
  public userId: string;
  public dateFormat: string;
  public notification: boolean;
  public searchEnginesLinksToMyProfile: boolean;
  public emailFeedUpdates: boolean;
  public notifyFeedUpdates: boolean;
  public emailPostMentions: boolean;
  public notifyPostMentions: boolean;
  public emailCommentsOfYourPosts: boolean;
  public notifyCommentsOfYourPosts: boolean;
  public emailEventInvitations: boolean;
  public notifyEventInvitations: boolean;
  public emailWhenNewEventsAround: boolean;
  public notifyWhenNewEventsAround: boolean;
  public followingListPublicOnMyProfile: boolean;
  public showMyProfileInSpacesAroundMe: boolean;
  public showAroundMeResultsInMemberFeed: boolean;
}
