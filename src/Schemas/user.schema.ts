/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';

@Schema({
    timestamps: true,
})
export class User {
    @Prop()
    @ApiProperty({ description: 'First name of the user', example: 'John' })
    firstname: string;

    @Prop()
    @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
    lastname: string;

    @Prop({ unique: [true, 'Email already exists'] })
    @ApiProperty({ description: 'Email of the user', example: 'john.doe@example.com' })
    email: string;
}

export const UserShema = SchemaFactory.createForClass(User);
