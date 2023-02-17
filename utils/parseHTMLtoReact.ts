import ReactHtmlParser from "react-html-parser";

export default function parseHTMLtoReact(html: string | undefined) {
  return ReactHtmlParser(html);
}
