import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { getDetailsByCompanyName } from '../../../store/actions/leaderBoardAction'
import MainContentNonLogin from './MainContentNonLogin/MainContentNonLogin'
import NavBarNonLogin from './NavBarNonLogin/NavBarNonLogin'
import SideBarNonLogin from './SideBarNonLogin/SideBarNonLogin'

function ByrdsPageNonLogin() {
  const { companyName } = useParams()
  const [companyId, setCompanyId] = useState("");
  const [byrdsPoints, setByrdsPoints] = useState("");
  const [companyRank, setCompanyRank] = useState("");
  const [companyRankStatus, setCompanyRankStatus] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if(companyName){
      dispatch(getDetailsByCompanyName(companyName)).then(response => {
        setCompanyId(response.data.details[0]?.id);
        setByrdsPoints(response.data.details[0]?.updatedByrdsPoints);
        setCompanyRank(response.data.details[0]?.companyRank)
        setCompanyRankStatus(response.data.details[0]?.companyRankStatus)
      })
    }
  }, [dispatch, companyName])

  return (
    <div className="flex min-h-screen">
      <div className="w-1/6">
        <SideBarNonLogin companyId={companyId} byrdsPoints={byrdsPoints}/>
      </div>
      <div className="w-5/6">
        <NavBarNonLogin company={companyName} />
        <MainContentNonLogin companyRank={companyRank} companyRankStatus={companyRankStatus} companyId={companyId} companyName={companyName}/>
      </div>
    </div>
  )
}

export default ByrdsPageNonLogin