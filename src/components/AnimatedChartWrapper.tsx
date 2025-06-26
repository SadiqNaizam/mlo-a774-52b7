import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedChartWrapperProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

const AnimatedChartWrapper: React.FC<AnimatedChartWrapperProps> = ({
  children,
  className,
  duration = 0.6,
  delay = 0.2,
}) => {
  console.log('AnimatedChartWrapper loaded');

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('w-full h-full', className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedChartWrapper;