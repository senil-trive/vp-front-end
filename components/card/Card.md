### Description

The card component.

### Examples

**Brief Item in Grid cols:**

Brief (Dutch for Letter) item that displays a summary of downloadable letter.

```js
import { Grid } from "/components/layout";
import Card from "/components/card/Card";
import CardHeader from "/components/card/CardHeader/CardHeader";
import CardFooter from "/components/card/CardFooter/CardFooter";
import Tag from "/components/buttons/Tag/Tag";
import Button from "/components/buttons/Button";
import { H3, H5, P } from "/components/typography";

<Grid container spacing={"32px"}>
  <Grid item md={8}>
    <H5 variant="bold">8 Col</H5>
    <Card>
      <CardHeader>
        <>
          {/* Image element of NextJS doesn't work with Styleguidist */}
          <img
            className="absolute h-full w-full top-0 left-0 z-0 object-cover"
            src="https://picsum.photos/920/180"
            alt="Brief voor alle kinderen"
          />

          <Tag variant="dark" size="m" position="bl">
            Thema
          </Tag>
        </>
      </CardHeader>
      <CardFooter>
        <H3 variant="bold" className="mb-[12px]">
          Brief voor alle kinderen
        </H3>
        <P className="mb-[56px]">
          Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de
          ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per
          jaar horen dat hun ouders gaan scheiden?
        </P>

        <Button
          variant="primary"
          onClick={() =>
            window.open("https://www.africau.edu/images/default/sample.pdf")
          }
        >
          Download brief
        </Button>
      </CardFooter>
    </Card>
  </Grid>
  <Grid item md={4}>
    <H5 variant="bold">8 Col</H5>
    <Card>
      <CardHeader>
        <>
          {/* Image element of NextJS doesn't work with Styleguidist */}
          <img
            className="absolute h-full w-full top-0 left-0 z-0 object-cover"
            src="https://picsum.photos/920/180"
            alt="Brief voor alle kinderen"
          />
        </>
      </CardHeader>
      <CardFooter>
        <H3 variant="bold" className="mb-[12px]">
          Brief voor alle kinderen
        </H3>
        <P className="mb-[56px]">
          Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de
          ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per
          jaar horen dat hun ouders gaan scheiden?
        </P>

        <Button
          variant="primary"
          onClick={() =>
            window.open("https://www.africau.edu/images/default/sample.pdf")
          }
        >
          Download brief
        </Button>
      </CardFooter>
    </Card>
  </Grid>
</Grid>;
```

<!--
**Blog Item in Grid cols:**

Blog item that displays a summary of blog post.

```js
import Grid from "/components/grid/Grid";
import GridItem from "/components/grid/GridItem";
import Card from "/components/card/Card";
import CardHeader from "/components/card/CardHeader/CardHeader";
import CardFooter from "/components/card/CardFooter/CardFooter";
import Tag from "/components/buttons/Tag/Tag";
import Button from "/components/buttons/Button";
import { H3, H5, P } from "/components/typography/Typography";

<Grid>
  <GridItem size={8}>
    <H5 variant="bold">8 Col</H5>
    <Card variant="blog">
      <CardHeader>
        <>
          {/* Image element of NextJS doesn't work with Styleguidist */}
          <img
            className="absolute h-full w-full top-0 left-0 z-0 object-cover"
            src="https://picsum.photos/920/180"
            alt="Brief voor alle kinderen"
          />

          <Tag variant="dark" className="absolute bottom-[24px] left-[24px]">
            Thema
          </Tag>
        </>
      </CardHeader>
      <CardFooter className="py-[32px] px-[24px]">
        <H3 variant="bold" className="mb-[12px]">
          Brief voor alle kinderen
        </H3>
        <P className="mb-[56px]">
          Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de
          ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per
          jaar horen dat hun ouders gaan scheiden?
        </P>

        <Button
          onClick={() =>
            window.open("https://www.africau.edu/images/default/sample.pdf")
          }
        >
          Download brief
        </Button>
      </CardFooter>
    </Card>
  </GridItem>
</Grid>;
``` -->
