import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { P } from "../../typography";
import SearchBar from "../SearchBar/SearchBar";

type Props = {
  quote: string;
  searchLabel?: string;
  onSearch: (x: string) => void;
};

const StyledWrapper = styled.div`
  padding: 15px 41px;
  background-color: ${({ theme }) => theme.colors.secondary};
  p {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default function CollectionSearchBar({
  quote = "Je bent sterk. Sterker dan je ooit had gedacht. Sterker dan de sterkste book. Oneindig is jouw kracht.",
  searchLabel = "Doorzoek het forum",
  onSearch,
}: Props) {
  return (
    <StyledWrapper>
      <Grid container className="flex items-center justify-between flex-wrap">
        <Grid item xs={12} md={8}>
          <P variant="italic" style={{ fontWeight: 300 }}>
            <q>{quote}</q>
          </P>
        </Grid>
        <Grid item xs={12} md={4} className="flex justify-end">
          <P variant="light" style={{ marginRight: 32 }}>
            {searchLabel}
          </P>
          <SearchBar onSearch={onSearch} />
        </Grid>
      </Grid>
    </StyledWrapper>
  );
}
