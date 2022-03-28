import * as React from 'react';
import {BaseComponent, HistoryProps, navigate} from 'react-onex';
import {alertError} from 'ui-alert';
import {getLocale, handleError, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {UserSettings} from '../model/UserSettings';

interface InternalState {
  userSettings: UserSettings;
}

export default class MySettingsForm extends BaseComponent<HistoryProps, InternalState> {
  constructor(props) {
    super(props,storage.resource(), storage.ui(), getLocale);
    this.getDataMySettings = this.getDataMySettings.bind(this);
    this.navigateEmail = this.navigateEmail.bind(this);
    this.navigateLinkSocial = this.navigateLinkSocial.bind(this);
    this.saveOnClick = this.saveOnClick.bind(this);
    this.state = {userSettings: {}, message: ''};
  }

  private myProfileService = applicationContext.myProfileService;

  async saveOnClick(e) {
    e.preventDefault();
    try {
      const userId = storage.getUserId();
      const result = this.myProfileService.saveMySettings(userId, this.state.userSettings);
      if (result) {
        storage.toast().showToast('Save Setting successed');
      } else {
        alertError('Error');
      }
    } catch (err) {
      handleError(err);
    }
  }

  async getDataMySettings() {
    try {
      const userId = storage.getUserId();
      const userSettings = await this.myProfileService.getMySettings(userId);
      this.setState({userSettings});
    } catch (err) {
      handleError(err);
    }
  }

  componentDidMount() {
    this.getDataMySettings();
  }

  private navigateEmail(e) {
    e.preventDefault();
    if (storage.getUser().passwordExpiredTime) {
      this.props.history.push('/mysetting/changeEmail');
    } else {
      this.props.history.push('/mysetting/addEmail');
    }
  }

  private navigateLinkSocial(e) {
    e.preventDefault();
    this.props.history.push('/mysetting/linkSocialAccounts');
  }

  render() {
    const resource = storage.resource().resource();
    const {userSettings} = this.state;
    const btnEmail = storage.getUser().passwordExpiredTime ? resource.button_change_email : resource.button_add_email;
    return (
      <div className='view-container'>
        <form id='mySettingsForm' name='mySettingsForm' model-name = 'userSettings'>
          <header>
            <h2>{resource.my_settings}</h2>
          </header>
          <div className='row'>
            <section className='col s12 m12 l6'>
              <h4>{resource.user_settings_member_profile_preferences}</h4>
              <label className='switch-container'>
                <input type='checkbox'
                       id='searchEnginesLinksToMyProfile'
                       name='searchEnginesLinksToMyProfile'
                       value={userSettings.searchEnginesLinksToMyProfile}
                       checked={userSettings.searchEnginesLinksToMyProfile}
                       onChange={this.updateState}/>
                {resource.user_settings_search_engines_links_to_my_profile}
              </label>
              <label className='switch-container'>
                <input type='checkbox'
                       id='followingListPublicOnMyProfile'
                       name='followingListPublicOnMyProfile'
                       value={userSettings.followingListPublicOnMyProfile}
                       checked={userSettings.followingListPublicOnMyProfile}
                       onChange={this.updateState}/>
                {resource.user_settings_search_engines_links_to_my_profile}
              </label>
            </section>
            <section className='col s12 m12 l6'>
              <h4>{resource.user_settings_around_me_references}</h4>
              <label className='switch-container'>
                <input type='checkbox'
                       id='showMyProfileInSpacesAroundMe'
                       name='showMyProfileInSpacesAroundMe'
                       value={userSettings.showMyProfileInSpacesAroundMe}
                       checked={userSettings.showMyProfileInSpacesAroundMe}
                       onChange={this.updateState}/>
                {resource.user_settings_show_my_profile_in_spaces_around_me}
              </label>
              <label className='switch-container'>
                <input type='checkbox'
                       id='showAroundMeResultsInMemberFeed'
                       name='showAroundMeResultsInMemberFeed'
                       value={userSettings.showAroundMeResultsInMemberFeed}
                       checked={userSettings.showAroundMeResultsInMemberFeed}
                       onChange={this.updateState}/>
                {resource.user_settings_show_around_me_results_in_member_feed}
              </label>
            </section>
            <section className='col s12 m12 l6'>
              <h4>{resource.user_settings_notification_preferences}</h4>
              <label className='switch-container'>
                <input type='checkbox'
                       id='notification'
                       name='notification'
                       value={userSettings.notification}
                       checked={userSettings.notification}
                       onChange={this.updateState}/>
                {resource.user_settings_notifications}
              </label>
              <div className='checkbox-section'>
                {resource.user_settings_feed_updates}
                <div className='checkbox-group'>
                  <label>
                    <input type='checkbox'
                           id='notifyFeedUpdates'
                           name='notifyFeedUpdates'
                           value={userSettings.notifyFeedUpdates}
                           checked={userSettings.notifyFeedUpdates}
                           onChange={this.updateState}/>
                    {resource.notification}
                  </label>
                  <label>
                    <input type='checkbox'
                           id='emailFeedUpdates'
                           name='emailFeedUpdates'
                           value={userSettings.emailFeedUpdates}
                           checked={userSettings.emailFeedUpdates}
                           onChange={this.updateState}/>
                    {resource.email}
                  </label>
                </div>
              </div>
              <div className='checkbox-section'>
                {resource.user_settings_post_mentions}
                <div className='checkbox-group'>
                  <label>
                    <input type='checkbox'
                           id='notifyPostMentions'
                           name='notifyPostMentions'
                           value={userSettings.notifyPostMentions}
                           checked={userSettings.notifyPostMentions}
                           onChange={this.updateState}/>
                    {resource.notification}
                  </label>
                  <label>
                    <input type='checkbox'
                           id='emailPostMentions'
                           name='emailPostMentions'
                           value={userSettings.emailPostMentions}
                           checked={userSettings.emailPostMentions}
                           onChange={this.updateState}/>
                    {resource.email}
                  </label>
                </div>
              </div>
              <div className='checkbox-section'>
                {resource.user_settings_comments_of_your_posts}
                <div className='checkbox-group'>
                  <label>
                    <input type='checkbox'
                           id='notifyCommentsOfYourPosts'
                           name='notifyCommentsOfYourPosts'
                           value={userSettings.notifyCommentsOfYourPosts}
                           checked={userSettings.notifyCommentsOfYourPosts}
                           onChange={this.updateState}/>
                    {resource.notification}
                  </label>
                  <label>
                    <input type='checkbox'
                           id='emailCommentsOfYourPosts'
                           name='emailCommentsOfYourPosts'
                           value={userSettings.emailCommentsOfYourPosts}
                           checked={userSettings.emailCommentsOfYourPosts}
                           onChange={this.updateState}/>
                    {resource.email}
                  </label>
                </div>
              </div>
              <div className='checkbox-section'>
                {resource.user_settings_event_invitations}
                <div className='checkbox-group'>
                  <label>
                    <input type='checkbox'
                           id='notifyEventInvitations'
                           name='notifyEventInvitations'
                           value={userSettings.notifyEventInvitations}
                           checked={userSettings.notifyEventInvitations}
                           onChange={this.updateState}/>
                    {resource.notification}
                  </label>
                  <label>
                    <input type='checkbox'
                           id='emailEventInvitations'
                           name='emailEventInvitations'
                           value={userSettings.emailEventInvitations}
                           checked={userSettings.emailEventInvitations}
                           onChange={this.updateState}/>
                    {resource.email}
                  </label>
                </div>
              </div>
              <div className='checkbox-section'>
                {resource.user_settings_when_new_events_around}
                <div className='checkbox-group'>
                  <label>
                    <input type='checkbox'
                           id='notifyWhenNewEventsAround'
                           name='notifyWhenNewEventsAround'
                           value={userSettings.notifyWhenNewEventsAround}
                           checked={userSettings.notifyWhenNewEventsAround}
                           onChange={this.updateState}/>
                    {resource.notification}
                  </label>
                  <label>
                    <input type='checkbox'
                           id='emailWhenNewEventsAround'
                           name='emailWhenNewEventsAround'
                           value={userSettings.emailWhenNewEventsAround}
                           checked={userSettings.emailWhenNewEventsAround}
                           onChange={this.updateState}/>
                    {resource.email}
                  </label>
                </div>
              </div>
            </section>
          </div>
          <footer>
            <button type='submit' id='btnSave' name='btnSave' onClick={this.saveOnClick}>
              {resource.save}
            </button>
          </footer>
        </form>
      </div>
    );
  }
}

