/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true,
})

export class User {
    @Prop()
    firstname: string;
    @Prop()
    lastname: string;
    @Prop({ unique: [true, 'Email already exist'] })
    email: string
}


export const UserShema = SchemaFactory.createForClass(User)


