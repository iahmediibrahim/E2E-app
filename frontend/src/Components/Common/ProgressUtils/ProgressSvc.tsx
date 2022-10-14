const list = new Map<string, MapValue>();
type MapValue = (value: boolean) => void;

export function addProgressSetter(key: string, setter: MapValue) {
    list.set(key, setter);
}

export function destroyProgressSetter(key: string) {
    list.delete(key);
}

export function setProgress(key: string, value: boolean) {
    const setter = list.get(key);

    if (setter) {
        setter(value);
    }
}
