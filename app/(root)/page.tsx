import { CreateBook } from "@/components/cambridge-book/create-book"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header"
import { db } from "@/lib/db"
import axios from "axios"
const RootPage = async () => {
  const books = await db.cambridgeBook.findMany()
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Build your component library</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </PageHeaderDescription>
      </PageHeader>
      <CreateBook/>
      {books.map((book) => (
        <div key={book.id}>
          {book.version}
        </div>
      ))}
    </div>
  )
}
export default RootPage