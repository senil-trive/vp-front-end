import { debounce } from "@mui/material";
import React from "react";
import ListIcon from "../../icons/ListIcon/ListIcon";
import Dropdown from "../Dropdown/Dropdown";

const defaultSortOptions = [
  { name: "Titel (a-z)", value: "title" },
  { name: "Titel (z-a)", value: "-title" },
  { name: "Autheur (oplopend)", value: "author" },
  { name: "Autheur (aflopend)", value: "-author" },
  { name: "Datum (oud-nieuw)", value: "date_created" },
  { name: "Datum (nieuw-oud)", value: "-date_created" },
];

type Props = {
  /** The time the field will wait before triggering the callback */
  waitTime?: number;

  /** The availabled options used to sort */
  sortOptions?: typeof defaultSortOptions;

  /** The callback that will be called when the user searches */
  onSort?: (x: string) => void;
};

export default function SortBar({
  sortOptions = defaultSortOptions,
  onSort,
  waitTime = 300,
}: Props) {
  const handleSort = (x: string) => {
    if (onSort) return onSort(x);
  };

  const debouncedSort = debounce(handleSort, waitTime);

  return (
    <Dropdown
      name="sort"
      placeholder="Sorteer op"
      onChange={debouncedSort}
      iconLeft={<ListIcon />}
      options={sortOptions}
    />
  );
}
