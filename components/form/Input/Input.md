### Input

```jsx harmony
import UserIcon from "/components/icons/UserIcon/UserIcon";

<Input type="text" />;
```

### Input with label

```jsx harmony
import UserIcon from "/components/icons/UserIcon/UserIcon";

<Input label="Label" type="text" />;
```

### Input with helper-text

```jsx harmony
import UserIcon from "/components/icons/UserIcon/UserIcon";

<Input type="text" helperText="Text to help " />;
```

### Input with label and helper text

```jsx harmony
import UserIcon from "/components/icons/UserIcon/UserIcon";

<Input label="Label" type="text" helperText="Text to help " />;
```

### Input with helper text & Icon

```jsx harmony
import UserIcon from "/components/icons/UserIcon/UserIcon";

<>
  <Input
    label="Label"
    type="text"
    helperText="Text to help "
    iconLeft={<UserIcon />}
  />
</>;
```

### Input with helper text, icon and placeholder

```jsx harmony
import SearchIcon from "/components/icons/SearchIcon/SearchIcon";

<>
  <Input
    label="Label"
    type="text"
    placeholder="Search"
    helperText="Text to help "
    iconLeft={<SearchIcon />}
  />
</>;
```

### Input disabled

```jsx harmony
import SearchIcon from "/components/icons/SearchIcon/SearchIcon";

<>
  <Input
    label="Label"
    type="text"
    placeholder="Search"
    helperText="Text to help "
    iconLeft={<SearchIcon />}
    disabled
  />
</>;
```

### Input active

```jsx harmony
import SearchIcon from "/components/icons/SearchIcon/SearchIcon";

<>
  <Input
    label="Label"
    type="text"
    placeholder="Search"
    helperText="Text to help "
    iconLeft={<SearchIcon />}
    active
  />
</>;
```

### Input with error

```jsx harmony
import SearchIcon from "/components/icons/SearchIcon/SearchIcon";

<>
  <Input
    label="Label"
    type="text"
    placeholder="Search"
    helperText="Text to help "
    iconLeft={<SearchIcon />}
    hasError
  />
</>;
```
