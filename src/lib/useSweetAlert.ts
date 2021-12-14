import Swal from "sweetalert2";
import {useEffect, useState} from "react";
export const useSweetAlert = () => {

    interface sweetType {
        title: string,
        text?: string,
        icon: 'success' | 'error' | 'warning' | 'info' | 'question' | undefined,
    }

    const [sweetAlert, fireSweetAlert] = useState<sweetType>({
        title: '',
        text: '',
        icon: undefined,
    });

    useEffect(() => {
        if (sweetAlert.title) FIRE();
    }, [sweetAlert]);

    function FIRE() {
        Swal.fire({
            ...sweetAlert,
            background: 'ghostwhite',
            // timer: 3000,
            // timerProgressBar: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
            showCloseButton: true,
        })
            .then((result) => {
            })
            .catch(err => {
            });
    }

    return {fireSweetAlert};
}