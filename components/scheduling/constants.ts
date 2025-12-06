export type TimeSlot = {
  time: string;
  isAvailable: boolean;
};

export type ProviderAvailability = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  day: string;
  avatar: string;
  slots: TimeSlot[];
};

export const providerAvailabilities: ProviderAvailability[] = [
  {
    id: "green",
    name: "Dr. John Green",
    specialty: "Family Medicine",
    location: "Building A, Room 204",
    day: "Friday, April 18",
    avatar: "/assets/images/dr-green.png",
    slots: [
      { time: "08:00 AM", isAvailable: true },
      { time: "08:30 AM", isAvailable: true },
      { time: "09:00 AM", isAvailable: false },
      { time: "09:30 AM", isAvailable: true },
      { time: "10:00 AM", isAvailable: true },
      { time: "10:30 AM", isAvailable: false },
    ],
  },
  {
    id: "cruz",
    name: "Dr. Alyana Cruz",
    specialty: "Dermatology",
    location: "Building C, Room 118",
    day: "Friday, April 18",
    avatar: "/assets/images/dr-cruz.png",
    slots: [
      { time: "11:00 AM", isAvailable: true },
      { time: "11:30 AM", isAvailable: true },
      { time: "12:00 PM", isAvailable: true },
      { time: "12:30 PM", isAvailable: false },
      { time: "01:00 PM", isAvailable: true },
      { time: "01:30 PM", isAvailable: true },
    ],
  },
  {
    id: "lee",
    name: "Dr. Jasmine Lee",
    specialty: "Pediatrics",
    location: "Building B, Room 310",
    day: "Saturday, April 19",
    avatar: "/assets/images/dr-lee.png",
    slots: [
      { time: "09:00 AM", isAvailable: true },
      { time: "09:30 AM", isAvailable: true },
      { time: "10:00 AM", isAvailable: true },
      { time: "10:30 AM", isAvailable: true },
      { time: "11:00 AM", isAvailable: false },
      { time: "11:30 AM", isAvailable: true },
    ],
  },
];
