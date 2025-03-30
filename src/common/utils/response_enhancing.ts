export const enhanceRes = (res) => {
    const originalEnd = res.end.bind(res);
    const originalTryEnd = res.tryEnd.bind(res);

    res.finished = false;

    res.end = (...args) => {
        originalEnd(...args);
        res.finished = true;
        return res;
    }

    res.tryEnd = (...args) => {
        const [ok, done] = originalTryEnd(...args);
        res.finished = done;
        return [ok, done]
    }
}