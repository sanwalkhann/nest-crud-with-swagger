/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/Schemas/user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private UserModel: mongoose.Model<User>,
    ) {}

    async findAll(): Promise<User[]> {
        try {
            const users = await this.UserModel.find();
            return users;
        } catch (error) {
            throw new HttpException('Error fetching users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const existingUser = await this.UserModel.findOne({
                email: user.email,
            });

            if (existingUser) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }

            const createdUser = await this.UserModel.create(user);
            const plainUser = createdUser.toObject();
            return plainUser;
        } catch (error) {
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findById(id: string): Promise<User> {
        try {
            const user = await this.UserModel.findById(id);
            if (!user) {
                throw new NotFoundException('User Not Found');
            }
            return user;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new HttpException('Invalid User ID format', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Error fetching user by ID', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateById(id: string, user: User): Promise<User> {
        try {
            return await this.UserModel.findByIdAndUpdate(id, user, {
                new: true,
                runValidators: true,
            });
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Error updating user by ID', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteById(id: string): Promise<User> {
        try {
            return await this.UserModel.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('Error deleting user by ID', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
