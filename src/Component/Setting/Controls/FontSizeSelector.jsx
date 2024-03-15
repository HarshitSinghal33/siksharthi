import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBookFontSize } from '../../../Redux/Slice/userAppDataSlice';
import changeLocalStorage from '../../../utils/changeLocalStorage'
import { fSize } from '../../../Redux/Slice/userAppDataSlice';
export default function FontSizeSelector() {
  const dispatch = useDispatch()
  const fetchedFontSize = useSelector(fSize)
  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setBookFontSize(value))
    changeLocalStorage('BookFontSize', value)
  }
  return (
    <div className='borderBottom'>
      <div className='flexprop'>
        <h2>Book Font Size</h2>
        <select name="fontsize" id="fontsize" onChange={handleChange} value={fetchedFontSize} className='p-2 dark:text-black text-white dark:bg-white rounded bg-black'>
          <option value="15">Small</option>
          <option value="21">Medium</option>
          <option value="27">Large</option>
        </select>
      </div>
      <p style={{ fontSize: `${fetchedFontSize}px` }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eveniet beatae aperiam enim blanditiis, eligendi ullam quos architecto nesciunt dolorem iste.
      </p>
    </div>
  )
}
