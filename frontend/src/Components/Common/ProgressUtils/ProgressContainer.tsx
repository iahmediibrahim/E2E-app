import { useEffect, useState } from 'react';
import { addProgressSetter, destroyProgressSetter } from './ProgressSvc';

export type ProgressOuterContainerProps = {
    initial?: boolean;
    name: string;
};

export type ProgressContainerProps = ProgressOuterContainerProps & {
    children: (progress: boolean) => JSX.Element;
};

function ProgressContainer({ initial = false, name, children }: ProgressContainerProps) {
    const [progress, setProgress] = useState(initial);

    useEffect(() => {
        addProgressSetter(name, setProgress);

        return () => {
            destroyProgressSetter(name);
        };
    }, []);

    return children(progress);
}

export default ProgressContainer;
