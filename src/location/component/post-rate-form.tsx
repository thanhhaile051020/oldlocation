import * as React from 'react';
import {BaseViewComponent} from 'react-onex';
import {getLocale, handleError, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {LocationRate} from '../model/LocationRate';
import '../rate.scss';

export class PostRateForm extends BaseViewComponent<any, any> {
  constructor(props) {
    super(props,storage.resource(), getLocale);
    this.postReview = this.postReview.bind(this);
    this.state = {
      review: ''
    };
  }
  private readonly locationService = applicationContext.getLocationService();
  closeModal = (index) => {
    this.props.closeModal(index);
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  renderRateStar = (value) => {
    let list5 = Array(5);
    list5 = list5.fill(<i />);

    const listClass = [];
    for (let i = 1; i <= value; i++) {
      listClass.push(`star-${i}`);
    }
    const longClass = listClass.join(' ');
    const divStar = <div className={`rv-star3 ${longClass}`}>{...list5}</div>;
    return divStar;
  }
  async postReview(event) {
    try {
      event.preventDefault();
      const props = this.props;
      const locationRate: LocationRate = {};
      locationRate.locationId = props.location.locationId;
      locationRate.userId = 'username';
      locationRate.rate = props.value;
      locationRate.review = this.state.review;
      const res = await this.locationService.rateLocation(locationRate);
      storage.alert().alertSuccess('Your review is submited');
      this.closeModal(1);
      this.props.loadData();
    } catch (err) {
      handleError(err);
    }
  }
  render() {
    const props = this.props;
    const resource = storage.resource().resource();
    return (
      <div className='view-container'>
        <form id='addNewRate' name='addNewRate' model-name='addNewRate' ref='form'>
          <header>
            <button type='button' id='btnClose' name='btnClose' className='btn-close' onClick={() => this.closeModal(1)} />
            <h2>{props.location.locationName}</h2>
          </header>
          <div>
            <section className='user-title'>
              <span><b>{resource.user_name}</b></span>
            </section>
            <section className='user-star'>
              {this.renderRateStar(this.props.value)}
            </section>
            <section className='user-input'>
              <textarea
                className='rateReview'
                id='review'
                name='review'
                onChange={this.handleChange}
                value={this.state.review}
                placeholder={resource.placeholder_text}
              />
            </section>
            <section className='user-input'>
              <div className='takePhoto'>
              <button className='addPhoto'>
                <i className='camera' /><i className='text-camera'>{resource.add_photo_btn}</i>
              </button>
              </div>
            </section>
          </div>
          <footer>
            <button type='submit' id='btnSave' name='btnSave' onClick={(event) => this.postReview(event)}>
              Post
            </button>
          </footer>
        </form>
      </div>
    );
  }
}
