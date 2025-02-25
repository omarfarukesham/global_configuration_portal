const ImageBase64View = ({ data, ...props }) => {
  return <img src={`data:image/png;base64,${data}`} {...props} />;
};

export default ImageBase64View;
