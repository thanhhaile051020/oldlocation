import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {BaseComponent} from 'react-onex';
import {getLocale, storage} from 'uione';
import '../../assets/css/event-scheduler.css';

const HOURS = 24;
const PERIODS = 48;
const CELL_WIDTH = 40;
const CELL_HEIGHT = 35;
const PERIOD_WIDTH = 40;
const PERIOD_HEIGHT = 30;
const HOUR_WIDTH = 80;
const HOUR_HEIGHT = 30;
const MID_DAY_HOUR = 12;
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

export class EventScheduler extends BaseComponent<any, any> {
  constructor(props) {
    super(props,storage.resource(), storage.ui(), getLocale, storage.loading());
    this.state = {
      bookAbleList: this.props.bookAbleList,
      chosenDate:  this.props.chosenDate,
      out_selectedTimeRange: {startTime: '', endTime: ''},
      lengthBookable: this.props.bookAbleList.length,
      arrayBooking: this.props.arrayBooking,
      isOpenBookingModal: false
    };
  }

  startHourIndex;
  endHourIndex;
  startHour: Date;
  endHour: Date;
  rowIndex;
  private readonly arrayHour = Array.from(Array(12).keys()).map(i => i);
  private mousedown = false;
  private listidSelect = [];

  convertToHourMinute = (columnIndex) => {
    const hourPart = columnIndex / 2;
    const minutePart = columnIndex % 2 === 1 ? 30 : 0;
    return {
      hourPart,
      minutePart
    };
  }

  isInt = (n) => {
    return n % 1 === 0;
  }

  onCellMouseDown = (event) => {
    event.preventDefault();
    console.log('mouse down');
    this.mousedown = true;
    this.clearPreviousBooking();
    this.listidSelect.push(event.currentTarget.id);
    document.getElementById(event.currentTarget.id).style.background = '#33aaff';
    const columnIndex = +event.currentTarget.dataset.id;
    const rowIndexEvent =  +event.currentTarget.dataset.rowindex;
    this.rowIndex = rowIndexEvent;
    this.startHourIndex = columnIndex;
    this.startHour = new Date(this.state.chosenDate);
    this.startHour.setHours(this.convertToHourMinute(this.startHourIndex).hourPart);
    this.startHour.setMinutes(this.convertToHourMinute(this.startHourIndex).minutePart);
    this.startHour.setSeconds(0);
    this.endHour = null;
    this.setState({
      out_selectedTimeRange: {
        startTime: this.startHour,
        endTime: null
      }
    });
  }

  onCellMouseUp = (event) => {
    event.preventDefault();
    console.log('mouse up');
    this.mousedown = false;
    console.log('list', this.listidSelect);
    this.clearPreviousBooking();
    this.listidSelect = [];
    const columnIndex = +event.currentTarget.dataset.id;
    const rowIndexEvent = +event.currentTarget.dataset.rowindex;
    this.rowIndex = rowIndexEvent;
    this.endHourIndex = columnIndex;
    this.endHour = new Date(this.state.chosenDate);
    this.endHour.setHours(this.convertToHourMinute(this.endHourIndex).hourPart);
    this.endHour.setMinutes(this.convertToHourMinute(this.endHourIndex).minutePart);
    this.endHour.setSeconds(0);
    this.endHour.setMinutes(this.endHour.getMinutes() + 30);
    if (this.startHour.getTime() > this.endHour.getTime()) {
      [this.startHour, this.endHour] = [this.endHour, this.startHour];
    }
    const objTimeBooking = {
      startTime: this.startHour,
      endTime: this.endHour
    };
    this.setState({
      out_selectedTimeRange: {
        endTime: this.endHour,
        startTime: this.startHour
      }
    });
    this.props.openModal(objTimeBooking, this.state.bookAbleList[this.rowIndex]);
  }

  clearPreviousBooking = () => [
    this.listidSelect.map(id => {
      document.getElementById(id).style.background = '';
    })
  ]

