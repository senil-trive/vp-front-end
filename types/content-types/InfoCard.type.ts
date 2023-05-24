import React from "react";
import { Variant } from "../../components/card/Card";

type InfoCard = {
  title: string;
  icon: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
};

export type InfoCardType = InfoCard & Variant;
