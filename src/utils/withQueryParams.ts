export function withQueryParams(pathname: string, qparams?: string) {
  if (!qparams) {
    return pathname;
  }
  qparams = qparams.trim();
  const normQParams = qparams.startsWith('?') ? qparams.slice(1) : qparams;
  if (normQParams !== '') {
    return pathname + `?${normQParams}`;
  }
  return pathname;
}