  mouseEnter = (event)  => {
    event.preventDefault();
    console.log(event.currentTarget.id);
    let columnIndex = event.currentTarget.dataset.id;
    columnIndex++;
    const rowIndex = event.currentTarget.dataset.rowindex;
    if (this.mousedown === true) {
      const existIndex = this.listidSelect.indexOf(event.currentTarget.id);
      if (existIndex < 0) {
        this.listidSelect.push(event.currentTarget.id);
        document.getElementById(event.currentTarget.id).style.background = '#33aaff';
      } else {
        if (document.getElementById(`${rowIndex}${columnIndex}`)) {
          document.getElementById(`${rowIndex}${columnIndex}`).style.background = '';
        }
      }
    }
  }

  updateDayPicker = (event) => {
    this.setState({chosenDate: event});
    this.props.changeDate(event);
  }

  render4Cell = (length) => {
    const list = [];
    for (let j = 0; j < length; j++) {
      const list48 = [];
      Array.from(Array(PERIODS).keys()).map((e, i) => {
        list48.push(<div key={i} unselectable='on'
                         onMouseDown={this.onCellMouseDown}
                         onMouseUp={this.onCellMouseUp}
                         onMouseEnter={this.mouseEnter}
                         className='scheduler_cell'
                         data-id={i}
                         data-rowindex={j}
                         id={`${j}${i}`}
                         style={{
                           left: i * CELL_WIDTH + 'px',
                           top: CELL_HEIGHT * j + 'px',
                           width: CELL_WIDTH + 'px',
                           height: CELL_HEIGHT + 'px',
                           position: 'absolute'
                         }}/>);
      });
      list.push(<div><>{...list48}</>
      </div>);
    }
    return list;
  }

