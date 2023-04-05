import React from 'react'
import MainContentLBNL from './MainContentLBNL/MainContentLBNL'
import NavBarLBNL from './NavBarLBNL/NavBarLBNL'
import SideBarLBNL from './SideBarLBNL/SideBarLBNL'

function LeaderBoardNonLogIn() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/6">
        <SideBarLBNL/>
      </div>
      <div className="w-5/6">
        <NavBarLBNL />
        <MainContentLBNL/>
      </div>
    </div>
  )
}

export default LeaderBoardNonLogIn