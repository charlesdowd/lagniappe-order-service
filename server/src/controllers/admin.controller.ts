import { Request, Response } from 'express';
import AdminService from '../services/admin';
import MessageResponse from '../interfaces/MessageResponse';
import { IOrder, IProduct, IUser } from '../models';
import NotificationService from '../services/notifications';
import { BaseError } from '../interfaces/Errors';

/**
 * @desc Approve a users account
 * @route POST /approve-account
 * @access Admin only
 */
async function approveAccount(req: Request, res: Response<MessageResponse>) {
  const { userId } = req.body;

  // Approve account and grab the user to pass to email service
  const user: IUser | null = await AdminService.approveAccount(userId);

  if (!user) throw new BaseError('Account not found or failed to be updated');

  await NotificationService.sendAccountApprovedEmail(user.email);

  return res.status(201).send({ message: 'User successfully approved' });
}

async function getAllOrders(req: Request, res: Response<{ orders: IOrder[] }>) {
  const orders = await AdminService.getAllOrders();
  return res.status(200).json({ orders });
}

/**
 * @desc Create a new product
 * @route POST /product
 * @access Admin only
 *
 * Req.body should be of type IProduct
 */
async function createProduct(
  req: Request<IProduct>,
  res: Response<MessageResponse>,
) {
  await AdminService.createProduct({ ...req.body });

  return res.status(201).send({ message: 'Product successfully created' });
}

/**
 *
 * @param req
 * @param res
 * @returns { IUser[] } all users
 */
async function getAllUsers(req: Request, res: Response<{ users: IUser[] }>) {
  const users = await AdminService.getAllUsers();

  return res.status(200).json({ users });
}

export default {
  approveAccount,
  createProduct,
  getAllOrders,
  getAllUsers,
};
