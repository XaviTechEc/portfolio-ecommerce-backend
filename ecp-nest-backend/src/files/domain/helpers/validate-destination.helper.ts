import { validDestinations } from '../constants/valid-destinations.constant';
import { ValidFileDestination } from '../interfaces/valid-file-destination.type';

export const validateDestination = (value: ValidFileDestination) => {
  if (!validDestinations.includes(value)) {
    return { isValid: false, value: undefined };
  }

  return { isValid: true, value };
};
