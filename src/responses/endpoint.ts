export function responseEndpoint({ result = {}, status= 200 }) {
  return {
    result,
    status,
  }
}