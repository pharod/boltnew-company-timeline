import React from 'react';

type SalaryInfo = {
  amount?: number;
  oldAmount?: number;
  newAmount?: number;
};

type SalaryEventProps = {
  salaryInfo: SalaryInfo;
};

const SalaryEvent: React.FC<SalaryEventProps> = ({ salaryInfo }) => {
  if (salaryInfo.oldAmount && salaryInfo.newAmount) {
    return (
      <div className="mt-2 text-sm text-gray-600">
        <div className="flex gap-2">
          <span className="line-through">${salaryInfo.oldAmount.toLocaleString()}</span>
          <span className="text-green-600">${salaryInfo.newAmount.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  if (salaryInfo.amount) {
    return (
      <div className="mt-2 text-sm text-gray-600">
        <span>${salaryInfo.amount.toLocaleString()}</span>
      </div>
    );
  }

  return null;
};

export default SalaryEvent;