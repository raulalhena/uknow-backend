import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { ObjectId } from 'mongoose';
import { ArrayMaxSize, IsArray, IsNotEmpty } from 'class-validator';

export class UpdateCourseDto {

	@ApiProperty({ example: 'The best course of web development' })
	@IsNotEmpty()
		name: string;

	@ApiProperty({ example: 'Web development' })
	@IsNotEmpty()
		topic: string;

	@ApiProperty({ example: 'Hard' })
	@IsNotEmpty()
		difficulty: string;

	@ApiProperty({ example: [ '#dev', '#frontend', '#web' ] })
	@IsArray()
	@ArrayMaxSize(3)
		tags: [string, string, string];

	@ApiProperty({ example: '### New course name' })
	@IsNotEmpty()
		content: string;
	
}