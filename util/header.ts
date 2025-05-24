/**
 * 
 * @param acceptLanguage string containing accept-language header value (id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7)
 * @returns language string (id-ID, en-US)
 */
export function getPreferredLanguage(acceptLanguage: string): string {
    const val = acceptLanguage.split(',')
    return val[0]
}
