### Colors

```jsx harmony
import Grid from "/components/grid/Grid";
import GridItem from "/components/grid/GridItem";
import ColorCard from "/components/card/ColorCard/ColorCard";
import { COLORS } from "/styles/theme";

<>
  <Grid>
    <GridItem size={4}>
      <ColorCard color={COLORS.primary} />
    </GridItem>
    <GridItem size={4}>
      <ColorCard color={COLORS.secondary} />
    </GridItem>
    <GridItem size={4}>
      <ColorCard color={COLORS.tertiary} />
    </GridItem>
    <GridItem size={4}>
      <ColorCard color={COLORS.text} />
    </GridItem>
    <GridItem size={4}>
      <ColorCard color={COLORS.white} />
    </GridItem>
    <GridItem size={4}>
      <ColorCard color={COLORS.black} />
    </GridItem>
    <GridItem size={4}>
      <ColorCard color={COLORS.error} />
    </GridItem>
    <GridItem size={4}>
      <ColorCard color={COLORS.success} />
    </GridItem>
    <GridItem size={4}>
      <ColorCard color={COLORS.info} />
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
import ChevronUpFilled from "/components/icons/ChevronUpFilled/ChevronUpFilled";
import ChevronDownFilled from "/components/icons/ChevronDownFilled/ChevronDownFilled";
import ImportantCircle from "/components/icons/ImportantCircle/ImportantCircle";
import UserIcon from "/components/icons/UserIcon/UserIcon";
import SearchIcon from "/components/icons/SearchIcon/SearchIcon";
import CheckmarkIcon from "/components/icons/Checkmark/CheckmarkIcon";

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
      <ChevronUpFilled />
    </GridItem>
    <GridItem>
      <ChevronDownFilled />
    </GridItem>
    <GridItem>
      <ImportantCircle />
    </GridItem>
    <GridItem>
      <UserIcon />
    </GridItem>
    <GridItem>
      <SearchIcon />
    </GridItem>
    <GridItem>
      <CheckmarkIcon />
    </GridItem>
  </Grid>
</>;
```
