const intialState = () => ({
 flight: [
  {
   id: 'S0001',
   name: '',
   scheduledtime: {
    depature: '',
    arrival: ''
   },
   totalSeats: 100,
   class: {
    firstClass: 10,
    businessClass: 30,
    economyClass: 60
   }
  },
  {
   id: 'S0002',
   name: '',
   scheduledtime: {
    depature: '',
    arrival: ''
   },
   totalSeats: 120,
   class: {
    firstClass: 15,
    businessClass: 10,
    economyClass: 65
   }
  }
 ],
 passenger: [
  {
   id: '',
   name: '',
   flightId: 'S0001',
   seatNo: 'F1',
   withInfant: true,
   servicesRequested: ['Lounge access', 'Meals'],
   isCheckedIn: false,
   mealPreference: ''
  },
  {
   id: '',
   name: '',
   flightId: 'S0002',
   seatNo: 'B1',
   withInfant: false,
   servicesRequested: ['Wheel chair', 'Meals'],
   isCheckedIn: false,
   mealPreference: ''
  },
  {
   id: '',
   name: '',
   flightId: 'S0002',
   seatNo: 'E1',
   withInfant: false,
   servicesRequested: ['Meals'],
   isCheckedIn: false,
   mealPreference: ''
  }
 ]
});

console.log(intialState());
