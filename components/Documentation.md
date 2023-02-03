### Colors

```jsx harmony
import Grid from "/components/grid/Grid";
import GridItem from "/components/grid/GridItem";

<>
  <Grid>
    <GridItem>
      <div>Color 1</div>
      <div>Color 1</div>
      <div>Color 1</div>
      <div>Color 1</div>
      <div>Color 1</div>
      <div>Color 1</div>
    </GridItem>
  </Grid>
</>;
```

### Icons & Logos

```jsx harmony
import Grid from "/components/grid/Grid";
import GridItem from "/components/grid/GridItem";
import Logo from "/components/icons/Logo/Logo";

import HeartIcon from "/components/icons/HeartIcon/HeartIcon";
import ChevronUp from "/components/icons/ChevronUp/ChevronUp";
import ChevronDown from "/components/icons/ChevronDown/ChevronDown";
import ImportantCircle from "/components/icons/ImportantCircle/ImportantCircle";

<>
  <Grid>
    <GridItem size={12}>
      <Logo />
    </GridItem>

    <GridItem>
      <HeartIcon />
    </GridItem>
    <GridItem>
      <ChevronUp />
    </GridItem>
    <GridItem>
      <ChevronDown />
    </GridItem>
    <GridItem>
      <ImportantCircle />
    </GridItem>
  </Grid>
</>;
```
