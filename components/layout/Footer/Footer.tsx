import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { CompanyInfo } from "../../../types/componayInfoTypes";
import { getCompanyInfo } from "../../../utils/api";
import parseImageURL from "../../../utils/parseImageURL";
import { isInternalLink } from "../../../utils/url";
import { H3, P } from "../../typography";

const StyledFooter = styled.footer`
  .footer-top {
    background-color: ${({ theme }) => theme.colors.black.normal};
    padding: 44px 0;

    h3,
    p {
      color: ${({ theme }) => theme.colors.white.normal};
    }
  }
  .footer-bottom {
    background: ${({ theme }) => theme.colors.white.normal};
    padding: 17px 0;

    a {
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
      text-decoration-line: underline;
      color: ${({ theme }) => theme.colors.text.normal};
    }
  }
`;

const AppLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  if (isInternalLink(href)) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default function Footer() {
  const [isLoading, setIsLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  const generateLogo = () => {
    if (companyInfo?.company_logo_white.id) {
      const logoUrl = parseImageURL(companyInfo?.company_logo_white.id);
      return (
        <Image
          src={logoUrl}
          alt={companyInfo.company_name}
          width={177}
          height={88}
          className="object-cover"
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getCompanyInfo();
      if (data) {
        setCompanyInfo(data);
      }
      setIsLoading(false);
    };

    if (!companyInfo && isLoading) {
      getData();
    }
  }, [companyInfo, isLoading]);

  return (
    <StyledFooter>
      <div className="footer-top">
        <Container maxWidth="xl">
          <Grid container spacing={"24px"}>
            <Grid item xs={12} md={3}>
              <div className="mb-[50px]">{generateLogo()}</div>
              <Grid container>
                {companyInfo?.external_publications?.map?.((publication) => {
                  if (!publication?.external_publications_id?.logo_white) {
                    return null;
                  }
                  return (
                    <Grid
                      item
                      xs={4}
                      key={publication.external_publications_id.id}
                    >
                      <a
                        href={publication.external_publications_id.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-block",
                          height: "49.5px",
                          width: "100%",
                          minWidth: "54px",
                          maxWidth: "81.29px",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={parseImageURL(
                            publication.external_publications_id.logo_white
                          )}
                          alt={companyInfo.company_name}
                          fill
                          className="object-contain"
                        />
                      </a>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
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
              <H3 variant="bold">{companyInfo?.important_links_title}</H3>
              {companyInfo?.important_links?.map?.((item, index) => (
                <P key={`${item.id}-${index}`}>
                  <AppLink href={item.link}>{item.name}</AppLink>
                </P>
              ))}
              {!!companyInfo?.privacy_url && (
                <P>
                  <AppLink href={companyInfo.privacy_url}>
                    Privacyverklaring
                  </AppLink>
                </P>
              )}
              {!!companyInfo?.terms_condition_url && (
                <P>
                  <AppLink href={companyInfo.terms_condition_url}>
                    Terms & Conditions
                  </AppLink>
                </P>
              )}
              {!!companyInfo?.cookies_url && (
                <P>
                  <AppLink href={companyInfo.cookies_url}>Cookies</AppLink>
                </P>
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              <H3 variant="bold">Socials</H3>
              {!!companyInfo?.instagram_url && (
                <P>
                  <AppLink href={companyInfo.instagram_url}>Instagram</AppLink>
                </P>
              )}
              {!!companyInfo?.twitter_url && (
                <P>
                  <AppLink href={companyInfo.twitter_url}>Twitter</AppLink>
                </P>
              )}
              {!!companyInfo?.linkedin_url && (
                <P>
                  <AppLink href={companyInfo.linkedin_url}>Linkedin</AppLink>
                </P>
              )}
              {!!companyInfo?.facebook_url && (
                <P>
                  <AppLink href={companyInfo.facebook_url}>Facebook</AppLink>
                </P>
              )}
              {!!companyInfo?.tiktok_url && (
                <P>
                  <AppLink href={companyInfo.tiktok_url}>Tiktok</AppLink>
                </P>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </StyledFooter>
  );
}
