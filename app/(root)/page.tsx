import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header"
import axios from "axios"
const RootPage = async () => {
  const book = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN%3A9781108409636&format=json&jscmd=viewapi")
  console.log("🚀 ~ RootPage ~ book:", book.data)
  
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Build your component library</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </PageHeaderDescription>
      </PageHeader>
      
    </div>
  )
}
export default RootPage