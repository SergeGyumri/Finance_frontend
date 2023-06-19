import React from 'react';

import PropTypes from 'prop-types';

function Balance({ income, spending, balance }) {
  return (
    <div className="balance__block">
      <div className="balance__block__top">
        <div className=" balance__block__left">
          <p className='total'>Total</p>
        </div>
        <div className="balance__block__right">
          <div className="balance__block__bottom">
            <p>Spending</p>
            <p>Income</p>
            <p className='balance_desc'>Balance</p>
          </div>
          <div className="balance__block__bottom">
            <p className={'balance__block__bottom_spending'}>{spending}</p>
            <p className={'balance__block__bottom_income'}>{income}</p>
            <p
              className={`balance_count ${income - spending >= 0 ? 'balance__block__bottom_income' : 'balance__block__bottom_spending'}`}>{balance}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

Balance.propTypes = {
  income: PropTypes.number,
  spending: PropTypes.number,
  balance: PropTypes.number,
};
Balance.defaultProps = {};
export default Balance;





