// TODO: err type
export const getError = (err: any) => {
  if (err.respoonse && err.respoonse.data && err.respoonse.data.message)
    return err.respoonse.data.message;
  return err.message;
};
