import { debounce } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { ColorType } from "../../../types/colorTypes";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import Input from "../Input/Input";

type Props = {
  iconColor?: ColorType;

  /** The placeholder of the input field */
  placeholder?: string;

  /** The time the field will wait before triggering the callback */
  waitTime?: number;

  /** The callback that will be called when the user searches */
  onSearch?: (x: string) => void;
};

export default function SearchBar({
  iconColor = "primary",
  placeholder = "Zoeken...",
  onSearch,
  waitTime = 300,
}: Props) {
  const { colors } = useTheme();
  const router = useRouter();
  const [val, setVal] = useState("");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (x) => {
    if (onSearch) return onSearch(x.target.value);
    return router.push(`/zoeken?q=${x.target.value}`);
  };

  const debouncedSearch = debounce(handleSearch, waitTime);

  useEffect(() => {
    if (router.pathname === "/zoeken" && router.query.q) {
      setVal(router.query.q as string);
    }
  }, [router.query, router.pathname]);

  return (
    <Input
      iconLeft={<SearchIcon color={colors[iconColor]} />}
      placeholder={placeholder}
      defaultValue={val}
      onChange={debouncedSearch}
      borderColor="grey"
    />
  );
}
