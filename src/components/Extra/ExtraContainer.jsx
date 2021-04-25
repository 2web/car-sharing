import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStepValidator from '../../hooks/useStepValidator';
import {
  selectOrderCarColors,
  selectOrder,
} from '../../store/selectors/orderSelectors';
import {
  setOrderColor,
  setOrderDateFrom,
  setOrderDateTo,
  setOrderRate,
  setOrderService,
} from '../../store/reducers/orderReducer';

import fetchRate from '../../store/thunks/rateThunks';
import { selectRate } from '../../store/selectors/rateSelectors';

import fetchRateType from '../../store/thunks/rateTypeThunks';
import { selectRateType } from '../../store/selectors/rateTypeSelectors';
import Extra from './Extra';

function ExtraContainer() {
  const dispatch = useDispatch();
  const orderRedux = useSelector(selectOrder);
  const rateRedux = useSelector(selectRate);
  const rateTypeRedux = useSelector(selectRateType);

  const orderCarColors = useSelector(selectOrderCarColors);

  const { checkLastStepValidate } = useStepValidator();

  const handleFilterStartPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleFilterEndPassedTime = (time) => {
    const selectedDate = new Date(time);
    return orderRedux.dateFrom < selectedDate.getTime();
  };

  const handleColorChange = (color) => {
    if (color.name) {
      dispatch(setOrderColor(color.name));
    } else {
      dispatch(setOrderColor(color));
    }
  };

  const handleChangeDateFrom = (date) => {
    const currentDate = new Date().getTime();

    if (!date) {
      dispatch(setOrderDateFrom(null));
      return;
    }

    if (date) {
      if (currentDate > date.getTime()) {
        dispatch(setOrderDateFrom(currentDate));
      } else {
        dispatch(setOrderDateFrom(date.getTime()));
      }
    }
    if ((date.getTime() || currentDate) >= orderRedux?.dateTo) {
      dispatch(setOrderDateTo(null));
    }
  };

  const handleChangeDateTo = (date) => {
    if (!date) {
      dispatch(setOrderDateTo(null));
      return;
    }

    if (date) {
      if (orderRedux?.dateFrom > date.getTime()) {
        dispatch(setOrderDateTo(orderRedux?.dateFrom));
      } else {
        dispatch(setOrderDateTo(date.getTime()));
      }
    }
  };

  const handleChangeServices = (services) => {
    dispatch(setOrderService(services));
  };

  const handleSelectRate = (rate) => {
    dispatch(setOrderRate(rate));
  };

  useEffect(() => {
    dispatch(fetchRate());
    dispatch(fetchRateType());
  }, []);

  useEffect(() => {
    checkLastStepValidate();

    // TODO Сделать калькулятор цены

    // const date1 = new Date(orderRedux.dateFrom);
    // const date2 = new Date(orderRedux.dateTo);
    // const diff = date2 - date1;
    // const milliseconds = diff;

    // const seconds = milliseconds / 1000;

    // const minutes = seconds / 60;

    // const hours = minutes / 60;

    // const days = hours / 24;

    // console.log('date1 :>> ', date1);
    // console.log('date2 :>> ', date2);
    // console.log('date2 - date1 :>> ', `${days}д ${Math.ceil(hours % 24)}ч`);
  }, [orderRedux.dateFrom, orderRedux.dateTo]);

  return (
    <Extra
      orderRedux={orderRedux}
      rateRedux={rateRedux}
      rateTypeRedux={rateTypeRedux}
      orderCarColors={orderCarColors}
      onColorChange={handleColorChange}
      onFilterStartPassedTime={handleFilterStartPassedTime}
      onFilterEndPassedTime={handleFilterEndPassedTime}
      onChangeDateFrom={handleChangeDateFrom}
      onChangeDateTo={handleChangeDateTo}
      onSelectRate={handleSelectRate}
      onChangeServices={handleChangeServices}
    />
  );
}

export default ExtraContainer;
