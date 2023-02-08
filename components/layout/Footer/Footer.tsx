import React from "react";
import styled from "styled-components";
import Grid from "../../grid/Grid";
import GridItem from "../../grid/GridItem";
import Logo from "../../icons/Logo/Logo";
import { H3, P } from "../../typography/Typography";

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
          <GridItem size={4}>
            <Logo variant="light" />
            <P style={{ textAlign: "center" }}>We komen voor in:</P>
          </GridItem>
          <GridItem size={3}>
            <H3 variant="bold">Contact</H3>
            <P>
              Stichting Villa Pinedo Gerrit van der Veenstraat 106 HS 1077 EM
              Amsterdam info@villapinedo.nl KVK: 52149935 RSIN: 850319225
            </P>
          </GridItem>
          <GridItem size={3}>
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
          </GridItem>
          <GridItem size={2}>
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
          </GridItem>
        </Grid>
      </div>
      <div className="footer-bottom">
        <Grid>
          <GridItem size={4} />
          <GridItem size={3}>
            <a href="#privacy">Privacyverklaring</a>
          </GridItem>
          <GridItem size={3}>
            <a href="#terms">Terms & Conditions</a>
          </GridItem>
          <GridItem size={2}>
            <a href="#cookies">Cookies</a>
          </GridItem>
        </Grid>
      </div>
    </StyledFooter>
  );
}
