import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

export type CustomEditor = BaseEditor & ReactEditor
export type AlignType = "center" | "left" | "right" | "bottom"
export type ParagraphElement = {
  type: 'paragraph'
  align: AlignType
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingElement

export type FormattedText = { text: string; bold?: true }

export type CustomText = FormattedText

