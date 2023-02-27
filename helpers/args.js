export default function getArgs(args) {
    const res = {};

    args.forEach((param, index, array) => {
        const nextParam = array[index + 1];

        if (param.startsWith('-')) {
            if (nextParam === undefined || nextParam.startsWith('-')) {
                res[param.replace('-', '')] = true
            } else {
                res[param.replace('-', '')] = nextParam;
            }
        }
    })

    return res;
}