import { useState } from "react";
import QrReader from "./api/QrReader";

const ReaderPage = () => {
    const [data, setData] = useState('No result');

    return (
        <div>
            <center>
                <br/><br/>
                <br/><br/>
                <QrReader setData={setData} />
                <br/><br/>
                <br/><br/>
                <p style={{ fontSize: '50px' }}>{data}</p>
            </center>
        </div>
    );
};

export default ReaderPage;
