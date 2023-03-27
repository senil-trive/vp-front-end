import { Modal } from "@mui/material";
import Link from "next/link";
import { useCookies } from "react-cookie";
import styled, { useTheme } from "styled-components";
import Button from "../../buttons/Button";
import { P, TitleWithHighlights } from "../../typography";

const Wrapper = styled.div`
  width: 70%;
  max-width: 688px;
  padding: 32px;
  height: auto;
  border-radius: 12px;
  z-index: 40001;
  background: #fff;

  footer {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 32px;
    width: 100%;
  }
`;

export default function CookieBanner() {
  const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME ?? "vp-cookie-consent";
  const [cookies, setCookie] = useCookies([cookieName]);

  console.log({ cookieName });

  return (
    <Modal
      open={!cookies["vp-cookie-consent"]}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Wrapper>
        <TitleWithHighlights
          text="Villa Pinedo gebruikt cookies"
          textToHighlight="cookies"
          highlightColor="info"
          headerElement="h3"
        />

        <div className="content mt-4 mb-12 overflow-y-scroll h-64">
          <P>
            Om je zo goed mogelijk van helpen gebruiken we cookies (over het
            algemeen javascripts). Cookies helpen ons om de website goed te
            laten werken, hem relevanter voor je te maken.
          </P>
          <P>
            Derde partijen plaatsen hiervoor ook cookies. Cookies van derde
            partijen zijn soms nodig om bijvoorbeeld filmpjes te kunnen tonen op
            onze website of het je mogelijk te maken informatie te delen op
            social media.
          </P>
          <P>
            Via onze websites verzamelen wij en/of derden gegevens, zoals je
            klikgedrag op onze websites, je IP-adres, en gegevens die je zelf op
            de website achterlaat.{" "}
          </P>
          <P>
            Waar het kan combineren we deze gegevens met andere persoonlijke
            informatie (klantdata) die we van je verzameld hebben.{" "}
          </P>
          <P>
            Wanneer je jouw emailadres achterlaat, kunnen wij je ook een email
            sturen om je te informeren.
          </P>
        </div>
        <P>
          We hebben de optimale keuze voorgeselecteerd. Klik op `accepteren``
          als je hiermee akkoord gaat.
        </P>
        <P>
          Meer informatie staat op de{" "}
          <Link style={{ textDecoration: "underline" }} href="/cookies">
            cookies
          </Link>{" "}
          en{" "}
          <Link
            style={{ textDecoration: "underline" }}
            href="/privacy-statement"
          >
            privacy verklaring
          </Link>{" "}
          pagina van Villa Pinedo.
        </P>
        <footer>
          <Button
            variant="infoReversed"
            onClick={() => setCookie(cookieName, false)}
          >
            Liever Niet
          </Button>
          <Button variant="primary" onClick={() => setCookie(cookieName, true)}>
            Accepteren
          </Button>
        </footer>
      </Wrapper>
    </Modal>
  );
}
