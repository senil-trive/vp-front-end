### Description

Forum post that displays a summary of the forum post.

### Examples

**Video Item in Grid cols:**

```js
import Grid from "/components/grid/Grid";
import GridItem from "/components/grid/GridItem";
import { H5 } from "/components/typography/Typography";

<Grid>
  <GridItem size={8}>
    <H5 variant="bold">8 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </GridItem>
  <GridItem size={4}>
    <H5 variant="bold">4 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </GridItem>
  <GridItem size={6}>
    <H5 variant="bold">6 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </GridItem>

  <GridItem size={3}>
    <H5 variant="bold">3 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </GridItem>
  <GridItem size={3}>
    <H5 variant="bold">3 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </GridItem>
</Grid>;
```
