```js
import { Grid } from "/components/layout";
import { H5 } from "/components/typography";

const embedCode = `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@villa_pinedo/video/7208893571468922118" data-video-id="7208893571468922118" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@villa_pinedo" href="https://www.tiktok.com/@villa_pinedo?refer=embed">@villa_pinedo</a> Aan alle gescheiden ouders van Nederland… 🫶🏽 <a title="gescheidenouders" target="_blank" href="https://www.tiktok.com/tag/gescheidenouders?refer=embed">#gescheidenouders</a> <a title="gescheidenouderscheck" target="_blank" href="https://www.tiktok.com/tag/gescheidenouderscheck?refer=embed">#gescheidenouderscheck</a> <a title="gescheidenouderslife" target="_blank" href="https://www.tiktok.com/tag/gescheidenouderslife?refer=embed">#gescheidenouderslife</a> <a title="gescheiden_ouders" target="_blank" href="https://www.tiktok.com/tag/gescheiden_ouders?refer=embed">#gescheiden_ouders</a> <a title="gescheidenoudersbelike" target="_blank" href="https://www.tiktok.com/tag/gescheidenoudersbelike?refer=embed">#gescheidenoudersbelike</a> <a title="oudersgescheiden" target="_blank" href="https://www.tiktok.com/tag/oudersgescheiden?refer=embed">#oudersgescheiden</a> <a title="mijnouderszijngescheiden" target="_blank" href="https://www.tiktok.com/tag/mijnouderszijngescheiden?refer=embed">#mijnouderszijngescheiden</a> <a title="ziggodome" target="_blank" href="https://www.tiktok.com/tag/ziggodome?refer=embed">#ziggodome</a> <a target="_blank" title="♬ origineel geluid - Villa Pinedo" href="https://www.tiktok.com/music/origineel-geluid-7208893583373093638?refer=embed">♬ origineel geluid - Villa Pinedo</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`;

<Grid container spacing={"32px"}>
  <Grid item md={8}>
    <H5 variant="bold">8 Col</H5>
    <TikTokPost embedCode={embedCode} />
  </Grid>
  <Grid item md={4}>
    <H5 variant="bold">4 Col</H5>
    <TikTokPost embedCode={embedCode} />
  </Grid>
  <Grid item md={6}>
    <H5 variant="bold">6 Col</H5>
    <TikTokPost embedCode={embedCode} />
  </Grid>
  <Grid item md={3}>
    <H5 variant="bold">3 Col</H5>
    <TikTokPost embedCode={embedCode} />
  </Grid>
  <Grid item md={3}>
    <H5 variant="bold">3 Col</H5>
    <TikTokPost embedCode={embedCode} />
  </Grid>
</Grid>;
```
