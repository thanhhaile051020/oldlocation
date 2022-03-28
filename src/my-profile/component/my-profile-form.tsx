import * as React from 'react';
import Chips from 'react-chips';
import Modal from 'react-modal';
import {BaseComponent, HistoryProps} from 'react-onex';
import {clone} from 'reflectx';
import {DefaultSuggestionService, PreviousSuggestion} from 'suggestion-service';
import {alertError, getLocale, ResourceService, storage} from 'uione';
import imageOnline from '../../assets/images/status/online.svg';
import applicationContext from '../config/ApplicationContext';
import {Achievement} from '../model/Achievement';
import {User} from '../model/User';
import GeneralInfo from './general-info';

interface InternalState {
  isOpen: boolean;
  isEditing: boolean;
  isEditingBio: boolean;
  isEditingInterest: boolean;
  isEditingLookingFor: boolean;
  isEditingSkill: boolean;
  isEditingAchievement: boolean;
  bio: string;
  interest: string;
  lookingFor: string;
  skill: string;
  hireable: boolean;
  subject: string;
  description: string;
  highlight: boolean;
  user: User;
}

export const MAX_LOOK_UP = 50;

export default class MyProfileForm extends BaseComponent<HistoryProps, InternalState> {
  constructor(props) {
    super(props,storage.resource(), storage.ui(), getLocale);
    this.resourceService = storage.resource();
    this.fetchSuggestions = this.fetchSuggestions.bind(this);
    this.fetchInterestSuggestions = this.fetchInterestSuggestions.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.state = {
      isOpen: false,
      isEditing: false,
      isEditingBio: false,
      isEditingInterest: false,
      isEditingLookingFor: false,
      isEditingSkill: false,
      isEditingAchievement: false,
      bio: '',
      interest: '',
      lookingFor: '',
      skill: '',
      hireable: false,
      subject: '',
      description: '',
      highlight: false,
      objectUser: {},
      user: new User(),
      chipsSkill: [],
      skillsList: [],
      skills: [],
      preSkillSuggestions: {
        previousKeyWord: '',
        result: [],
      } as PreviousSuggestion<any>,
      interestsList: [],
      interests: [],
      preInterestSuggestions: {
        previousKeyWord: '',
        result: [],
      } as PreviousSuggestion<any>,
    };
  }
  public resourceService: ResourceService;
  private readonly skillService = applicationContext.skillService;
  private readonly interestService = applicationContext.interestService;
  private readonly chipSkillSuggestionsService = new DefaultSuggestionService<any>(this.skillService, MAX_LOOK_UP, 'skill', 'skill');
  private readonly chipInterestSuggestionsService = new DefaultSuggestionService<any>(this.interestService, MAX_LOOK_UP, 'interest', 'interest');

  async initData() {
    const skills = await this.skillService.getAllSkill();
    const interests = await this.interestService.getAllInterest();
    this.setState({skills, interests}, () => {
      const promise = new Promise((resolve, reject) => {
        this.loadData();
        resolve('Success!');
      });
      promise.then(() => {
        const chipsSkill = this.state.skills.filter((skill) => this.state.skillsList.includes(skill.skill));
        const chipsInterest = this.state.interests.filter((interest) => this.state.interestsList.includes(interest.interest));
        this.setState({chipsSkill, chipsInterest});
      });
    });
  }
  onChangeSkillChips = chipsSkill => {
    // this.skillService.getAll1().subscribe(
    //     ( result: any ) => {
    //       this.setState({skills: result});
    //     });
    let { skillsList } = this.state;
    const { skills } = this.state;
    console.log('UUUU', skills);
    skillsList = [];
    chipsSkill.map((value, index) => {
      const x = skills.find((v) => v.skill === value.skill);
      skillsList.push(x.skill);
    });
    this.setState({ chipsSkill, skillsList });
  }

  onChangeInterestChips = chipsInterest => {
    let { interestsList } = this.state;
    const { interests } = this.state;
    interestsList = [];
    chipsInterest.map((value, index) => {
      const x = interests.find((v) => v.interest === value.interest);
      interestsList.push(x.interest);
    });
    this.setState({ chipsInterest, interestsList });
  }

