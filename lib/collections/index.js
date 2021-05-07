import {
    Mongo
} from 'meteor/mongo';
export const Messages = new Mongo.Collection('Messages');
export const Users = new Mongo.Collection('Users');