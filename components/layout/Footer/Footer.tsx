import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Logo from "../../icons/Logo/Logo";
import { H3, P } from "../../typography";

const StyledFooter = styled.footer`
  .footer-top {
    background-color: #555555;
    padding: 44px 0;

    h3,
    p {
      color: white;
    }
  }
  .footer-bottom {
    background: #ededed;
    padding: 17px 0;

    a {
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
      text-decoration-line: underline;
      color: #000000;
    }
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <div className="footer-top">
        <Grid>
          <Grid item md={4}>
            <Logo variant="light" />
            <P style={{ textAlign: "center" }}>We komen voor in:</P>
          </Grid>
          <Grid item md={3}>
            <H3 variant="bold">Contact</H3>
            <P>
              Stichting Villa Pinedo Gerrit van der Veenstraat 106 HS 1077 EM
              Amsterdam info@villapinedo.nl KVK: 52149935 RSIN: 850319225
            </P>
          </Grid>
          <Grid item md={3}>
            <H3 variant="bold">Voor Volwassenen</H3>
            <P>
              <a href="#terms">Over Villa Pinedo</a>
            </P>
            <P>
              <a href="#terms">Over Villa Pinedo</a>
            </P>
            <P>
              <a href="#terms">Over Villa Pinedo</a>
            </P>
            <P>
              <a href="#terms">Over Villa Pinedo</a>
            </P>
          </Grid>
          <Grid item md={2}>
            <H3 variant="bold">Socials</H3>
            <P>
              <a href="#terms">Over Villa Pinedo</a>
            </P>
            <P>
              <a href="#terms">Over Villa Pinedo</a>
            </P>
            <P>
              <a href="#terms">Over Villa Pinedo</a>
            </P>
            <P>
              <a href="#terms">Over Villa Pinedo</a>
            </P>
          </Grid>
        </Grid>
      </div>
      <div className="footer-bottom">
        <Grid>
          <Grid item md={4} />
          <Grid item md={3}>
            <a href="#privacy">Privacyverklaring</a>
          </Grid>
          <Grid item md={3}>
            <a href="#terms">Terms & Conditions</a>
          </Grid>
          <Grid item md={2}>
            <a href="#cookies">Cookies</a>
          </Grid>
        </Grid>
      </div>
    </StyledFooter>
  );
}
