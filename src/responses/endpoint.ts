export function responseEndpoint({ result = {}, targetUrl = null, success = true, error = null, unAuthorizedRequest = false, __abp = true }) {
  return {
    result,
    targetUrl,
    success,
    error,
    unAuthorizedRequest,
    __abp
  }
}