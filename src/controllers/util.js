export function errorToMessage(error) {
  return error.details.map((err) => err.message).join("\n");
}
