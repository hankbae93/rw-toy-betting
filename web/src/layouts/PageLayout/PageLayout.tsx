import Navbar from 'src/components/Navbar/Navbar'
import { Toaster } from '@redwoodjs/web/toast'

type PageLayoutProps = {
  children?: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Toaster />
      <main className="relative">
        <Navbar />

        <section className="wide:padding-r padding-b">
          <div className="max-container w-full pt-[93px] xl:flex-row">
            {children}
          </div>
        </section>
      </main>
    </>
  )
}

export default PageLayout
