import { EventDetails } from './types';
import { profileImage, companyLogo } from './assets/images';

export const EVENT_DETAILS: EventDetails = {
  honoree: "Mr. Vishnu Aggarwal",
  profileImage: profileImage,
  company: "Oriental Insurance Company, Head Office",
  companyLogo: companyLogo,
  date: "Friday, 3rd January",
  time: "11:30 AM onwards",
  venue: "Green Lounge",
  venueAddress: "Wazirpur, Delhi",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Green+Lounge+Wazirpur+Delhi",
  rsvpName: "Aakash & Himani Aggarwal",
  contactNumber: "8010228010"
};

// Helper to determine the specific Date object for the countdown
export const getEventDate = (): Date => {
  const now = new Date();
  const currentYear = now.getFullYear();
  // Month is 0-indexed (0 = January). Target: Jan 3rd, 11:30:00
  let target = new Date(currentYear, 0, 3, 11, 30, 0);
  
  // If Jan 3rd has passed this year, assume next year
  if (now > target) {
    target.setFullYear(currentYear + 1);
  }
  return target;
};