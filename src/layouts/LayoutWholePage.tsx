
import LayoutWholeMain from './LayoutWholeMain'

function Layout() {
  return (
    <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 bg-green-500 h-full">sidebar</div>
        <div className="col-span-9"><LayoutWholeMain/></div>


    </div>
  )
}

export default Layout