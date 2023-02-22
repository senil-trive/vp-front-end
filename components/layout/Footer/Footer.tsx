import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CompanyInfo } from "../../../types/componayInfoTypes";
import { getCompanyInfo } from "../../../utils/api";
import Logo from "../../icons/Logo/Logo";
import { H3, P } from "../../typography";

const StyledFooter = styled.footer`
  .footer-top {
    background-color: ${({ theme }) => theme.colors.black};
    padding: 44px 0;

    h3,
    p {
      color: ${({ theme }) => theme.colors.white};
    }
  }
  .footer-bottom {
    background: ${({ theme }) => theme.colors.white};
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
  const [isLoading, setIsLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    if (!companyInfo && isLoading) {
      (async () => {
        const data = await getCompanyInfo();
        if (data) {
          setCompanyInfo(data);
        }
        setIsLoading(false);
      })();
    }
  }, []);

  return (
    <StyledFooter>
      <div className="footer-top">
        <Container maxWidth="xl">
          <Grid container>
            <Grid item md={3}>
              <Logo variant="light" />
              <P style={{ textAlign: "center" }}>We komen voor in:</P>
            </Grid>
            <Grid item md={3}>
              <H3 variant="bold">Contact</H3>
              <P style={{ margin: 0 }}>{companyInfo?.company_name}</P>
              <P style={{ margin: 0 }}>{companyInfo?.company_address}</P>
              <P style={{ margin: 0 }}>
                {companyInfo?.company_zipcode} {companyInfo?.company_city}
              </P>
              <P style={{ margin: 0 }}>{companyInfo?.company_email}</P>
              <P style={{ margin: 0 }}>{companyInfo?.company_kvk}</P>
              <P style={{ margin: 0 }}>{companyInfo?.company_RSIN}</P>
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
            <Grid item md={3}>
              <H3 variant="bold">Socials</H3>
              {!!companyInfo?.instagram_url && (
                <P>
                  <a href={companyInfo.instagram_url}>Instagram</a>
                </P>
              )}
              {!!companyInfo?.twitter_url && (
                <P>
                  <a href={companyInfo.twitter_url}>Twitter</a>
                </P>
              )}
              {!!companyInfo?.linkedin_url && (
                <P>
                  <a href={companyInfo.linkedin_url}>Linkedin</a>
                </P>
              )}
              {!!companyInfo?.facebook_url && (
                <P>
                  <a href={companyInfo.facebook_url}>Facebook</a>
                </P>
              )}
              {!!companyInfo?.tiktok_url && (
                <P>
                  <a href={companyInfo.tiktok_url}>Tiktok</a>
                </P>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="footer-bottom">
        <Grid container>
          <Grid item md={4} />
          <Grid item md={3}>
            {!!companyInfo?.privacy_url && (
              <a href={companyInfo.privacy_url}>Privacyverklaring</a>
            )}
          </Grid>
          <Grid item md={3}>
            {!!companyInfo?.terms_condition_url && (
              <a href={companyInfo.terms_condition_url}>Terms & Conditions</a>
            )}
          </Grid>
          <Grid item md={2}>
            {!!companyInfo?.cookies_url && (
              <a href={companyInfo.cookies_url}>Cookies</a>
            )}
          </Grid>
        </Grid>
      </div>
    </StyledFooter>
  );
}
