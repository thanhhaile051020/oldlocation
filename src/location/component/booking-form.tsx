import * as React from "react";
import { BaseComponent, HistoryProps } from "react-onex";
import { getLocale, storage } from "uione";
import imageOnline from "../../assets/images/status/online.svg";
import applicationContext from "../config/ApplicationContext";

interface InternalState {
  isEditingAbout: boolean;
  isEditingInterest: boolean;
  isEditingAchievement: boolean;
  achievementName: string;
  hightLightAchie: string;
  achievementDes: string;
}

export default class BookingForm extends BaseComponent<
  HistoryProps,
  InternalState
> {
  private id;
  constructor(props) {
    super(props, storage.resource(), storage.ui(), getLocale);
    if (props.match) {
      this.id = props.id ? props.id : props.match.params.id;
    } else {
      this.id = props["props"]["id"]
        ? props["props"]["id"]
        : props["props"].match.params.id;
    }
    this.resource = storage.resource().resource();
    this.state = {
      isOpen: false,
      isEditingAbout: false,
      isEditingInterest: false,
      isEditingAchievement: false,
      isEditingSkill: false,
      isLookingFor: false,
      achievementName: "",
      hightLightAchie: "",
      achievementDes: "",
      skillsEditing: [],
      bio: "",
      textSkillsEditing: "",
      interestEdit: "",
      newLookingFor: "",
      newSkillHireable: false,
      isEditing: false,
      objectBooking: {},
    };
  }
  protected resource: any = {};
  private readonly bookingService = applicationContext.getBookingService();
  async componentDidMount() {
    const objectBooking = await this.bookingService.load(this.id);
    // this.setState({ objectBooking }, this.loadData);
    this.setState({ objectBooking });
  }

  render() {
    const resource = this.resource;
    const {
      user,
      achievementDes,
      isEditingAchievement,
      achievementName,
      hightLightAchie,
      isEditingAbout,
      isEditingInterest,
      isLookingFor,
      isEditing,
    } = this.state;
    const { newLookingFor, textSkillsEditing, isEditingSkill, objectBooking } =
      this.state;
    return (
      <div className="profile view-container">
        <form id="locationForm" name="locationForm">
          <header className="border-bottom-highlight">
            <picture className="cover-image">
              <img src="https://pre00.deviantart.net/6ecb/th/pre/f/2013/086/3/d/facebook_cover_1_by_alphacid-d5zfrww.jpg" />
            </picture>
            <div className="profile-wallpaper-wrapper">
              <div className="avatar-wrapper">
                <img
                  className="avatar"
                  src={
                    "https://www.bluebridgewindowcleaning.co.uk/wp-content/uploads/2016/04/default-avatar.png"
                  }
                />
                <img
                  className="profile-status"
                  alt="status"
                  src={imageOnline}
                />
              </div>
              <div className="profile-title">
                <h3>CNBC International</h3>
                <p>Technology Channel</p>
              </div>
              <div className="profile-description">
                <a>
                  <i className="fa fa-user-o highlight" /> Followers{" "}
                  <span>100</span>
                </a>
                <a>
                  <i className="fa fa-user-o highlight" /> Following{" "}
                  <span>100</span>
                </a>
              </div>
            </div>
          </header>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h3>Booking</h3>
            <h4>Booking Id: {objectBooking && objectBooking.bookingId}</h4>
            <h4>User Id: {objectBooking && objectBooking.userId}</h4>
            <h4>Bookable Id: {objectBooking && objectBooking.bookableId}</h4>
            <h4>Subject: {objectBooking && objectBooking.subject}</h4>
            <h4>Description: {objectBooking && objectBooking.description}</h4>
            <h4>
              Start Booking Time:{" "}
              {objectBooking && `${objectBooking.startBookingTime}`}
            </h4>
            <h4>
              End Booking Time:{" "}
              {objectBooking && `${objectBooking.endBookingTime}`}
            </h4>
            <h4>Status: {objectBooking && objectBooking.status}</h4>
          </div>
        </form>
      </div>
    );
  }
}
