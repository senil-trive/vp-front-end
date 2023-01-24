### Description

Video item that displays self hosted image.

### Examples

**Video Item in Grid cols:**

```js
import Grid from "../../grid/Grid";
import GridItem from "../../grid/GridItem";
import { H5 } from "/components/typography/Typography";

<Grid>
  <GridItem size={8}>
    <H5 variant="bold">8 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </GridItem>
  <GridItem size={4}>
    <H5 variant="bold">4 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </GridItem>
  <GridItem size={6}>
    <H5 variant="bold">6 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </GridItem>

  <GridItem size={3}>
    <H5 variant="bold">3 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </GridItem>
  <GridItem size={3}>
    <H5 variant="bold">3 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </GridItem>
</Grid>;
```
