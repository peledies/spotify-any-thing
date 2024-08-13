import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeMenu, setCurrentPage } from '../store/slices/navigation';
import { useWheel, WheelDirection } from '../utils/ButtonHelper';
import { pages } from '../utils/Constants';
import { titleCase } from '../utils/Functions';

export default function Menu() {
  const [hovered, setHovered] = useState<number | null>(null);
  const showMenu = useAppSelector((state) => state.navigation.showMenu);
  const dispatch = useAppDispatch();

  useWheel((direction) => {
    console.log(direction);
    if (hovered === null) {
      setHovered(0);
    } else if (direction === WheelDirection.Right) {
      setHovered(hovered - 1);
    } else {
      setHovered(hovered + 1);
    }
  });

  const clickHandler: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const newPage = event.currentTarget.textContent?.toLowerCase();
    if (!newPage) return;
    const index = pages.indexOf(newPage);
    dispatch(setCurrentPage(index));
    dispatch(closeMenu());
  };

  return (
    <div className={`grid grid-cols-1 grid-rows-2 ${!showMenu && 'hidden'}`}>
      {pages.map((page, index) => {
        return (
          <div
            key={index}
            className={`p-4 ${hovered !== null && pages[hovered] === page ? 'bg-slate-700' : ''}`}
            onClick={clickHandler}
          >
            {titleCase(page)}
          </div>
        );
      })}
    </div>
  );
}
