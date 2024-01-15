import { useState } from "react";

const useTransform=()=>{

  const [open,onOpen] =useState(false)

  return {
    open,
    onOpen
  }
}

export  default  useTransform