import { Model, Type } from 'onecore';

export const bookingModel: Model = {
  name: 'booking',
  source: 'booking',
  attributes: {
    bookingId: {
      type: Type.ObjectId,
      field: '_id',
      key: true
    },
    userId: {
      type: Type.String
    },
    bookableId: {
      type: Type.ObjectId
    },
    subject: {
      type: Type.String
    },
    description: {
      type: Type.String
    },
    startBookingTime: {
      type: Type.Date
    },
    endBookingTime: {
      type: Type.Date
    },
    status: {
      type: Type.String
    }
  }
};
