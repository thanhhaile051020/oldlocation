import {Model, Type} from 'onecore';

export const userSettingsModel: Model = {
  name: 'userSettings',
  attributes: {
    userId: {
      type: Type.String,
      key: true
    },
    /*
    defaultLanguage: {
      type: Type.String,
      length: 11
    },
    */
    dateFormat: {
      type: Type.String,
      length: 13
    },
    dateTimeFormat: {
      type: Type.String,
      length: 40
    },
    timeFormat: {
      type: Type.String,
      length: 10
    },
    notification: {
      type: Type.Boolean
    },
    searchEnginesLinksToMyProfile: {
      type: Type.Boolean
    },
    emailFeedUpdates: {
      type: Type.Boolean
    },
    notifyFeedUpdates: {
      type: Type.Boolean
    },
    emailPostMentions: {
      type: Type.Boolean
    },
    notifyPostMentions: {
      type: Type.Boolean
    },
    emailCommentsOfYourPosts: {
      type: Type.Boolean
    },
    notifyCommentsOfYourPosts: {
      type: Type.Boolean
    },
    emailEventInvitations: {
      type: Type.Boolean
    },
    notifyEventInvitations: {
      type: Type.Boolean
    },
    emailWhenNewEventsAround: {
      type: Type.Boolean
    },
    notifyWhenNewEventsAround: {
      type: Type.Boolean
    }
  }
};
