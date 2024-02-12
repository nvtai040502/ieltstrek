import { BlankButton } from "./blank-button";
import BlockButton from "./block-button";
import { MarkButton } from "./mark-button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Underline,
  X,
} from "lucide-react";
function Toolbar() {
  return (
    <div className="flex flex-wrap">
      <MarkButton format="bold" icon={<Bold />} />
      <MarkButton format="italic" icon={<Italic />} />
      <MarkButton format="underline" icon={<Underline />} />
      <BlankButton icon={<Code />} />
      <BlockButton format="heading-one" icon={<Heading1 />} />
      <BlockButton format="heading-two" icon={<Heading2 />} />
      <BlockButton format="blockquote" icon={<Quote />} />
      <BlockButton format="bulleted-list" icon={<List />} />
      <BlockButton format="numbered-list" icon={<ListOrdered />} />
      <BlockButton format="left" icon={<AlignLeft />} />
      <BlockButton format="center" icon={<AlignCenter />} />
      <BlockButton format="right" icon={<AlignRight />} />
      <BlockButton format="justify" icon={<AlignJustify />} />
    </div>
  );
}

export default Toolbar;