  async fetchSuggestions(keyWords) {
    const { skillsList, preSkillSuggestions } = this.state;
    const result = await this.chipSkillSuggestionsService.getSuggestion(keyWords, preSkillSuggestions, skillsList);
    const skill = keyWords;
    console.log('result', result.previousSuggestion);
    this.setState({ preSkillSuggestions: result.previousSuggestion , skill});
    return Promise.resolve(result.response);
  }

  async fetchInterestSuggestions(keyWords) {
    const { interestsList, preInterestSuggestions } = this.state;
    const result = await this.chipInterestSuggestionsService.getSuggestion(keyWords, preInterestSuggestions, interestsList);
    const interest = keyWords;
    console.log('result111', result.previousSuggestion);
    this.setState({ preInterestSuggestions: result.previousSuggestion , interest});
    return Promise.resolve(result.response);
  }

  onRemoveChips = (id) => {
    let { skillsList, chipsSkill } = this.state;
    skillsList = skillsList.filter(skill => skill !== id);
     chipsSkill = chipsSkill.filter(chip => chip.skill !== id);
    this.setState({ skillsList, chipsSkill });
  }

  onRemoveChipInterests = (id) => {
    let { interestsList, chipsInterest } = this.state;
    interestsList = interestsList.filter(interest => interest !== id);
    chipsInterest = chipsInterest.filter(chip => chip.interest !== id);
    this.setState({ interestsList, chipsInterest });
  }

  openSkillModal = () => {
    this.setState({ modalSkillIsOpen: true });
  }

  async loadData() {
    const userId = storage.getUserId();
    const user = await applicationContext.myProfileService.getMyProfile(userId);
    this.setState({ user, objectUser: clone(user) });
  }

  showChangeStatus = () => {

  }

  showPopup = (e) => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  toggleBio = (e) => {
    e.preventDefault();
    this.setState({ isEditingBio: !this.state.isEditingBio, isEditing: !this.state.isEditing });
  }

  toggleInterest = (e) => {
    e.preventDefault();
    this.setState({ isEditingInterest: !this.state.isEditingInterest, isEditing: !this.state.isEditing });
  }

  toggleLookingFor = (e) => {
    e.preventDefault();
    this.setState({ isEditingLookingFor: !this.state.isEditingLookingFor, isEditing: !this.state.isEditing });
  }

  toggleSkill = (e) => {
    e.preventDefault();
    this.setState({ isEditingSkill: !this.state.isEditingSkill, isEditing: !this.state.isEditing });
  }

  toggleAchievement = (e) => {
    e.preventDefault();
    this.setState({ isEditingAchievement: !this.state.isEditingAchievement, isEditing: !this.state.isEditing });
  }

  close = () => {
    const { isEditingBio, isEditingAchievement, isEditingInterest, isEditingSkill, isEditingLookingFor } = this.state;
    if (isEditingBio) {
      this.setState({ isEditingBio: !isEditingBio });
    }
    if (isEditingInterest) {
      this.setState({
        isEditingInterest: !isEditingInterest,
      });
    }
    if (isEditingLookingFor) {
      this.setState({
        lookingFor: '',
        isEditingLookingFor: !isEditingLookingFor
      });
    }
    if (isEditingSkill) {
      this.setState({
        skill: '',
        isEditingSkill: !isEditingSkill
      });
    }
    if (isEditingAchievement) {
      this.setState({
        subject: '',
        highlight: '',
        description: '',
        isEditingAchievement: !isEditingAchievement,
      });
    }
    this.setState({ isEditing: !this.state.isEditing });
  }

  editBio = (e) => {
    e.preventDefault();
    this.updateState(e, function () {
      const { bio, user } = this.state;
      if (bio && bio.trim() !== '') {
        user.bio = bio;
        this.setState({ bio: '', user });
      }
    });
  }

  removeInterest = (e, subject) => {
    e.preventDefault();
    const { user } = this.state;
    if (user.interests) {
      const interests = user.interests.filter(item => item !== subject);
      user.interests = interests;
      this.setState({ user });
    }
  }

