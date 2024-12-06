import { serializeLexical } from "./serialize";

interface RichTextProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  content: Record<string, any>;
}

const RichText: React.FC<RichTextProps> = ({ content }) => {
  return <>{serializeLexical({ nodes: content?.root?.children })}</>;
};

export default RichText;
