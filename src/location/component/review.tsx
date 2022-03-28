import * as React from 'react';
import Modal from 'react-modal';
import {BaseViewComponent} from 'react-onex';
import {getLocale, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Location} from '../model/Location';
import {LocationRate} from '../model/LocationRate';
import '../rate.scss';
import {LocationRateSM} from '../search-model/LocationRateSM';
import {PostRateForm} from './post-rate-form';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('#root');

interface InternalState {
  rates: LocationRate[];
  isOpenRateModal: boolean;
  voteStar: number;
  currClass: string;
  rateClassName: string;
  location: Location;
  pageSize: number;
}

export default class Review extends BaseViewComponent<any, InternalState> {
  constructor(props) {
    super(props,storage.resource(), getLocale);
    this.moreReview = this.moreReview.bind(this);
    this.resource = storage.resource().resource();
    this.state = {
      rates: [],
      isOpenRateModal: false,
      voteStar: 0,
      currClass: 'rate',
      rateClassName: 'rate',
      location: new Location(),
      pageSize: 3,
    };
  }
  public resource: any = {};
  protected readonly maxLengthReviewText = 65;
  private readonly locationRateService = applicationContext.getLocationRateService();
  private readonly locationService = applicationContext.getLocationService();

  componentDidMount() {
    this.load();
  }

  async load() {
    const locationRateSM = new LocationRateSM();
    const { locationId } = this.props;
    locationRateSM.locationId = locationId;
    locationRateSM.limit = this.state.pageSize;
    locationRateSM.sort = '-rateTime';
    const location = await this.locationService.load(locationId);
    const searchResult = await this.locationRateService.search(locationRateSM);
    this.setState({ rates: searchResult.results, location, currClass: 'rate', rateClassName: 'rate'});
  }

  handleOnclick = (n: number) => {
    const currClass = this.generateRatingClasses(n);
    this.setState({
      currClass,
      voteStar: n,
      isOpenRateModal: true,
      rateClassName: currClass
    });
  }

  generateRatingClasses = (n: number) => {
    const className = ['rate'];
    for (let i = 1; i <= n; i++) {
      className.push(`star-${i}`);
    }
    return className.join(' ');
  }

  handleOnMouseEnter = (n: number) => {
    const rateClassName = this.generateRatingClasses(n);
    this.setState({ rateClassName });
  }

  handleOnMouseLeave = () => {
    const { currClass } = this.state;
    this.setState({
      rateClassName: currClass
    });
  }

  renderDetailStar = () => {
    const { location } = this.state;
    const list = [];
    if (!!location.info) {
      const viewCount = location.info.viewCount;
      for (let i = 5; i > 0; i--) {
        const value = location.info[`rate${i}`];
        let percent = 0;
        if (viewCount !== 0) {
          percent = value * 100 / viewCount;
        }
        const numberStar = Array(i).fill(<i />);
        const startDiv = <div className='rv-star'>{...numberStar}</div>;
        const endDiv = <div key={i} className='progress'>
          <span style={{ width: `${percent}%` }} />
        </div>;
        const rateDiv = <div className='detail'>{startDiv}{endDiv}</div>;

        list.push(rateDiv);
      }
    }
    return list;
  }

  renderRatingStar = () => Array.from(Array(5).keys()).map(item => <i
    key={item}
    onClick={() => this.handleOnclick(item + 1)}
    onMouseEnter={() => this.handleOnMouseEnter(item + 1)}
    onMouseLeave={() => this.handleOnMouseLeave()}
  />)

  renderReviewStar = (value) => {
    const starList = Array(5).fill(<i />);
    const classes = Array.from(Array(value).keys()).map(i => `star-${i + 1}`).join(' ');
    return <div className={`rv-star2 ${classes}`}>{...starList}</div>;
  }

  calculatorPercentStar = (value) => Number(value * 100 / 5);

  closeModal = (index) => {
    if (index === 1) {
      this.setState({ isOpenRateModal: false });
      // this.loadData();
    }
  }

  async moreReview(e) {
    e.preventDefault();
    const locationRateSM = new LocationRateSM();
    const { locationId } = this.props;
    locationRateSM.locationId = locationId;
    locationRateSM.limit = this.state.pageSize + 3;
    locationRateSM.sort = '-rateTime';
    const rates = await this.locationRateService.search(locationRateSM);
    this.setState({ rates: rates.results, currClass: 'rate',
        rateClassName: 'rate', pageSize: this.state.pageSize + 3});
  }

  formatReviewText = (text: string) => {
    if (text && text.length > this.maxLengthReviewText) {
      let textSub = text.substring(0, this.maxLengthReviewText);
      textSub = textSub + ' ...';
      const a = <span>{this.resource.review} {textSub} <span className='more-reviews'>More</span></span>;
      return a;
    } else {
      return <span>{this.resource.review} {text}</span>;
    }
  }

  render() {
    const { rates } = this.state;
    const location: Location = this.state.location;
    const resource = this.resource;
    return (
      <>
        <div className='row top-content'>
          <div className='col s4 m5 l6 summary' >
            <div className='score'><span>{(location.info) && location.info.rate}</span></div>
            <div className='average'>
              <div className='empty-stars' />
              <div className='full-stars'
                style={{ width: `${(location.info) && this.calculatorPercentStar(location.info.rate) || 0}%` }} />
            </div>
          </div>
          <div className='col s8 m7 l6'>
            {...this.renderDetailStar()}
          </div>
        </div>
        <div className='row mid-content'>
          <div className='col s12 m12 l12 rating'>
            <p>{resource.rating_text}</p>
            <div id='rate' className={this.state.rateClassName}>
              {...this.renderRatingStar()}
            </div>
          </div>
        </div>
        <div className='title'>
          <span><b>{resource.reviews}</b></span>
        </div>
        <ul className='row list-view'>
        {
          (
            rates.length > 0 && rates.map((value: LocationRate, index: number) => {
              return <li key={index} className='col s12 m12 l12 review-custom'>
                <section className='card'>
                  <h4>{value.userId}</h4>
                  <p>{value.rateTime}</p>
                  {this.renderReviewStar(value.rate)}
                  {this.formatReviewText(value.review)}
                </section>
              </li>;
            }) || ''
          )}
        </ul>
        <div className='col s12 m12 l12 more-reviews-div'>
          <span className='more-reviews' onClick={this.moreReview}>
            <b>MORE REVIEWS</b>
        </span></div>
        <Modal
          isOpen={this.state.isOpenRateModal}
          style={customStyles}
          contentLabel='Modal'
          portalClassName='modal-portal'
          className='modal-portal-content small-width'
          bodyOpenClassName='modal-portal-open'
          overlayClassName='modal-portal-backdrop'>
          <PostRateForm value={this.state.voteStar} location={location} closeModal={this.closeModal} loadData={this.load}/>
        </Modal>
      </>
    );
  }
}
