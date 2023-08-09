import { Schema, Document, model, ObjectId } from 'mongoose';
import { IProduct } from './product';

export interface IUser {
  email: string;
  emailVerified?: boolean;
  password?: string;
  emailToken?: string; // Randomized token used to verify email on register
  admin?: boolean;
  approved?: boolean;
  company?: string;
  phoneNumber?: string;
  favorites?: [ObjectId];
}

// Interface to hold normal properties as well as document properties ie _id, timestamps
export interface IUserDocument extends IUser, Document {}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: true, default: false },
    password: { type: String, required: false },
    emailToken: { type: String, required: false },
    admin: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    company: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true },
);

/* 
Example of a virtual method and how it can be applied
userSchema
  .virtual('fullName')
  .get((user: IUser) => `${user.firstName} ${user.lastName}`);

*/

export default model<IUser>('User', userSchema);