  renderBookedEvent = () => {
    const {arrayBooking} = this.state;
    const listAllBookedEvent = [];
    arrayBooking.map((array, index) => {
      if (array) {
        array.map((item, index2) => {
          if (item === true) {
            let startHour = index2 / 2;
            let startMinute = 0;
            if (!this.isInt(startHour)) {
              startMinute = 30;
              startHour = Math.floor(startHour);
            }
            let endHour = index2 / 2 + 0.5;
            let endMinute = 0;
            if (!this.isInt(endHour)) {
              endMinute = 30;
              endHour = Math.floor(endHour);
            }
            listAllBookedEvent.push(<div style={{position: 'absolute'}}>
              <div
                  className='scheduler_event'
                  unselectable='on'
                  tabIndex={-1}
                  style={{
                    position: 'absolute',
                    left: startHour % HOURS * HOUR_WIDTH + (startMinute / 30) * CELL_WIDTH + 'px',
                    top: index * CELL_HEIGHT + 'px',
                    width: endHour % HOURS * HOUR_WIDTH + (endMinute / 30) * CELL_WIDTH - (startHour % HOURS * HOUR_WIDTH + (startMinute / 30) * CELL_WIDTH) + 'px',
                    height: CELL_HEIGHT + 'px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}/>
            </div>) ;
          }
        });
      }
    });
    return listAllBookedEvent;
  }

  render() {
    const {out_selectedTimeRange, arrayBooking, bookAbleList} = this.state;
    console.log('render event ');
    console.log('arrayBooking', arrayBooking);
    const HourPeriods =
      <>{Array.from(Array(HOURS).keys()).map((e, i) => {
        return <div key={i} aria-hidden='true' unselectable='on'
                    className='scheduler_timeheadergroup scheduler_timeheader_cell'
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: i * HOUR_WIDTH + 'px',
                      width: HOUR_WIDTH + 'px',
                      height: HOUR_HEIGHT + 'px',
                      userSelect: 'none',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}>
          <div unselectable='on'
               className='scheduler_timeheadergroup_inner scheduler_timeheader_cell_inner'>{i % MID_DAY_HOUR === 0 ? MID_DAY_HOUR : i % MID_DAY_HOUR} {i < MID_DAY_HOUR ? 'AM' : 'PM'}
          </div>
        </div>;
      })
      }</>;

    const MinutePeriods =
      <>{Array.from(Array(PERIODS).keys()).map((e, i) => {
        return <div key={i} aria-hidden='true' unselectable='on'
                    className='scheduler_timeheadercol scheduler_timeheader_cell'
                    style={{
                      position: 'absolute',
                      top: '30px',
                      left: i * PERIOD_WIDTH + 'px',
                      width: PERIOD_WIDTH + 'px',
                      height: PERIOD_HEIGHT + 'px',
                      userSelect: 'none',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}>
          <div unselectable='on'
               className='scheduler_timeheadercol_inner scheduler_timeheader_cell_inner'>{i % 2 === 0 ? '00' : '30'}
          </div>
        </div>;
      })
      }</>;

    return (
      <>
      <div className='event-scheduler-main'>
        <div id='root'>
          <label className='col s12 m6' htmlFor='chosenDate'>
            Please select Event date
            <DayPickerInput
              format={'YYYY-MM-DD'}
              value={this.state.chosenDate}
              onDayChange={this.updateDayPicker}
            />
          </label>
          <div>
            <div className='scheduler_main' role='region' aria-label='scheduler' style={{
              userSelect: 'none',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
              lineHeight: '1.2',
              position: 'relative',
              height: '330px'
            }}>
              <div style={{position: 'absolute', left: '0px', width: '80px'}}>
                <div unselectable='on' className='scheduler_corner'
                     style={{width: '80px', height: '60px', overflow: 'hidden', position: 'relative'}}>
                  <div className='scheduler_corner_inner' style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    right: '0px',
                    bottom: '0px',
                    width: '80px'
                  }}/>
                </div>
                <div className='scheduler_divider_horizontal'
                     style={{height: '1px', top: '60px'}}/>
                <div className='scheduler_rowheader_scroll' role='region'
                     aria-label='scheduler rows'
                     style={{width: '80px', height: '262px', overflow: 'hidden', position: 'relative'}}>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    {/*Left column */}
                    {
                      this.state.bookAbleList.map((item, index) => {
                        return (
                          <div key={index} unselectable='on' aria-label={item.bookableName} style={{
                            top: '0px',
                            width: '80px',
                            border: '0px none'
                          }}>
                            <div key={index} unselectable='on' className='scheduler_rowheader' style={{
                              width: '80px',
                              height: CELL_HEIGHT + 'px',
                              overflow: 'hidden',
                              position: 'relative'
                            }}>
                              <div key={index} unselectable='on' className='scheduler_rowheader_inner'>
                                <div className='scheduler_rowheader_inner_text'>
                                  {item.bookableName}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    }
                    {/*Left column */}
                  </div>
                </div>
              </div>
              <div className='scheduler_divider scheduler_splitter' unselectable='on'
                   style={{position: 'absolute', left: '79px', width: '1px', height: '323px'}}/>
              <div style={{marginLeft: '80px', marginRight: '1px', position: 'relative'}}>
                <div style={{
                  overflow: 'auto',
                  display: 'block',
                  position: 'absolute',
                  top: '0px',
                  width: '100%',
                  height: '331px'
                }}>
                  <div style={{height: '322px'}}>
                    <div style={{position: 'relative'}}>
                      {HourPeriods}
                      {MinutePeriods}
                      <div className='scheduler_divider_horizontal'
                           style={{
                             height: '1px',
                             position: 'absolute',
                             top: '60px',
                             width: '1920px'
                           }}/>
                      <div className='scheduler_scrollable' style={{
                        overflow: 'hidden',
                        height: '262px',
                        top: '61px',
                        position: 'absolute',
                        width: '1920px'
                      }}>
                        <div unselectable='on' className='scheduler_matrix' style={{
                          userSelect: 'none',
                          position: 'absolute',
                          height: '262px',
                          width: '1920px'
                        }}>
                          <div
                            style={{position: 'absolute', height: '1px', width: '1920px'}}/>
                          {/* Cells */}
                          {...this.render4Cell(this.state.lengthBookable)}

                          <div style={{position: 'absolute'}}>
                            {/* Columns */}
                            <>
                              {
                                Array.from(Array(PERIODS).keys()).map((e, i) => {
                                  return <div key={i} unselectable='on'
                                              className='scheduler_matrix_vertical_line'
                                              style={{
                                                left: i * CELL_WIDTH + 39 + 'px',
                                                top: '0px',
                                                width: '1px',
                                                height: '245px',
                                                fontSize: '1px',
                                                lineHeight: '1px',
                                                overflow: 'hidden',
                                                position: 'absolute'
                                              }}/>
                                    ;
                                })
                              }
                            </>
                            {/* Horizontal lines */}
                            <>
                              {
                                Array.from(Array(this.state.lengthBookable).keys()).map((e, i) => {
                                  return <div key={i} unselectable='on'
                                              className='scheduler_matrix_horizontal_line'
                                              style={{
                                                left: '0px',
                                                top: i * CELL_HEIGHT + 34 + 'px',
                                                width: '1920px',
                                                height: '1px',
                                                fontSize: '1px',
                                                lineHeight: '1px',
                                                overflow: 'hidden',
                                                position: 'absolute'
                                              }}/>
                                    ;
                                })
                              }
                            </>
                          </div>
                          {/* Input time ranges */}
                          {...this.renderBookedEvent()}
                          {
                            out_selectedTimeRange.startTime && out_selectedTimeRange.endTime &&
                            <div style={{position: 'absolute'}}>
                                <div
                                    className='scheduler_event scheduler_event_line0'
                                    unselectable='on'
                                    tabIndex={-1}
                                    style={{
                                      position: 'absolute',
                                      left: out_selectedTimeRange.startTime.getHours() % HOURS * HOUR_WIDTH + (out_selectedTimeRange.startTime.getMinutes() / 30) * CELL_WIDTH,
                                      top: CELL_HEIGHT * this.rowIndex + 'px',
                                      width: out_selectedTimeRange.endTime.getHours() % HOURS * HOUR_WIDTH + ((out_selectedTimeRange.endTime.getMinutes()) / 30) * CELL_WIDTH - (out_selectedTimeRange.startTime.getHours() % HOURS * HOUR_WIDTH + (out_selectedTimeRange.startTime.getMinutes() / 30) * CELL_WIDTH),
                                      height: CELL_HEIGHT + 'px',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden'
                                    }}>
                                    <div unselectable='on'
                                         className='scheduler_event_inner'>{'selected event'}
                                    </div>
                                    <div unselectable='on'
                                         className='scheduler_event_bar'
                                         style={{position: 'absolute'}}>
                                        <div unselectable='on'
                                             className='scheduler_event_bar_inner'
                                             style={{left: '0%', width: '100%'}}/>
                                    </div>
                                </div>
                            </div>
                          }
                          {/* Shadow when clicked */}
                          <div style={{position: 'absolute'}}>
                            <div style={{
                              position: 'absolute',
                              left: '0px',
                              top: '0px',
                              width: '0px',
                              height: '0px'
                            }}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div style={{clear: 'left'}}/>
              <div style={{display: 'none'}}/>
              {/*<div className="scheduler_loading"*/}
              {/*     style={{position: 'absolute', left: '86px', top: '95px', display: 'none'}}>Loading...*/}
              {/*</div>*/}
              <div className='scheduler_header_icon scheduler_header_icon_hide' style={{
                position: 'absolute',
                left: '79px',
                top: '93px',
                width: '10px',
                height: '20px',
                cursor: 'pointer',
                display: 'none'
              }}/>
            </div>
          </div>
        </div>
      </div>
        {/*<Modal*/}
        {/*  isOpen={this.state.isOpenBookingModal}*/}
        {/*  style={customStyles}*/}
        {/*  contentLabel='Modal'*/}
        {/*  portalClassName='modal-portal'*/}
        {/*  className='modal-portal-content small-width'*/}
        {/*  bodyOpenClassName='modal-portal-open'*/}
        {/*  overlayClassName='modal-portal-backdrop'*/}
        {/*>*/}
        {/*  <AddBookingForm/>*/}
        {/*</Modal>*/}
        </>
    );
  }
}
