import React from 'react'
import './Loader.scss'

const Loader = () =>
   <div className={'loader'}>
       <div className={'lds-ring'}>
              <div/>
              <div/>
              <div/>
              <div/>
          </div>
       <div className={'big-loader__background'} />
   </div>

export default Loader
