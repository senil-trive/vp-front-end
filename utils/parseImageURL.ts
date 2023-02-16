const parseImageURL = function (imageID: string) {
  return imageID ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${imageID}` : "";
};

export default parseImageURL;
