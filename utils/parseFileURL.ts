export const parseFileURL = (fileID: string) => {
  console.log(fileID);
  return fileID
    ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${fileID}?download`
    : "";
};
