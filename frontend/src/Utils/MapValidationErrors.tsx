export function mapValidationErrors(errors: { [name: string]: string[] | string }) {
    const mappedErrors: { name: string; type: string; message: any }[] = []
    Object.keys(errors || {})?.forEach((name) => {
        if (typeof errors[name] === 'string') {
            mappedErrors.push({
                name,
                type: 'SSE',
                message: errors[name],
            })
        } else {
            mappedErrors.push({
                name,
                type: 'SSE',
                message: errors[name][0],
            })
        }
    })

    return mappedErrors
}
