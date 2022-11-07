export const EHeaderOptions = {
    PLACES_TO_STAY :'placesToStay',
    FIND_EXPERIENCES : 'findExperiences',
}

export const EAppLogo = {
    LOGO : 'logo',
    TEXT : 'text',
}

export const DATA_ACTION_TYPES  =  {
    SET_LOCATION : 'SET_LOCATION',
    SET_CHECK_IN : 'SET_CHECK_IN',
    SET_CHECK_OUT : 'SET_CHECK_OUT',
    SET_GUESTS : 'SET_GUESTS',
    RESET_DATES : 'RESET_DATES',
    RESET_GUESTS : 'RESET_GUESTS',
    INCREASE_ADULTS : 'INCREASE_ADULTS',
    INCREASE_CHILDREN : 'INCREASE_CHILDREN',
    INCREASE_INFANTS : 'INCREASE_INFANTS',
    DECREASE_ADULTS : 'DECREASE_ADULTS',
    DECREASE_CHILDREN : 'DECREASE_CHILDREN',
    DECREASE_INFANTS : 'DECREASE_INFANTS',
}

export const initialState = {
    location: '',
    checkIn: null,
    checkOut: null,
    guests: { adults: 0, children: 0, infants: 0 },
};