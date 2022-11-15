import { Card,Typography,CardContent,CardActions,Button } from "@mui/material";
import React, {  useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
// components
import AppSearchOptionButton from './AppSearchOptionButton';
import AppDateRange from './AppDateRange';
import AppCounter from './AppCounter';
import AppSearchOptionWrapper from './AppSearchOptionWrapper';
// data
import { useDataContext } from '../utils/useDataContext';
import { DATA_ACTION_TYPES } from '../utils/Enums';
// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// icons
import { ChevronRightIcon } from '@heroicons/react/outline';
// typings
import { EHeaderOptions } from '../utils/Enums';
// utils
import { formatCheckDate, formatRangeDate } from '../utils/dateUtils';
import { formatGuests } from '../utils/guestUtils';
import Axios from "axios";

const  ESearchMenu =  {
    LOCATION : 'location',
    CHECK_IN : 'checkIn',
    CHECK_OUT : 'checkOut',
    GUESTS : 'guests',
}

export default function BookingCard({property_id}){
    const [searchMenu, setSearchMenu] = useState(null);
  // data
  const [{ location, checkIn, checkOut, guests }, dispatch] = useDataContext() ;
  // handler
  const handleOnBlur = (event) => {
    const { relatedTarget } = event || {};
    if (!relatedTarget) {
      setSearchMenu(null);
      return;
    }
    const relatedTargetClassList = Array.from((relatedTarget)?.classList);
    const result = relatedTargetClassList.some((className) => {
      const prefix = ['rdr', 'btn'];
      if (prefix.includes(className.slice(0, 3))) return true;
    });
    if (!result) setSearchMenu(null);
  };

  const resetDate = () => {
    dispatch({
      type: DATA_ACTION_TYPES.RESET_DATES,
    });
    handleOnBlur();
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:3003/getBookedDates", {
        property_id: property_id,
    })
    .then((response) => {
        response.data.forEach((dateString) => {
            setDisabledDates(prev => {
                return [...prev, new Date(dateString)]
            })
        })
    })
  },[])

  console.log(disabledDates);

  const dateRangeStyle ='left-4 right-4 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px]';
    return (
        <>
            <Card variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Booking
                </Typography>
                <form onSubmit={handleOnSubmit}>
                    {/* Check in */}
                    <AppSearchOptionButton
                    separator
                    title="Check in"
                    placeholder="Add dates"
                    active={searchMenu === ESearchMenu.CHECK_IN}
                    value={formatCheckDate(checkIn)}
                    onFocus={() => setSearchMenu(ESearchMenu.CHECK_IN)}
                    onBlur={handleOnBlur}
                    onClear={resetDate}
                    >
                    {/* date picker */}
                        <AppSearchOptionWrapper className={dateRangeStyle}>
                            {searchMenu === ESearchMenu.CHECK_IN && <AppDateRange disabledDates={disabledDates}/>}
                        </AppSearchOptionWrapper>
                    </AppSearchOptionButton>
                    {/* check out */}
                    <AppSearchOptionButton
                    separator
                    title="Check out"
                    placeholder="Add dates"
                    active={searchMenu === ESearchMenu.CHECK_OUT}
                    value={formatCheckDate(checkOut)}
                    onFocus={() => setSearchMenu(ESearchMenu.CHECK_OUT)}
                    onBlur={handleOnBlur}
                    onClear={resetDate}
                    >
                    {/* date picker */}
                    <AppSearchOptionWrapper className={dateRangeStyle}>
                        {searchMenu === ESearchMenu.CHECK_OUT && <AppDateRange disabledDates={disabledDates}/>}
                    </AppSearchOptionWrapper>
                    </AppSearchOptionButton>
                    {/* Guests */}
                    <AppSearchOptionButton
                    title="Guests"
                    placeholder="Add guests"
                    active={searchMenu === ESearchMenu.GUESTS}
                    value={formatGuests(guests)}
                    onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                    onBlur={handleOnBlur}
                    onClear={() => {
                        dispatch({ type: DATA_ACTION_TYPES.RESET_GUESTS });
                        handleOnBlur();
                    }}
                    isSearch={!!searchMenu}
                    onSearch={() => setSearchMenu(ESearchMenu.LOCATION)}
                    >
                    <AppSearchOptionWrapper className="md:py-4 rounded-3xl">
                        <div>
                        <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                            <div className="flex-grow">
                            <h2 className="font-medium">Adults</h2>
                            <p className="text-sm leading-4 text-gray-300">
                                Ages 13 or above
                            </p>
                            </div>
                            <AppCounter
                            value={guests.adults}
                            maxValue={16}
                            onIncrease={() =>
                                dispatch({ type: DATA_ACTION_TYPES.INCREASE_ADULTS })
                            }
                            onDescrease={() =>
                                dispatch({ type: DATA_ACTION_TYPES.DECREASE_ADULTS })
                            }
                            />
                        </div>
                        </div>
                        <div>
                        <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                            <div className="flex-grow">
                            <h2 className="font-medium">Children</h2>
                            <p className="text-sm leading-4 text-gray-300">Ages 2-12</p>
                            </div>
                            <AppCounter
                            value={guests.children}
                            maxValue={5}
                            onIncrease={() =>
                                dispatch({ type: DATA_ACTION_TYPES.INCREASE_CHILDREN })
                            }
                            onDescrease={() =>
                                dispatch({ type: DATA_ACTION_TYPES.DECREASE_CHILDREN })
                            }
                            />
                        </div>
                        </div>
                        <div>
                        <div className="flex py-4">
                            <div className="flex-grow">
                            <h2 className="font-medium">Infants</h2>
                            <p className="text-sm leading-4 text-gray-300">Under 2</p>
                            </div>
                            <AppCounter
                            value={guests.infants}
                            maxValue={5}
                            onIncrease={() =>
                                dispatch({ type: DATA_ACTION_TYPES.INCREASE_INFANTS })
                            }
                            onDescrease={() =>
                                dispatch({ type: DATA_ACTION_TYPES.DECREASE_INFANTS })
                            }
                            />
                        </div>
                        </div>
                    </AppSearchOptionWrapper>
                    </AppSearchOptionButton>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </CardContent>
            </Card>
        </>
    )
}