  addInterest = (e) => {
    // e.preventDefault();
    // const { interest, user } = this.state;
    // const interests = user.interests ? user.interests : [];
    // if (interest && interest.trim() !== '') {
    //   if (!this.isExistInArray(e, interests, interest, '')) {
    //     interests.push(interest);
    //     user.interests = interests;
    //     this.setState({ interest: '', user });
    //   } else {
    //     this.alertError(ResourceManager.getString('error_duplicated_interest'));
    //   }
    // }
    e.preventDefault();
    this.onRemoveChipInterests(this.state.interestsList[0] || this.state.interest);
    const { user } = this.state;
    console.log('interest', this.state);
    const interest = this.state.interestsList.length !== 0 ? this.state.interestsList[0] : this.state.interest;
    const interestsEditing = user.interests ? user.interests : [];
    if (interest) {
      if (!this.isExistInArray(e, interestsEditing, interest, '')) {
        interestsEditing.push(interest);
        user.interests = interestsEditing;
        this.setState({ interest: '', user });
      } else {
        alertError(this.resourceService.value('error_duplicated_interest'));
      }
    }
  }

  removeLookingFor = (e, lookingForContent) => {
    e.preventDefault();
    const { user } = this.state;
    user.lookingFor = user.lookingFor.filter(item => item !== lookingForContent);
    this.setState({ user });
  }

  addLookingFor = (e) => {
    e.preventDefault();
    const { user, lookingFor } = this.state;
    const lookingForUser = user.lookingFor ? user.lookingFor : [];
    if (lookingFor && lookingFor.trim() !== '') {
      if (!this.isExistInArray(e, lookingForUser, lookingFor, '')) {
        lookingForUser.push(lookingFor);
        user.lookingFor = lookingForUser;
        this.setState({ lookingFor: '', user });
      } else {
        alertError(this.resourceService.value('error_duplicated_looking_for'));
      }
    }
  }

  removeSkill = (e, skillContent) => {
    e.preventDefault();
    const { user } = this.state;
    user.skills = user.skills.filter(item => item['skill'] !== skillContent);
    this.setState({ user });
  }

  // addSkill = (e) => {
  //   e.preventDefault();
  //   const { user, skill, hireable } = this.state;
  //   const skillsEditing = user.skills ? user.skills : [];
  //   if (skill && skill.trim() !== '') {
  //     console.log('OOOO', skillsEditing);
  //     const item = {
  //       hirable: hireable,
  //       skill
  //     };
  //     if (!this.isExistInArray(e, skillsEditing, item, 'skill')) {
  //       skillsEditing.push(item);
  //       user.skills = skillsEditing;
  //       this.setState({ skill: '', user });
  //     } else {
  //       this.alertError(ResourceManager.getString('error_duplicated_skill'), ResourceManager.getString('error'));
  //     }
  //   }
  // }
  addSkill = (e) => {
    e.preventDefault();
    this.onRemoveChips(this.state.skillsList[0]);
    const { user, hireable } = this.state;
    console.log('skill', this.state);
    const skill = this.state.skillsList.length !== 0 ? this.state.skillsList[0] : this.state.skill;
    const skillsEditing = user.skills ? user.skills : [];
    if (skill) {
      const item = {
        hirable: hireable,
        skill
      };
      if (!this.isExistInArray(e, skillsEditing, item, 'skill')) {
        skillsEditing.push(item);
        user.skills = skillsEditing;
        this.setState({ skill: '', user });
      } else {
        alertError(this.resourceService.value('error_duplicated_skill'));
      }
    }
  }

  removeAchievement = (e, subject) => {
    e.preventDefault();
    const { user } = this.state;
    if (user.achievements) {
      const achievements = user.achievements.filter(item => item['subject'] !== subject);
      user.achievements = achievements;
      this.setState({ user });
    }
  }

  addAchievement = (e) => {
    e.preventDefault();
    const achievement: Achievement = new Achievement();
    const { subject, description, highlight, user } = this.state;
    const achievements = clone(user.achievements) ? clone(user.achievements) : [];
    achievement.subject = subject;
    achievement.description = description;
    achievement.highlight = highlight;
    if (subject && subject.trim().length > 0 && !this.isExistInArray(e, achievements, achievement, 'subject')) {
      achievements.push(achievement);
      user.achievements = achievements;
      this.setState({ user, subject: '', description: '', highlight: '' });
    }
  }

  isExistInArray = (event, arr, item, key) => {
    if (!arr || arr.length === 0) {
      return false;
    }
    if (!event) {
      return;
    }
    let isExist = false;
    if (key.length !== 0) {
      isExist = arr.filter(itemFilter => itemFilter[key] === item[key]).length > 0;
    } else {
      isExist = arr.filter(itemFilter => itemFilter === item).length > 0;
    }
    return isExist;
  }

