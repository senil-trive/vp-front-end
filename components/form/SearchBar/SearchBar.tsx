import { debounce } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import Input from "../Input/Input";

type Props = {
  /** The time the field will wait before triggering the callback */
  waitTime?: number;

  /** The callback that will be called when the user searches */
  onSearch?: (x: string) => void;
};

export default function SearchBar({ onSearch, waitTime = 300 }: Props) {
  const router = useRouter();
  const [val, setVal] = useState("");

  const handleSearch = (x: string) => {
    if (onSearch) return onSearch(x);
    return router.push(`/search?q=${x}`);
  };

  const debouncedSearch = debounce(handleSearch, waitTime);

  useEffect(() => {
    if (router.pathname === "/search" && router.query.q) {
      setVal(router.query.q as string);
      console.log(router.pathname, router.query.q);
    }
  }, [router.query, router.pathname]);

  return (
    <Input
      iconLeft={<SearchIcon />}
      placeholder="Zoeken..."
      defaultValue={val}
      onChange={debouncedSearch}
    />
  );
}
