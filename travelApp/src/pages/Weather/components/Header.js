import React from 'react';
import Search from './Search';

export default function Header({ searchCity }) {
  return (
    <div className="bg">
      <h1 className="pt-6 -mt-4 text-2xl font-bold text-center">
        {' '}
        DỰ BÁO THỜI TIẾT{' '}
      </h1>
      <Search searchCity={searchCity} />{' '}
    </div>
  );
}
