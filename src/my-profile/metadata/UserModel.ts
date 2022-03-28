import {Model, Type} from 'onecore';

export const userModel: Model = {
  name: 'user',
  attributes: {
    userId: {
      type: Type.String,
      key: true
    },
    username: {
      type: Type.String,
      length: 255,
      required: true
    },
    firstName: {
      type: Type.String ,
      length: 255
    },
    lastName: {
      type: Type.String,
      length: 255
    },
    gender: {
      type: Type.String,
      length: 1
    },
    dateOfBirth: {
      type: Type.Date
    },
    email: {
      type: Type.String,
      length: 255
    },
    phone: {
      type: Type.String,
      length: 20
    },
    createdDate: {
      type: Type.Date,
      noupdate: true
    },
    modifiedDate: {
      type: Type.Date
    }
  }
};
