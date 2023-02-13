```jsx
import { P } from "/components/typography";
import {Grid} from "/components/layout";

const items = [
  {
    name: 'test 1',
    link: 'test-1'
  },
  {
    name: 'test 2',
    link: 'test-2'
  },
  {
    name: 'test 3',
    link: 'test-3'
  },
]

<Grid container spacing={'22px'}>
  <Grid item md={4}>
    <SearchResultItem
      amount={3} resultTitleSuffix={<P>in ons Variant 1</P>}
      list={items}
    />
  </Grid>

  <Grid item md={4}>
    <SearchResultItem
      colorVariant={2}
      amount={3} resultTitleSuffix={<P>in ons Variant 2</P>}
      list={items}
    />
  </Grid>
</Grid>
```