  async saveChanges(event) {
    event.preventDefault();
    const { isEditing } = this.state;
    if (isEditing) {
      try {
        const successs = await applicationContext.myProfileService.saveMyProfile(storage.getUserId(), this.state.user);
        if (successs) {
          this.initData();
          this.close();
          storage.toast().showToast(this.resourceService.value('success_save_my_profile'));
        } else {
          alertError(this.resourceService.value('fail_save_my_profile'));
        }
      } catch (err) {
        alertError(this.resourceService.value('fail_save_my_profile'));
      }
    }
  }

  saveEmit = (rs) => {
    if (rs.status === 'success' && rs.data) {
      this.setState({ user: clone(rs.data) });
      storage.toast().showToast(this.resourceService.value('success_save_my_profile'));
    } else {
      alertError(this.resourceService.value('fail_save_my_profile'));
    }
  }

  render() {
    const resource = this.resourceService.resource();
    const {
      user,
      lookingFor,
      skill,
      interest,
      subject,
      description,
      highlight,
      isEditing,
      isEditingBio,
      isEditingInterest,
      isEditingLookingFor,
      isEditingSkill,
      isEditingAchievement,
      chipsSkill,
      chipsInterest,
      interestsList,
      skillsList
    } = this.state;
    const followers = this.resourceService.format(this.resourceService.value('user_profile_followers'), user.followerCount || 0);
    const following = this.resourceService.format(this.resourceService.value('user_profile_following'), user.followingCount || 0);
    return (
      <div className='profile view-container'>
        <form id='myProfileForm' name='myProfileForm' ref='form'>
          <header className='border-bottom-highlight'>
            <div className='cover-image'>
              <img src='https://pre00.deviantart.net/6ecb/th/pre/f/2013/086/3/d/facebook_cover_1_by_alphacid-d5zfrww.jpg' />
              <div className='contact-group'>
                <button id='btnPhone' name='btnPhone' className='btn-phone'/>
                <button id='btnEmail' name='btnEmail' className='btn-email'/>
              </div>
              <button id='btnFollow' name='btnFollow' className='btn-follow'>Follow</button>
            </div>
            <button id='btnCamera' name='btnCamera' className='btn-camera'/>
            <div className='avatar-wrapper'>
              <img className='avatar'
                src={user.image || 'https://www.bluebridgewindowcleaning.co.uk/wp-content/uploads/2016/04/default-avatar.png'} />
              <img className='profile-status' alt='status' onMouseOver={this.showChangeStatus}
                src={imageOnline} />
            </div>
            <div className='profile-title'>
              <h3>{user.displayName}</h3>
              <p>{user.website}</p>
            </div>
            <div className='profile-followers'>
              <a><i className='material-icons highlight'>group</i> {followers}</a>
              <a><i className='material-icons highlight'>group_add</i> {following}</a>
            </div>
          </header>
          <div className='row'>
            <div className='col m12 l4'>
              <div className='card'>
                <header>
                  <i className='material-icons highlight'>account_box</i>
                  {resource.user_profile_basic_info}
                  <button type='button' id='btnBasicInfo' name='btnBasicInfo' hidden={isEditing} className='btn-edit' onClick={this.showPopup} />
                </header>
                <p>{user.occupation}</p>
                <p>{user.company}</p>
              </div>
              {!isEditingSkill &&
                <div className='card'>
                  <header>
                    <i className='material-icons highlight'>local_mall</i>
                    {resource.skills}
                    <button type='button' id='btnSkill' name='btnSkill' hidden={isEditing} className='btn-edit' onClick={this.toggleSkill} />
                  </header>
                  <section>
                    {
                      user.skills && user.skills.map((item, index) => {
                        return <p key={index}>{item.skill}<i hidden={!item.hirable} className='star highlight'/></p>;
                      })
                    }
                    <hr />
                    <p className='description'>
                      <i className='star highlight' />
                      {resource.user_profile_hireable_skill}
                    </p>
                  </section>
                </div>
              }
              {isEditingSkill &&
                <div className='card'>
                  <header>
                    <i className='material-icons highlight'>local_mall</i>
                    {resource.skills}
                    <button type='button' id='btnSkill' name='btnSkill' className='btn-close' onClick={this.toggleSkill} />
                  </header>
                  <section>
                    {
                      user.skills && user.skills.map((item, index) => {
                        return (
                          <div key={index} className='chip'>
                            {item.skill}
                            {item.hirable === true && <i className='star highlight' />}
                            <button type='button' name='btnRemoveSkill' className='close' onClick={(e) => this.removeSkill(e, item.skill)}/>
                          </div>
                        );
                      })
                    }
                    <label className='form-group inline-input'>
                      <Chips
                          type='text' id='skill' name='skill'
                          value={chipsSkill}
                          onChange={this.onChangeSkillChips}
                          fetchSuggestions={(value) => this.fetchSuggestions(value)}
                          shouldRenderSuggestions={value => value.length >= 1}
                          renderChip={(item) => (
                              <div>
                                <div>{item.skill} <span onClick={() => this.onRemoveChips(item.skill)}>&times; &nbsp;</span></div>
                              </div>
                          )}
                          fromSuggestionsOnly={false}
                          renderSuggestion={(item, { query }) => (
                              <div
                                  key={item.skill}>
                                {item.skill}
                              </div>
                          )}
                          getSuggestionValue={suggestion => suggestion.skill}
                          placeholder={resource.placeholder_user_profile_skill}
                      />
                      <button type='button' id='btnAddSkill' name='btnAddSkill' className='btn-add' onClick={this.addSkill}/>
                    </label>
                    <label className='checkbox-container'>
                      <input type='checkbox' id='hireable' name='hireable' value={this.state.hireable} onChange={this.updateState} />
                      {resource.user_profile_hireable_skill}
                    </label>
                    <hr />
                    <p className='description'>
                      <i className='star highlight'/>{resource.user_profile_hireable_skill}
                    </p>
                  </section>
                  <footer>
                    <button type='button' id='btnSaveSkill' name='btnSaveSkill' onClick={this.saveChanges}>
                      {resource.save}
                    </button>
                  </footer>
                </div>
              }
              {
                !isEditingLookingFor &&
                <div className='card'>
                  <header>
                    <i className='material-icons highlight'>find_in_page</i>
                    {resource.user_profile_looking_for}
                    <button type='button' id='btnLookingFor' name='btnLookingFor' hidden={isEditing && !isEditingLookingFor} className='btn-edit' onClick={this.toggleLookingFor} />
                  </header>
                  <section>
                    {
                      user.lookingFor && user.lookingFor.map((item, index) => {
                        return (<p key={index}>{item}</p>);
                      })
                    }
                  </section>
                </div>
              }
              {isEditingLookingFor &&
                <div className='card'>
                  <header>
                    <i className='material-icons highlight'>find_in_page</i>
                    {resource.user_profile_looking_for}
                    <button type='button' id='btnLookingFor' name='btnLookingFor' className='btn-close' onClick={this.toggleLookingFor} />
                  </header>
                  <section>
                    {
                      user.lookingFor && user.lookingFor.map((item, index) => {
                        return (<div key={index} className='chip' tabIndex={index}>
                          {item}
                          <button type='button' name='btnRemoveLookingFor' className='close' onClick={(e) => this.removeLookingFor(e, item)} />
                        </div>);
                      })
                    }
                    <label className='form-group inline-input'>
                      <input name='lookingFor' className='form-control'
                        value={lookingFor} onChange={this.updateState}
                        placeholder={resource.placeholder_user_profile_looking_for} maxLength={100} />
                      <button type='button' id='btnAddLookingFor' name='btnAddLookingFor' className='btn-add' onClick={this.addLookingFor} />
                    </label>
                  </section>
                  <footer>
                    <button type='button' id='btnSaveLookingFor' name='btnSaveLookingFor' onClick={this.saveChanges}>
                      {resource.save}
                    </button>
                  </footer>
                </div>
              }
              <div className='card'>
                <header>
                  <i className='material-icons highlight'>chat</i>
                  {resource.user_profile_social}
                  <button type='button' id='btnSocial' name='btnSocial' hidden={isEditing} className='btn-edit' onClick={this.showPopup} />
                </header>
                <div>
                  {
                    user.facebookLink &&
                    <a href={'https://facebookcom/' + user.facebookLink} title='facebook' target='_blank'>
                      <i className='fa fa-facebook' />
                      <span>facebook</span>
                    </a>
                  }
                  {
                    user.skypeLink &&
                    <a href={'https://skype.com/' + user.skypeLink} title='Skype' target='_blank'>
                      <i className='fa fa-skype' />
                      <span>Skype</span>
                    </a>
                  }
                  {
                    user.twitterLink &&
                    <a href={'https://twitter.com/' + user.twitterLink} title='Twitter' target='_blank'>
                      <i className='fa fa-twitter' />
                      <span>Twitter</span>
                    </a>
                  }
                  {
                    user.instagramLink &&
                    <a href={'https://instagram.com/' + user.instagramLink} title='Instagram' target='_blank'>
                      <i className='fa fa-instagram' />
                      <span>Instagram</span>
                    </a>
                  }
                  {
                    user.linkedinLink &&
                    <a href={'https://linkedin.com/' + user.linkedinLink} title='Linked in' target='_blank'>
                      <i className='fa fa-linkedin' />
                      <span>Linked in</span>
                    </a>
                  }
                  {
                    user.googleLink &&
                    <a href={'https://plus.google.com/' + user.googleLink} title='Google' target='_blank'>
                      <i className='fa fa-google' />
                      <span>Google</span>
                    </a>
                  }
                  {
                    user.dribbbleLink &&
                    <a href={'https://dribbble.com/' + user.dribbbleLink} title='dribbble' target='_blank'>
                      <i className='fa fa-dribbble' />
                      <span>dribbble</span>
                    </a>
                  }

                  {
                    user.customLink01 &&
                    <a href={user.customLink01} target='_blank'>
                      <i className='fab fa-globe-asia' />
                    </a>
                  }
                  {
                    user.customLink02 &&
                    <a href={user.customLink02} target='_blank'>
                      <i className='fab fa-globe-asia' />
                    </a>
                  }
                  {
                    user.customLink03 && <a href={user.customLink03} target='_blank'>
                      <i className='fab fa-globe-asia' />
                    </a>
                  }
                  {
                    user.customLink04 && <a href={user.customLink04} target='_blank'>
                      <i className='fab fa-globe-asia' />
                    </a>
                  }
                  {
                    user.customLink05 && <a href={user.customLink05} target='_blank'>
                      <i className='fab fa-globe-asia' />
                    </a>
                  }
                  {
                    user.customLink06 && <a href={user.customLink06} target='_blank'>
                      <i className='fab fa-globe-asia' />
                    </a>
                  }
                  {
                    user.customLink07 && <a href={user.customLink07} target='_blank'>
                      <i className='fab fa-globe-asia' />
                    </a>
                  }
                  {
                    user.customLink08 && <a href={user.customLink08} target='_blank'>
                      <i className='fab fa-globe-asia' />
                    </a>
                  }
                </div>
              </div>
            </div>

            <div className='col m12 l8'>
              <div className='card border-bottom-highlight'>
                <header>
                  <i className='material-icons highlight'>person</i>
                  {resource.user_profile_bio}
                  <button type='button' id='btnBio' name='btnBio'
                    hidden={isEditing && !isEditingBio}
                    className={(!isEditingBio ? 'btn-edit' : 'btn-close')}
                    onClick={this.toggleBio} />
                </header>
                {!isEditingBio &&
                  <p>{user.bio}</p>}
                {isEditingBio && <textarea onChange={this.editBio} name='bio' value={user.bio} />}
                {isEditingBio &&
                  <footer>
                    <button type='button' id='btnSaveBio' name='btnSaveBio' onClick={this.saveChanges}>
                      {resource.save}
                    </button>
                  </footer>
                }
              </div>
              <div className='card border-bottom-highlight'>
                <header>
                  <i className='material-icons highlight'>flash_on</i>
                  {resource.interests}
                  <button type='button' id='btnInterest' name='btnInterest'
                    hidden={isEditing && !isEditingInterest}
                    className={(!isEditingInterest ? 'btn-edit' : 'btn-close')}
                    onClick={this.toggleInterest} />
                </header>
                {!isEditingInterest &&
                  <section className='row'>
                    {
                      user.interests && user.interests.map((item, index) => {
                        return (<span key={index} className='col s4'>{item}</span>);
                      })
                    }
                  </section>
                }
                {isEditingInterest &&
                  <section className='row'>
                    {user.interests && user.interests.map((item, index) => {
                      return (<div key={index} className='chip' tabIndex={index}>{item}
                        <button type='button' name='btnRemoveInterest' className='close' onClick={(e) => this.removeInterest(e, item)} />
                      </div>);
                    })
                    }
                    {/*<label className='col s12 inline-input'>*/}
                    {/*  <input type='text' name='interest' onChange={this.updateState}*/}
                    {/*    placeholder={resource.placeholder_user_profile_interest} value={this.state.interest} maxLength={100} />*/}
                    {/*  <button type='button' id='btnAddInterest' name='btnAddInterest' className='btn-add' onClick={this.addInterest} />*/}
                    {/*</label>*/}
                    <label className='form-group inline-input'>
                      <Chips
                          type='text' id='interest' name='interest'
                          value={chipsInterest}
                          onChange={this.onChangeInterestChips}
                          fetchSuggestions={(value) => this.fetchInterestSuggestions(value)}
                          shouldRenderSuggestions={value => value.length >= 1}
                          renderChip={(item) => (
                              <div>
                                <div>{item} <span onClick={() => this.onRemoveChipInterests(item)}>&times; &nbsp;</span></div>
                              </div>
                          )}
                          fromSuggestionsOnly={false}
                          renderSuggestion={(item, { query }) => (
                              <div
                                  key={item}>
                                {item}
                              </div>
                          )}
                          getSuggestionValue={suggestion => suggestion.interest}
                          placeholder={resource.placeholder_user_profile_interest}
                      />
                      <button type='button' id='btnAddSkill' name='btnAddSkill' className='btn-add' onClick={this.addInterest}/>
                    </label>
                  </section>
                }
                {isEditingInterest &&
                  <footer>
                    <button type='button' id='btnSaveInterest' name='btnSaveInterest' onClick={this.saveChanges}>
                      {resource.save}
                    </button>
                  </footer>}
              </div>

              <div className='card border-bottom-highlight'>
                <header>
                  <i className='material-icons highlight'>beenhere</i>
                  {resource.achievements}
                  <button type='button' id='btnAchievement' name='btnAchievement'
                    hidden={isEditing && !isEditingAchievement}
                    className={!isEditingAchievement ? 'btn-edit' : 'btn-close'}
                    onClick={this.toggleAchievement} />
                </header>
                {
                  !isEditingAchievement && user.achievements && user.achievements.map((achievement, index) => {
                    return <section key={index}>
                      <h3>{achievement.subject}
                        {achievement.highlight && <i className='star highlight float-right' />}
                      </h3>
                      <p className='description'>{achievement.description}</p>
                      <hr />
                    </section>;
                  })
                }
                {
                  isEditingAchievement && user.achievements && user.achievements.map((achievement, index) => {
                    return <section key={index}>
                      <h3>{achievement.subject}
                        {achievement.highlight && <i className='star highlight' />}
                      </h3>
                      <p className='description'>{achievement.description}</p>
                      <button type='button' className='btn-remove' onClick={(e) => this.removeAchievement(e, achievement.subject)} />
                      <hr />
                    </section>;
                  })
                }
                {isEditingAchievement &&
                  <section>
                    <div className='form-group'>
                      <input type='text' name='subject' className='form-control'
                        value={subject} onChange={this.updateState}
                        placeholder={resource.placeholder_user_profile_achievement_subject}
                        maxLength={50} required={true} />
                      <input type='text' name='description' className='form-control'
                        value={description} onChange={this.updateState}
                        placeholder={resource.placeholder_user_profile_achievement_description}
                        maxLength={100} required={true} />
                    </div>
                    <label className='checkbox-container'>
                      <input type='checkbox' id='highlight' name='highlight'
                        value={highlight} onChange={this.updateState} />
                      {resource.user_profile_highlight_achievement}
                    </label>
                    <div className='btn-group'>
                      <button type='button' id='btnAddAchievement' name='btnAddAchievement' className='btn-add' onClick={this.addAchievement} />
                      {resource.button_add_achievement}
                    </div>
                  </section>
                }
                {isEditingAchievement &&
                  <footer>
                    <button type='button' id='btnSaveAchievement' name='btnSaveAchievement' onClick={this.saveChanges}>
                      {resource.save}
                    </button>
                  </footer>
                }
              </div>
            </div>
          </div>
        </form>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
          // portalClassName='modal-portal'
          className='modal-portal-content'
          bodyOpenClassName='modal-portal-open'
          overlayClassName='modal-portal-backdrop'
        >
          <GeneralInfo history={this.props.history}
            resource={resource}
            close={this.closeModal}
            saveEmit={this.saveEmit}
            user={user} location={this.props.location} />
        </Modal>
      </div>
    );
  }
}
