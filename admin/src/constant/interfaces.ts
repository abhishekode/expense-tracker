export interface MongoResponse {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export enum UserRole {
  Passenger = 'passenger',
  Driver = 'driver',
  Admin = 'admin',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum ExpenseCategory {
	FOOD = 'food',
	TRANSPORT = 'transport',
	ENTERTAINMENT = 'entertainment',
	HEALTH = 'health',
	UTILITIES = 'utilities',
	HOUSING = 'housing',
	GROCERIES = 'groceries',
	INSURANCE = 'insurance',
	EDUCATION = 'education',
	SAVINGS = 'savings',
	INVESTMENTS = 'investments',
	TRAVEL = 'travel',
	GIFTS = 'gifts',
	DONATIONS = 'donations',
	SUBSCRIPTIONS = 'subscriptions',
	CLOTHING = 'clothing',
	PERSONAL_CARE = 'personal_care',
	RESTAURANTS = 'restaurants',
	PETS = 'pets',
	CHILDCARE = 'childcare',
	MISCELLANEOUS = 'miscellaneous',
	DEBT = 'debt',
	EMERGENCY = 'emergency',
	FUN = 'fun',
	INTERNET = 'internet',
	PHONE = 'phone',
	WATER = 'water',
	ELECTRICITY = 'electricity',
	GAS = 'gas',
	MAINTENANCE = 'maintenance',
	PROPERTY_TAX = 'property_tax',
	RENT = 'rent',
	MORTGAGE = 'mortgage',
	MEDICAL = 'medical',
	FITNESS = 'fitness',
	BEAUTY = 'beauty',
	ENTERTAINMENT_SUBSCRIPTIONS = 'entertainment_subscription',
	HOBBIES = 'hobbies',
	PROFESSIONAL_FEES = 'professional_fees',
	BUSINESS_EXPENSES = 'business_expenses',
	HOME_IMPROVEMENT = 'home_improvement',
	OFFICE_SUPPLIES = 'office_supplies',
	TAXES = 'taxes',
	LEGAL_FEES = 'legal_fees',
	CHARITY = 'charity',
	RETIREMENT = 'retirement',
	VACATION = 'vacation',
	FESTIVALS = 'festival',
}