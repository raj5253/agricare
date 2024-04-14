import React from 'react'
import PDFViewer from '../../../components/PDFViewer'

const page = () => {
    return (
        <div>
            <h1 className='text center h3-bold'>Read our Proposal</h1>
            {/* <PDFViewer title="Proposal" src={"/pdfs/Agricare4_update.pdf"} /> */}
            {/* <PDFViewer /> */}

            <iframe src="/pdfs/Agricare4_update.pdf" className="relative w-full h-screen" ></iframe>
        </div>
    )
}

export default page