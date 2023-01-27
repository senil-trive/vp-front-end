### Description

Brief (Dutch for Letter) item that displays a summary of downloadable letter.

### Examples

**Brief Item in Grid cols:**

```js
import Grid from "/components/grid/Grid";
import GridItem from "/components/grid/GridItem";
import { H5 } from "/components/typography/Typography";

<Grid>
  <GridItem size={8}>
    <H5 variant="bold">8 Col</H5>
    <BriefItem
      title="Brief voor alle kinderen"
      description="Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per jaar horen dat hun ouders gaan scheiden?"
      downloadLink="https://www.africau.edu/images/default/sample.pdf"
      imgSrc="https://picsum.photos/920/180"
      theme="Thema"
    />
  </GridItem>
  <GridItem size={4}>
    <H5 variant="bold">4 Col</H5>
    <BriefItem
      title="Brief voor alle kinderen"
      description="Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per jaar horen dat hun ouders gaan scheiden?"
      downloadLink="https://www.africau.edu/images/default/sample.pdf"
      imgSrc="https://picsum.photos/920/180"
      theme="Thema"
    />
  </GridItem>
  <GridItem size={6}>
    <H5 variant="bold">6 Col</H5>
    <BriefItem
      title="Brief voor alle kinderen"
      description="Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per jaar horen dat hun ouders gaan scheiden?"
      downloadLink="https://www.africau.edu/images/default/sample.pdf"
      imgSrc="https://picsum.photos/920/180"
      theme="Thema"
    />
  </GridItem>

  <GridItem size={3}>
    <H5 variant="bold">3 Col</H5>
    <BriefItem
      title="Brief voor alle kinderen"
      description="Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per jaar horen dat hun ouders gaan scheiden?"
      downloadLink="https://www.africau.edu/images/default/sample.pdf"
      imgSrc="https://picsum.photos/920/180"
      theme="Thema"
    />
  </GridItem>
  <GridItem size={3}>
    <H5 variant="bold">3 Col</H5>
    <BriefItem
      title="Brief voor alle kinderen"
      description="Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per jaar horen dat hun ouders gaan scheiden?"
      downloadLink="https://www.africau.edu/images/default/sample.pdf"
      imgSrc="https://picsum.photos/920/180"
      theme="Thema"
    />
  </GridItem>
</Grid>;
```
