import dynamic from "next/dynamic";

const QrReaderComponent = dynamic(() => import("react-web-qr-reader"), {
  ssr: false
});

const previewStyle = {
    height: 240,
    width: 320,
};

const QrReader = ({ setData }) => {
  const onScan = (event) => setData(event.data);

  return <QrReaderComponent onScan={onScan} onError={console.error} style={previewStyle}/>;
};

export default QrReader;
