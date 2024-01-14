import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Box = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center ">
      <button
        className="bg-blue-300 rounded-lg px-10 py-2 -translate-y-32 fixed"
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        Show/Hide
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="w-32 h-32 bg-black fixed" // Apply fixed positioning to the animated div
            initial={{ rotate: '0deg', scale: 1 ,x:-100}}
            animate={{ rotate: '180deg', scale: 1 ,x:100}}
            transition={{ duration: 1, ease: 'backInOut', }}
            exit={{ rotate: '0deg', scale: 1 ,x:0}}
          >
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Box;
