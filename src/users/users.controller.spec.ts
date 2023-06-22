import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Types } from 'mongoose';

const user = {
	_id: '64ljkh523o54yuo3l3l',
	name: 'Jhon',
	last_name: 'Connors',
	email: 'jhon@judgementday.com', 
	wallet_balance: 100,
	bought_courses: [ 'Course1' ],
	created_courses: [ 'Course 2', 'Course 3' ],
	chat_notifications_sent: [],
	chat_notifications_recieved: [
		{
			requested_from_user: 2,
			requested_date: '2023-06-20 18:00'
		}
	],
	profile: 'user'
};

describe('UsersController', () => {
	let controller: UsersController;

	const mockUserService = {
		findOne: jest.fn().mockImplementation((_id: Types.ObjectId) => {
			return Promise.resolve(user);
		})
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ UsersController ],
			providers: [ 
				UsersService,
				{
					provide: getModelToken(User.name),
					useValue: {}
				}
			],

		})
			.overrideProvider(UsersService)
			.useValue(mockUserService)
			.compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('findOne() return a User object in a standard response object', async () => {
		expect(await controller.findOne(new mongoose.Schema.Types.ObjectId('2345k3k34j5h2g3'))).toMatchObject({
			_id: '64ljkh523o54yuo3l3l',
			name: 'Jhon',
			last_name: 'Connors',
			email: 'jhon@judgementday.com', 
			wallet_balance: 100,
			bought_courses: [ 'Course1' ],
			created_courses: [ 'Course 2', 'Course 3' ],
			chat_notifications_sent: [],
			chat_notifications_recieved: [
				{
					requested_from_user: 2,
					requested_date: '2023-06-20 18:00'
				}
			],
			profile: 'user'
		});
	});
});
