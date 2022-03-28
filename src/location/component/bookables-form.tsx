import * as React from 'react';
import Modal from 'react-modal';
import {BaseComponent, HistoryProps} from 'react-onex';
import {getLocale, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {BookableSM} from '../search-model/BookableSM';
import AddBookingForm from './add-booking-form';
import {EventScheduler} from './event-scheduler';

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

interface Props extends HistoryProps {
  locationId: any;
}

export default class BookablesForm extends BaseComponent<Props, any> {
  constructor(props) {
    super(props, storage.resource(),storage.ui(), getLocale, storage.loading());
    this.resource = storage.resource().resource();
    this.state = {
      objectBookable: [],
      isDone: false,
      allBooking: [],
      isOpenBookingModal: false,
      objTimeBooking: {
        startTime: '',
        endTime: ''
      },
      bookableSelect: '',
      chosenDate: new Date()
    };
  }
  id;
  public resource: any = {};
  private readonly bookableService = applicationContext.getBookableService();
  private readonly bookingService = applicationContext.getBookingService();

  componentDidMount(): void {
    this.loadDataBookable(new Date());
    super.componentDidMount();
  }
  async loadDataBookable(date) {
    // @ts-ignore
    const bookableSM: BookableSM = {};
    const {locationId} = this.props;
    this.id = locationId;
    bookableSM.locationId = locationId;
    const objectBookable = await this.bookableService.search(bookableSM);
    const bookableIdList = [];
    if (objectBookable.results.length > 0) {
      const obj = {};
      objectBookable.results.map(item0 => {
        bookableIdList.push(item0.bookableId);
      });
      obj['bookableIdList'] = bookableIdList;
      obj['date'] = date.toISOString().split('T')[0];
      const item = await this.bookingService.getFreeLocationByBookableList(obj);
      this.setState({objectBookable: objectBookable.results, allBooking: item, isDone: true});
    }
  }

  closeModal = (index) => {
    if (index === 1) {
      this.setState({ isOpenBookingModal: false});
    }
  }

  openModal = (objTimeBooking, bookableSelect) => {
    this.setState({objTimeBooking, bookableSelect, isOpenBookingModal: true});
  }

  changeDate = (date) => {
    this.setState({isDone: false, chosenDate: date});
    this.loadDataBookable(date);
  }

  render() {
    const {objectBookable, isDone, allBooking} = this.state;
    console.log('render bookable');
    console.log('allBooking', allBooking);
    console.log('isDone', isDone);
    return (
      <>
        <h3>BOOKABLE</h3>
        <div style={{width: '100%'}}>
          {
            (isDone) ? <EventScheduler
              bookAbleList={objectBookable}
              arrayBooking={allBooking}
              openModal={this.openModal}
              changeDate={this.changeDate}
              chosenDate={this.state.chosenDate}
            /> : 'No Bookable Here'
          }
        </div>
          <Modal
              isOpen={this.state.isOpenBookingModal}
              style={customStyles}
              contentLabel='Modal'
              portalClassName='modal-portal'
              className='modal-portal-content small-width'
              bodyOpenClassName='modal-portal-open'
              overlayClassName='modal-portal-backdrop'
          >
            <AddBookingForm objTimeBooking={this.state.objTimeBooking} bookableSelect = {this.state.bookableSelect}
                            closeModal={this.closeModal} changeDate={this.changeDate}/>
          </Modal>
      </>
    );
  }
}
