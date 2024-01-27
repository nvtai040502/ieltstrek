import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header"

const RootPage = () => {
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