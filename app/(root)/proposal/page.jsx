import React from 'react'
import PDFViewer from '../../../components/PDFViewer'

const page = () => {
    return (
        <div>
            {/* <PDFViewer title="Proposal" src={"/pdfs/Agricare4_update.pdf"} /> */}
            <PDFViewer />

            {/* <iframe src="/pdfs/Agricare4_update.pdf" className="relative w-full h-screen" ></iframe> */}
        </div>
    )
}

export default page

//  "/pdfs/Agricare4_update.pdf"