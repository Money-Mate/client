
import LayoutWholeMain from './LayoutWholeMain'

function Layout() {
  return (
    <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 bg-indigo-800 h-full ">sidebar-placeholder</div>
        <div className="col-span-9 h-full"><LayoutWholeMain/></div>
    </div>
  )
}

export default Layout