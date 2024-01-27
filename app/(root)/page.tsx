import { CreateBookButton } from "@/components/books/create-book-button"
import { CreateBook } from "@/components/cambridge-book/create-book"
import { CreatePart } from "@/components/cambridge-book/create-part"
import { CreateTest } from "@/components/cambridge-book/create-test"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import axios from "axios"
const RootPage = async () => {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Build your component library</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </PageHeaderDescription>
      </PageHeader>
      <CreateBookButton asChild mode="modal">
        <Button> Create Book</Button>
      </CreateBookButton>
      {/* <CreateTest cambridgeBooks={books} />
      <CreatePart tests={tests}/> */}
    </div>
  )
}
export default RootPage