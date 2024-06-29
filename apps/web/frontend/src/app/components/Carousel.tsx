'use client';
import React from 'react';
import { useEffect, useRef, useState, useMemo } from 'react';
import { generateRandomCards } from '../mock/generateRandomCards';
import { CardData } from '../core/types';
import Card from './card';
import { motion, useMotionValue } from 'framer-motion';
import 'react-multi-carousel/lib/styles.css';

export const Carousel = ({ title }: { title: string }) => {
  
  const length = 20;
  const scrollBy = 70;
  const dragLimit = 50;
  // Memoize the roomsData to avoid recalculation on each render
  const roomsData: CardData[] = useMemo(
    () => generateRandomCards(length),
    [length],
  );
  
  const ref = useRef(null);
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const [dragged, setDragged] = useState<boolean>(false);
  const [currentDivIndex, setCurrentDivIndex] = useState<number>(0);
  const dragX = useMotionValue(0);

  const scroll = () => {
    if (Math.abs(dragX.get()) > dragLimit) {
      console.log('drag force =' + dragX.get());
      if (dragX.get() > 0 && currentDivIndex >= 1) {
        // left
        console.log('go left');
        setScrollIndex(scrollIndex + scrollBy);
        setCurrentDivIndex(currentDivIndex - 4);
      } else if (dragX.get() < 0 && currentDivIndex < roomsData.length - 4) {
        // if (currentDivIndex >= roomsData.length - 4) return;
        // right
        console.log('go right');
        setScrollIndex(scrollIndex - scrollBy);
        setCurrentDivIndex(currentDivIndex + 4);
      }
    }
  };

  const onDragStart = () => {
    setDragged(true);
  };
  const onDragEnd = () => {
    setDragged(false);
  };

  useEffect(() => {
    scroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragged]);

  return (
    <div className="flex flex-col items-center mx-auto w-full h-full overflow-hidden p-4 container">
      <p className="text-white text-2xl font-bold w-full p-8">{title}</p>
      <motion.div
        ref={ref}
        drag="x"
        style={{
          x: dragX,
          // translateX: `${scrollIndex}%`,
        }}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        transition={{ duration: 1 }}
        animate={{ translateX: `${scrollIndex}%` }}
        className="grid grid-rows-2 grid-flow-col gap-2 h-96 cursor-grab active:cursor-grabbing w-full "
      >
        {roomsData.map((data, index) => (
          <div id={index.toString()} key={index} className="w-[400px]">
            <Card
              // index={index}
              img={data.img}
              category={data.category}
              title={data.title}
              subTitle={data.subTitle}
              noActive={data.noActive}
              noResources={data.noResources}
              noMessages={data.noMessages}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
