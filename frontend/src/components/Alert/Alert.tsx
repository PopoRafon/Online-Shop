import { useEffect, useState } from 'react';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import SuccessIcon from '@assets/images/icons/success_icon.svg';
import ErrorIcon from '@assets/images/icons/error_icon.svg';
import CloseIcon from '@assets/images/icons/close_icon.svg';

export default function Alert() {
    const { alert, setAlert } = useAlertContext();
    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        if (alert.show) {
            const alertTimeout = setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5e3);

            return () => {
                setTimer(prev => prev + 1);
                clearTimeout(alertTimeout);
            };
        }
    }, [alert, setAlert]);

    return alert.show && (
        <section className={`alert ${alert.type}-alert`}>
            <img
                height={40}
                width={40}
                src={alert.type === 'success' ? SuccessIcon : ErrorIcon}
                alt="Success icon"
            />
            <div className="alert-info">
                <h3 className="alert-info-header">{alert.type === 'success' ? 'Success!' : 'Error!'}</h3>
                <p className="alert-info-body">{alert.text}</p>
            </div>
            <button
                className="alert-close-button"
                onClick={() => setAlert({ ...alert, show: false })}
            >
                <img
                    src={CloseIcon}
                    alt="Close alert icon"
                />
            </button>
            <div key={timer} className="alert-disappearance-timer"></div>
        </section>
    );
}
