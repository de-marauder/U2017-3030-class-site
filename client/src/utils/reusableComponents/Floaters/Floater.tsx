import { ReactNode } from 'react'
import './Floater.css'


export const Floater: React.FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className="showcase">
            <div className="overlay">
            </div>
            <div className='shape shape-1'></div>
            <div className='shape shape-2'></div>
            <div className='shape shape-3'></div>
            <div className='shape shape-4'></div>
            <div className='shape shape-5'></div>
            <div className='shape shape-6'></div>
            <div className='shape shape-7'></div>
            <div className='shape shape-8'></div>
            <div className='shape shape-9'></div>
            <div className='shape shape-10'></div>
            <div className='shape shape-11'></div>
            <div className='shape shape-12'></div>
            <div className='shape shape-13'></div>
            <div className='shape shape-14'></div>
            <div className='shape shape-15'></div>
            <div className='shape shape-16'></div>
            <div className='shape shape-17'></div>
            <div className='shape shape-18'></div>
            <div className='shape shape-19'></div>
            <div className='shape shape-20'></div>
            <div className='shape shape-21'></div>
            {children}
        </div>
    )
}
