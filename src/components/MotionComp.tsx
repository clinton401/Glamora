"use client";
import React from "react";
import { motion, MotionProps } from "framer-motion";

type HTMLTag = keyof JSX.IntrinsicElements;

// Exclude conflicting properties from MotionProps
type MotionCompatibleHTMLProps<T extends HTMLElement> = Omit<
  React.HTMLAttributes<T>,
  keyof MotionProps
> &
  MotionProps;

interface MyComponentProps extends MotionCompatibleHTMLProps<HTMLElement> {
  as?: HTMLTag;
  children: React.ReactNode;
}

const MotionComp: React.FC<MyComponentProps> = ({
  as: Tag = "div",
  children,
  className,
  ...props
}) => {
  const MotionTag = motion[Tag as keyof typeof motion] as React.ElementType;

  return (
    <MotionTag className={className} {...props}>
      {children}
    </MotionTag>
  );
};

export default MotionComp;
