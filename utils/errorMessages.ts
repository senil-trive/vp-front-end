export function getErrorField(err: any) {
  if (err?.message?.includes("email")) {
    return {
      type: "email",
      ...err,
    };
  }
  if (err?.message?.includes("password")) {
    return {
      type: "password",
      ...err,
    };
  }

  return err;
}
