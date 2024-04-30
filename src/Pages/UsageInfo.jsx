import React from 'react'
import { useSelector } from 'react-redux'
import { lang } from '../Redux/Slice/userAppDataSlice'
import Header from '../Component/Header';
import useFetchUsageInfo from '../hook/fetchingData/useFetchUsageInfo';
import Loader from '../Component/Loader';
import Error from '../Component/Error'
import DOMPurify from 'dompurify';
export default function UsageInfo() {
  const language = useSelector(lang);
  const { info, error, isLoading } = useFetchUsageInfo();

  const renderContent = () => {
    if (isLoading) return <Loader />
    if (error) return <Error message={error.message} />
    if (info) {
      const cleanContent = DOMPurify.sanitize(info[language])
      return <div className='space-y-6 p-3 text-lg' dangerouslySetInnerHTML={{ __html: cleanContent }}></div>
    }
  }
  return (
    <>
      <Header back={true} />
      {renderContent()}
    </>
  )
}