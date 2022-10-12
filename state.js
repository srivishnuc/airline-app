const intialState = () => ({
    ancillaryServices: { 01: 'Lounge access', 02: 'Baggage', 03: 'Meals', 04: 'Wheel chair' },
    flight: [{
        id: "S0001",
        name: "",
        scheduledtime: {
            depature: "",
            arrival: ""
        },
        totalSeats: 100,
        class: {
            firstClass: 10,
            businessClass: 30,
            economyClass: 60
        },
        ancillaryServices: [01, 02, 03, 04]
    },
    {
        id: "S0002",
        name: "",
        scheduledtime: {
            depature: "",
            arrival: ""
        },
        totalSeats: 120,
        class: {
            firstClass: 15,
            businessClass: 10,
            economyClass: 65
        },
        ancillaryServices: [02, 03, 04]
    }
    ],
    passenger: [{
        id: "",
        name: "",
        flightId: "S0001",
        seatNo: "F1",
        withInfant: true,
        servicesRequested: ['Lounge access', 'Meals'],
        isCheckedIn: false,
        mealPreference: ""
    }, {
        id: "",
        name: "",
        flightId: "S0002",
        seatNo: "B1",
        withInfant: false,
        servicesRequested: ['Wheel chair', 'Meals'],
        isCheckedIn: false,
        mealPreference: ""
    }, {
        id: "",
        name: "",
        flightId: "S0002",
        seatNo: "E1",
        withInfant: false,
        servicesRequested: ['Meals'],
        isCheckedIn: false,
        mealPreference: ""
    }]
})

console.log(intialState())