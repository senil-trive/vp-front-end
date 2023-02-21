import ReactHtmlParser from "html-react-parser";

export default function parseHTMLtoReact(html: string | undefined) {
  return ReactHtmlParser(html);
}
