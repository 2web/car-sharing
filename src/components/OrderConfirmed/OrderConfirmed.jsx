/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import nocar from '../../images/nocar.png';

import style from './order-confirmed.module.scss';

function OrderConfirmed({ order }) {
  const [isImgError, setIsImgError] = useState(false);

  const hangleOnLoadImgError = (event) => {
    setIsImgError(true);
  };

  return (
    <div className={style.content}>
      <div className={style.about}>
        <div className={style.title}>Ваш заказ подвержден</div>
        <div className={style.carName}>{order.carId.name}</div>
        <div className={style.carNumber}>{order.carId.number}</div>
        {order.isFullTank && (
          <div className={style.fuel}>
            <span>Топливо</span> 100%
          </div>
        )}
        <div className={style.available}>
          <span>Доступна с</span> {new Date(order.dateFrom).toLocaleString()}
        </div>
      </div>
      <div className={style.carImage}>
        <img
          loading="lazy"
          src={
            isImgError
              ? nocar
              : `https://api-factory.simbirsoft1.com${order.carId.thumbnail?.path}`
          }
          alt={order.carId.name}
          onError={(event) => hangleOnLoadImgError(event)}
        />
      </div>
    </div>
  );
}

export default OrderConfirmed;
