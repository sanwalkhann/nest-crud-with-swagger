/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  readonly firstname: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  readonly lastname: string;

  @ApiProperty({ description: 'Email of the user', example: 'john.doe@example.com' })
  readonly email: string;
}