'use client';

import { useCurrenciesStore } from '@/hooks/useCurrenciesStore';
import React from 'react';
import { Button } from '@/components/ui/button';
import ListItem from './ListItem';
import { useTheme } from 'next-themes';

const List = () => {
  const { theme: nextTheme } = useTheme();
  const { data } = useCurrenciesStore();
  const [numberToShow, setNumberToShow] = React.useState(5);
  return (
    data.length > 0 && (
      <div
        className={`
      rounded-md
      p-3
      ${
        nextTheme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
      }
      `}
      >
        <h2 className="text-xl mb-2 font-bold">Currency List</h2>
        <div className="flex flex-col gap-2 mb-3">
          {data.slice(0, numberToShow).map(({ code, rate }) => (
            <ListItem key={code} code={code} rate={rate} />
          ))}
        </div>
        <div className="flex gap-2">
          {numberToShow < data.length && (
            <Button
              variant="outline"
              onClick={() => setNumberToShow(numberToShow + 5)}
              className={numberToShow > 5 ? 'w-1/2' : 'w-full'}
            >
              Show More
            </Button>
          )}
          {numberToShow > 5 && (
            <Button
              variant="outline"
              onClick={() => setNumberToShow(numberToShow - 5)}
              className="w-1/2"
            >
              Show Less
            </Button>
          )}
        </div>
      </div>
    )
  );
};

export default List;
