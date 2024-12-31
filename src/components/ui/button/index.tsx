"use client";
import * as React from "react";
import { Button as RadixButton } from "@radix-ui/themes";

interface ButtonProps extends React.ComponentProps<typeof RadixButton> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <RadixButton {...props}>{children}</RadixButton>;
};

export default Button;
