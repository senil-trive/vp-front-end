### Description

This is a tag

### Examples

**Tag normal:**

```js
<Tag onClick={() => alert("Optional click")}>Tag name</Tag>
```

**Tag small:**

```js
import CardHeader from "/components/card/CardHeader/CardHeader";

<CardHeader className="border">
  <Tag
    size="s"
    onClick={() => alert("Optional click")}
    className="absolute bottom-0 right-0"
  >
    Tag name
  </Tag>
</CardHeader>;
```
