// @ts-ignore
import PropTypes from 'prop-types';
import * as React from 'react';
import {BaseComponent, HistoryProps} from 'react-onex';
import {showToast} from 'ui-toast';
import {getLocale, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {User} from '../model/User';
import './general-info.scss';

interface Props extends HistoryProps {
  user: any;
  resource: any;
  close: any;
  saveEmit: any;
}

class GeneralInfo extends BaseComponent<Props, any> {
  constructor(props) {
    super(props,storage.resource(), storage.ui(), getLocale);
    this.save = this.save.bind(this);
    this.state = {
      data: new User()
    };
  }

  componentDidMount() {
    this.setState({data: this.props.user});
  }

  close = () => {
    this.props.close();
    const msg = storage.resource().value('success_save_my_profile');
    showToast(msg);
  }

  async save(e) {
    e.preventDefault();
    const {data} = this.state;
    const success = await applicationContext.myProfileService.saveMyProfile(storage.getUserId(), data);
    let status = '';
    if (success) {
      status = 'success';
      this.setState({data});
    } else {
      status = 'fail';
    }
    this.props.saveEmit({status, data});
    this.close();
  }

  render() {
    const resource = this.props.resource;
    const data = this.state.data;
    return (
      <div className='view-container profile-info'>
        <form model-name='data'>
          <header>
            <h2>{resource.user_profile_general_info}</h2>
            <button type='button' id='btnClose' name='btnClose' className='btn-close' onClick={this.close}/>
          </header>
          <div>
            <section className='row'>
              <h4>{resource.user_profile_basic_info}</h4>
              <label className='col s12 m6'>
                {resource.first_name}
                <input id='firstName' name='firstName'
                       value={data.firstName}
                       onChange={this.updateState}
                       maxLength={255}
                       placeholder={resource.placeholder_user_profile_first_name}/>
              </label>
              <label className='col s12 m6'>
                {resource.last_name}
                <input id='lastName' name='lastName'
                       value={data.lastName}
                       onChange={this.updateState}
                       maxLength={255}
                       placeholder={resource.placeholder_user_profile_last_name}/>
              </label>
              <label className='col s12 m6'>
                {resource.user_profile_occupation}
                <input id='occupation' name='occupation'
                       value={data.occupation}
                       onChange={this.updateState}
                       maxLength={500}
                       placeholder={resource.placeholder_user_profile_occupation}/>
              </label>
              <label className='col s12 m6'>
                {resource.user_profile_company}
                <input id='company' name='company'
                       value={data.company}
                       onChange={this.updateState}
                       maxLength={500}
                       placeholder={resource.placeholder_user_profile_company}/>
              </label>
              <label className='col s12'>
                {resource.user_profile_website}
                <input id='website' name='website'
                       data-type='url'
                       value={data.website}
                       onChange={this.updateState}
                       maxLength={500}
                       placeholder={resource.placeholder_user_profile_website}/>
              </label>
            </section>
            <section>
              <h4>{resource.user_profile_social}</h4>
              <label className='inline-input'>
                <i className='fa fa-facebook'/>
                <input id='facebookLink' maxLength={100} name='facebookLink'
                       onChange={this.updateState} placeholder={resource.user_profile_facebook}
                       value={data.facebookLink}/>
              </label>
              <label className='inline-input'>
                <i className='fa fa-linkedin'/>
                <input id='linkedInLink' maxLength={100} onChange={this.updateState}
                       placeholder={resource.user_profile_linkedIn} name='linkedinLink' value={data.linkedinLink}/>
              </label>
              <label className='inline-input'>
                <i className='fa fa-instagram'/>
                <input id='instagramLink' maxLength={100} onChange={this.updateState}
                       placeholder={resource.user_profile_instagram} name='instagramLink'
                       value={data.instagramLink}/>
              </label>
              <label className='inline-input'>
                <i className='fa fa-twitter'/>
                <input id='twitter' maxLength={100} onChange={this.updateState}
                       placeholder={resource.user_profile_twitter} name='twitterLink' value={data.twitterLink}/>
              </label>
              <label className='inline-input'>
                <i className='fa fa-skype'/>
                <input id='skype' name='skypeLink' maxLength={100}
                       onChange={this.updateState}
                       placeholder={resource.user_profile_skype} value={data.skypeLink}/>
              </label>
              <label className='inline-input'>
                <i className='fa fa-dribbble'/>
                <input id='dribble' name='dribbbleLink' maxLength={100}
                       onChange={this.updateState}
                       placeholder={resource.user_profile_dribbble} value={data.dribbbleLink}/>
              </label>
            </section>
          </div>
          <footer>
            <button type='button' id='btnSave' name='btnSave' onClick={this.save}>
              {resource.save}
            </button>
          </footer>
        </form>
      </div>);
  }
}

// @ts-ignore
GeneralInfo.propTypes = {
  user: PropTypes.any,
  resource: PropTypes.any,
  close: PropTypes.func,
  saveEmit: PropTypes.func,
};
export default GeneralInfo;
